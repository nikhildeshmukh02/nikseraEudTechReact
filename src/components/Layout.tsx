import {NavLink,Outlet} from "react-router-dom";
const nav=[["Dashboard","/dashboard"],["Programs","/programs"],["Application","/application"],["Documents","/documents"],["Payments","/payments"],["Tracking","/tracking"],["Admin Configuration","/admin/configuration"]];
export default function Layout(){
 return <div className="shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-mark">N</div><div><strong>Niksera</strong><span>Education Cloud</span></div></div>
   <nav>{nav.map(([label,path])=><NavLink key={path} to={path} className={({isActive})=>isActive?"active":""}>{label}</NavLink>)}</nav>
   <div className="sidebar-note">Demo tenant<br/><strong>Niksera University</strong></div>
  </aside>
  <main className="main">
   <header className="topbar"><div><strong>Admissions Portal</strong><span>Applicant experience</span></div><div className="profile">ND</div></header>
   <Outlet/>
  </main>
 </div>;
}
