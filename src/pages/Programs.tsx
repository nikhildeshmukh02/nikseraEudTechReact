import {programs} from "../data/mock";
export default function Programs(){
 return <section className="page"><div className="page-head"><div><span className="eyebrow">PROGRAM CATALOG</span><h1>Choose your program</h1></div><input className="search" placeholder="Search programs..."/></div>
 <div className="program-grid">{programs.map(p=><article className="program-card" key={p.id}><span className="tag">{p.level}</span><h3>{p.name}</h3><p>{p.campus} · Intake {p.intake}</p><div className="program-footer"><strong>Application fee ₹{p.fee.toLocaleString("en-IN")}</strong><button className="secondary">Apply</button></div></article>)}</div></section>;
}
