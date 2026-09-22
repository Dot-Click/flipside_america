// Supervise `vinext dev` startup on the portable profile.
//
// The Cloudflare Vite plugin connects to the workerd runtime while workerd is
// still coming up. On a slow Windows host those first connections lose the race,
// and the plugin treats the resulting socket error as fatal, so the dev server
// dies before it ever binds its port:
//
//   Error: connect ECONNREFUSED 127.0.0.1:52614   (workerd not listening yet)
//   Error: read ECONNRESET / socket hang up       (reset mid-handshake)
//
// The race is per-launch, not persistent: relaunching clears it. Suppressing the
// socket error does not help — the plugin does not reconnect, it just fails one
// layer up. So supervise instead: if the server exits before the port is
// listening, start it again. Once the port is up we stop watching and behave like
// a plain `vinext dev` — signals forwarded, exit code passed through.

import { spawn } from "node:child_process";
import net from "node:net";
import { rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const STARTUP_ATTEMPTS = 4;
const PROBE_INTERVAL_MS = 500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isListening(port, host) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host });
    const done = (result) => {
      socket.destroy();
      resolve(result);
    };
    socket.once("connect", () => done(true));
    socket.once("error", () => done(false));
    socket.setTimeout(1000, () => done(false));
  });
}

// A launch that died mid-startup can leave behind a lock whose PID has since been
// reused, which makes the next launch refuse to start as a duplicate.
function clearStaleLock() {
  rmSync(new URL("../.vinext/dev", import.meta.url), { recursive: true, force: true });
}

export async function runDev(cliUrl, port, host, args) {
  const cli = fileURLToPath(cliUrl);

  for (let attempt = 1; attempt <= STARTUP_ATTEMPTS; attempt++) {
    if (attempt > 1) clearStaleLock();

    const child = spawn(
      process.execPath,
      [cli, "dev", "--port", String(port), ...args],
      { stdio: "inherit" },
    );

    const forward = (signal) => () => child.kill(signal);
    const onInt = forward("SIGINT");
    const onTerm = forward("SIGTERM");
    process.on("SIGINT", onInt);
    process.on("SIGTERM", onTerm);

    const exited = new Promise((resolve) =>
      child.once("exit", (code, signal) => resolve({ code, signal })),
    );

    // Race startup against the port coming up.
    let started = false;
    const probe = (async () => {
      while (child.exitCode === null && child.signalCode === null) {
        if (await isListening(port, host)) return true;
        await sleep(PROBE_INTERVAL_MS);
      }
      return false;
    })();

    started = await Promise.race([probe, exited.then(() => false)]);

    if (started) {
      // Past startup: hand the rest of the session over to the child.
      const { code, signal } = await exited;
      process.off("SIGINT", onInt);
      process.off("SIGTERM", onTerm);
      process.exit(signal ? 1 : (code ?? 0));
    }

    const { code, signal } = await exited;
    process.off("SIGINT", onInt);
    process.off("SIGTERM", onTerm);

    // A clean exit or a signal means the user stopped it; only retry a crash.
    if (signal || code === 0) process.exit(code ?? 0);

    if (attempt < STARTUP_ATTEMPTS) {
      console.warn(
        `\n  Dev server exited during startup (code ${code}). Retrying (${attempt + 1}/${STARTUP_ATTEMPTS})…\n`,
      );
      await sleep(1000);
    } else {
      console.error(
        `\n  Dev server failed to start after ${STARTUP_ATTEMPTS} attempts. The error above is the last failure.\n`,
      );
      process.exit(code ?? 1);
    }
  }
}
