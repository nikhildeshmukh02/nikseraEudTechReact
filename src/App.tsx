import {Navigate,Route,Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Programs from "./pages/Programs";
import ApplicationForm from "./pages/ApplicationForm";
import Payments from "./pages/Payments";
import Documents from "./pages/Documents";
import Tracking from "./pages/Tracking";
import AdminConfig from "./pages/AdminConfig";

export default function App(){
 return <Routes>
  <Route element={<Layout/>}>
   <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
   <Route path="/dashboard" element={<Dashboard/>}/>
   <Route path="/programs" element={<Programs/>}/>
   <Route path="/application" element={<ApplicationForm/>}/>
   <Route path="/documents" element={<Documents/>}/>
   <Route path="/payments" element={<Payments/>}/>
   <Route path="/tracking" element={<Tracking/>}/>
   <Route path="/admin/configuration" element={<AdminConfig/>}/>
  </Route>
 </Routes>;
}
