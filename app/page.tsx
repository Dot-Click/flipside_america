"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { ArrowUpRight, ArrowRight, ArrowDown, ChevronDown, Play, Plus, Minus, Mail, Phone, MapPin, Menu, X, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const media = "/media/";
const reels = [
 {id:"01M2XJJ3FK6P5A3SV8QZ0Y2KE7",title:"Meet the Flipside CEO",tag:"THE PEOPLE BEHIND THE VISION"},
 {id:"01M2XJJ3FK8279PYX9FJW7VQAX",title:"Conversations that connect",tag:"BUSINESS & CONNECTIONS"},
 {id:"01M2XJJ3FJBFH1XEAMDFHK3W85",title:"A different perspective",tag:"IDEAS INTO ACTION"},
 {id:"01M2XJJ3FKM5S398KSRERBA77W",title:"Beyond the boardroom",tag:"THE FLIPSIDE OF BUSINESS"},
];
const services = [
 {name:"Credit enhancement",category:"PERSONAL & BUSINESS",description:"Build a stronger financial foundation with personal and business credit-building guidance.",detail:"We help you understand your credit profile and explore practical next steps based on your goals. Individual circumstances and results vary.",image:2},
 {name:"Business consulting",category:"STRATEGY & GROWTH",description:"Bring clarity to your next move. Get support with business strategy, marketing, growth, and operations.",detail:"For entrepreneurs starting something new or working through their next stage, we bring a direct, resourceful approach to business decisions.",image:3},
 {name:"Legal investigations",category:"RESEARCH & SUPPORT",description:"Consulting support for criminal investigations and litigation matters, with attention to the details.",detail:"Tell us about your situation so we can discuss the scope of consulting support and whether our services are a fit.",image:0},
 {name:"Film executive production",category:"CREATIVE & MEDIA",description:"Support for ambitious film projects, from the business behind the story to executive production.",detail:"We bring business insight and creative perspective to film projects. Start a conversation about your project, its stage, and the support you need.",image:1},
 {name:"Property management",category:"PROPERTY & OPERATIONS",description:"Keep your rental properties moving with support for tenants, maintenance, and reporting.",detail:"Discuss your rental portfolio and the day-to-day responsibilities you need help managing, from tenant coordination to maintenance oversight.",image:3},
 {name:"Personal credit tradelines",category:"CREDIT & GUIDANCE",description:"Authorized-user credit tradeline guidance and account placement support tailored to your needs.",detail:"We explain available options and discuss suitability before you make a decision. No particular credit-score change or lending approval is guaranteed.",image:2},
 {name:"Executive protection",category:"SECURITY & PLANNING",description:"Discreet consulting on executive protection, risk assessments, and tailored security planning.",detail:"Explore your protection needs through a confidential conversation about your situation, priorities, and security planning.",image:0},
];
const faqs = [
 ["What does a business consultant do?","A business consultant helps you take a closer look at your goals, identify challenges, and develop practical next steps. At Flipside America, that can include strategy, growth, marketing, and operations."],
 ["How can consulting support my business goals?","We start by understanding where you are and where you want to go. From there, we discuss the support that fits your priorities—whether you are launching a business, improving operations, or exploring a new direction."],
 ["What should I prepare before speaking with a consultant?","Bring a brief overview of your business or situation, your main questions, and the goals you want to work toward. Any relevant background information helps us make the first conversation more useful."],
 ["Can you help if I’m unsure what direction to take?","Yes. You do not need a fully formed plan to start a conversation. We can help you talk through your priorities, consider your options, and clarify your next move."],
 ["How do I get started with Flipside America?","Use the contact form below to prepare an email, call us at (215) 809-8568, or email flipsideinfo@flipsideamericainc.com. Tell us a little about what you need, and we can discuss the right next step."],
];
// Dropdown labels, index-aligned to `services` so each entry opens its own row.
const serviceMenu = ["Credit Enhancement","Business Consulting","Legal Investigations","Film Executive Production","Property management","Personal credit account tradelines","Executive protection and security services consultation"];
const navLinks = [["Review","reviews"],["Feedback","feedback"],["Gallery","gallery"],["FAQ","faq"],["Contact","contact"]];
function Brand(){return <a className="brand" href="#home" aria-label="Flipside America home"><span className="brand-symbol">f<span>↗</span></span><span>FLIPSIDE<span className="brand-sub">AMERICA INC.</span></span></a>}
function RoundArrow(){return <span className="round-arrow"><ArrowUpRight size={19}/></span>}
export default function Home(){
 const [menu,setMenu]=useState(false);
 const [servicesOpen,setServicesOpen]=useState(false);
 const drop=useRef<HTMLDivElement|null>(null);
 // Pointer devices get hover-to-open; touch would otherwise open and immediately
 // re-close as the tap turns into a click.
 const hoverable=useRef(false);
 useEffect(()=>{hoverable.current=window.matchMedia("(hover:hover)").matches},[]);
 useEffect(()=>{
  if(!servicesOpen)return;
  const away=(e:MouseEvent)=>{if(drop.current&&!drop.current.contains(e.target as Node))setServicesOpen(false)};
  const esc=(e:KeyboardEvent)=>{if(e.key==="Escape")setServicesOpen(false)};
  document.addEventListener("mousedown",away);document.addEventListener("keydown",esc);
  return()=>{document.removeEventListener("mousedown",away);document.removeEventListener("keydown",esc)};
 },[servicesOpen]);
 const [faq,setFaq]=useState<number|null>(1);
 const [service,setService]=useState<number|null>(null);
 const [reel,setReel]=useState<number|null>(null);
 const [emailReady,setEmailReady]=useState(false);
 function pickService(i:number){setService(i);setServicesOpen(false);setMenu(false)}
 function contact(e:FormEvent<HTMLFormElement>){e.preventDefault();const d=new FormData(e.currentTarget);const subject=`Flipside inquiry — ${d.get("first")} ${d.get("last")}`;const body=`Name: ${d.get("first")} ${d.get("last")}\nEmail: ${d.get("email")}\nPhone: ${d.get("phone")||"Not provided"}\n\n${d.get("message")}`;window.location.href=`mailto:flipsideinfo@flipsideamericainc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;setEmailReady(true)}
 return <main>
 <a className="skip-link" href="#about">Skip to content</a>
 <section className="hero" id="home">
  <header className="header"><Brand/>
   <nav className={menu?"nav is-open":"nav"} aria-label="Main navigation">
    <a onClick={()=>setMenu(false)} href="#home">Home</a>
    <div className={servicesOpen?"nav-dropdown open":"nav-dropdown"} ref={drop}
     onMouseEnter={()=>{if(hoverable.current)setServicesOpen(true)}}
     onMouseLeave={()=>{if(hoverable.current)setServicesOpen(false)}}>
     <button type="button" aria-expanded={servicesOpen} aria-controls="services-menu" onClick={()=>setServicesOpen(!servicesOpen)}>Services <ChevronDown size={14}/></button>
     <ul className="nav-menu" id="services-menu">{serviceMenu.map((label,i)=><li key={label}><a href="#services" onClick={()=>pickService(i)}>{label}</a></li>)}</ul>
    </div>
    {navLinks.map(([title,id])=><a key={id} onClick={()=>setMenu(false)} href={`#${id}`}>{title}</a>)}
   </nav>
   <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={16}/></a><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?"Close navigation":"Open navigation"} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button></header>
  <div className="hero-content wrap">
   <div className="hero-copy"><h1>Flipside America Inc</h1><p>Strategic consulting for credit, business growth, media, and investigations, and business and property management</p><div className="hero-actions"><a className="button button-light" href="#contact">Let’s talk possibilities <RoundArrow/></a><a className="text-link" href="#services">Explore our services <ArrowUpRight size={17}/></a></div><div className="hero-location"><MapPin size={15}/><span>1700 Market St, Philadelphia, PA 19103, USA</span></div></div>
   <div className="hero-visual"><button className="hero-phone" onClick={()=>setReel(0)} aria-label="Play Meet the Flipside CEO with sound"><span className="phone-screen"><video src={media+reels[0].id+".mp4"} poster={media+reels[0].id+".jpg"} autoPlay muted loop playsInline preload="auto"/><span className="hero-reel-shade"/><span className="hero-play"><Play size={18} fill="currentColor"/></span></span><img className="phone-frame" src="/mobile-screen.png" alt="" aria-hidden="true" draggable={false}/></button></div>
  </div><div className="hero-bottom wrap"><span>STRATEGY. CONFIDENCE. FORWARD MOTION.</span><a href="#about">Discover the flipside <ArrowDown size={16}/></a></div>
 </section>
 <section className="about wrap" id="about"><div className="about-copy"><div className="eyebrow dark-eyebrow">01 / ABOUT FLIPSIDE</div><h2>A bold vision.<br/>A personal approach.</h2><p>We’re Flipside America Inc. We help individuals and businesses see what’s possible—and take the next step with clarity and confidence.</p><p>Founded by entrepreneur Messiah the Almighty, our work brings together credit guidance, business strategy, creative media, investigations, and property management. Different needs. One resourceful partner.</p><a className="button button-dark" href="#contact">Get to know us <RoundArrow/></a><div className="founder-signoff"><img src="/logo.png" alt="Seal of the Messiah" width={52} height={52} loading="lazy"/><div><strong>Messiah the Almighty</strong><span>Founder & CEO, Flipside America Inc.</span></div></div></div><div className="reel-wall" id="gallery" aria-label="Flipside America video reels">{[0,1].map(col=><div className="reel-column" key={col}><div className="reel-track">{[0,1].map(pass=>[col,col+2].map(i=><button className="reel-card" key={`${pass}-${i}`} onClick={()=>setReel(i)} tabIndex={pass?-1:0} aria-hidden={pass===1} aria-label={`Play ${reels[i].title}`}><img src={media+reels[i].id+".jpg"} alt={pass?"":reels[i].title} loading="lazy"/><span className="reel-mini-play"><Play size={17} fill="currentColor"/></span><span className="reel-card-caption"><small>{reels[i].tag}</small><strong>{reels[i].title}</strong></span></button>))}</div></div>)}</div></section>
 <section className="services-section" id="services"><div className="services-paper wrap"><div className="services-heading"><h2>SERVICES</h2><div><span className="eyebrow dark-eyebrow">02 / WHAT WE DO</span><p>Different ambitions.<br/>The right support.</p></div></div><div className="service-list">{services.map((s,i)=><article className={`service-row ${service===i?"expanded":""}`} key={s.name}><button className="service-main" onClick={()=>setService(service===i?null:i)} aria-expanded={service===i} aria-controls={`service-${i}`}><span className="service-number">0{i+1}</span><h3>{s.name}</h3><span className="service-category">{s.category}</span><p>{s.description}</p><span className="service-image"><img src={media+reels[s.image].id+".jpg"} alt="" loading="lazy"/></span><span className="service-toggle">{service===i?<Minus size={19}/>:<ArrowUpRight size={20}/>}</span></button>{service===i&&<div className="service-detail" id={`service-${i}`}><p>{s.detail}</p><a href="#contact">Let’s discuss your needs <ArrowUpRight size={17}/></a></div>}</article>)}</div><div className="services-foot"><span>One partner. A world of possibility.</span><a href="#contact">Find your way forward <ArrowRight size={17}/></a></div></div></section>
 <section className="faq-section" id="faq"><div className="faq-panel wrap"><div className="eyebrow dark-eyebrow">03 / A LITTLE MORE CLARITY</div><h2>Good questions.<br className="mobile-break"/> Straight answers.</h2><div className="faq-list">{faqs.map(([q,a],i)=><div key={q} className={`faq-item ${faq===i?"active":""}`}><button onClick={()=>setFaq(faq===i?null:i)} aria-expanded={faq===i} aria-controls={`answer-${i}`}><span className="faq-number">0{i+1}</span><span>{q}</span><span className="faq-toggle"><Plus size={19}/></span></button><div className="faq-answer-wrap" id={`answer-${i}`}><div className="faq-answer-clip"><div className="faq-answer">{a}</div></div></div></div>)}</div><p className="faq-footer">Something else on your mind?<a href="#contact">Let’s talk <ArrowUpRight size={15}/></a></p></div></section>
 <section className="contact-section" id="contact"><div className="contact-inner wrap"><div className="contact-copy"><div className="eyebrow">04 / YOUR NEXT MOVE</div><h2>Let’s turn<br/>“what if” into<br/><span>what’s next.</span></h2><p>Have a goal, a question, or a new idea?<br/>We’re ready to hear it.</p><div className="contact-links"><a href="mailto:flipsideinfo@flipsideamericainc.com"><Mail size={17}/>flipsideinfo@flipsideamericainc.com</a><a href="tel:+12158098568"><Phone size={17}/>(215) 809-8568</a><a href="https://www.google.com/maps/search/?api=1&query=1700%20Market%20St%2C%20Philadelphia%2C%20PA%2019103%2C%20USA" target="_blank" rel="noreferrer"><MapPin size={17}/>1700 Market St, Philadelphia, PA 19103</a></div><a className="social-link" href="https://www.instagram.com/flipsideceo/" target="_blank" rel="noreferrer"><Camera size={18}/>@flipsideceo <ArrowUpRight size={16}/></a></div><form className="contact-form" onSubmit={contact}><div className="form-heading"><h3>Start a conversation</h3><ArrowUpRight size={24}/></div><div className="name-fields"><label>First name<input name="first" autoComplete="given-name" placeholder="First name" required maxLength={80}/></label><label>Last name<input name="last" autoComplete="family-name" placeholder="Last name" required maxLength={80}/></label></div><label>Email address<input name="email" autoComplete="email" type="email" placeholder="you@example.com" required/></label><label>Phone number <span>(optional)</span><input name="phone" autoComplete="tel" type="tel" placeholder="(000) 000-0000"/></label><label>What do you have in mind?<textarea name="message" placeholder="A little about you and what you’re looking for…" required rows={4} maxLength={4000}/></label><button className="button button-light form-submit" type="submit">Let’s get started <RoundArrow/></button><p className="form-note" role="status">{emailReady?"Your email draft is ready. Send it from your email app to reach our team. If it didn’t open, use the email link on the left.":"Opens your email app with your message ready to send."}</p></form></div></section>
 <footer><div className="footer-main wrap"><div><Brand/><p>A different perspective.<br/>A clearer path forward.</p></div><div><h3>Explore</h3><a href="#about">About us</a><a href="#services">Our services</a><a href="#faq">FAQs</a></div><div><h3>Let’s connect</h3><a href="#contact">Start a conversation <ArrowUpRight size={14}/></a><a href="https://www.instagram.com/flipsideceo/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a><a href="tel:+12158098568">(215) 809-8568</a></div><div><h3>Find us</h3><p>1700 Market Street<br/>Philadelphia, PA 19103<br/>United States</p></div></div><div className="footer-bottom wrap"><span>© {new Date().getFullYear()} Flipside America Inc. All rights reserved.</span><a href="#home">Back to top <ArrowUpRight size={15}/></a></div></footer>
 <Dialog open={reel!==null} onOpenChange={open=>{if(!open)setReel(null)}}><DialogContent className="reel-dialog"><DialogTitle>{reel!==null?reels[reel].title:"Flipside America"}</DialogTitle><DialogDescription>Stories and conversations from Flipside America.</DialogDescription>{reel!==null&&<video key={reel} src={media+reels[reel].id+".mp4"} poster={media+reels[reel].id+".jpg"} controls autoPlay playsInline preload="metadata"/>}</DialogContent></Dialog>
 </main>
}
