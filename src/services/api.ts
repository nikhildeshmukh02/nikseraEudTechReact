const baseUrl=import.meta.env.VITE_API_BASE_URL || "";
async function request<T>(path:string,options?:RequestInit):Promise<T>{
 if(!baseUrl) throw new Error("API not configured. Add VITE_API_BASE_URL.");
 const res=await fetch(baseUrl+path,{headers:{"Content-Type":"application/json",...(options?.headers||{})},...options});
 if(!res.ok) throw new Error(await res.text());
 return res.json() as Promise<T>;
}
export const api={
 programs:()=>request("/api/programs"),
 application:(id:string)=>request("/api/applications/"+id),
 createApplication:(payload:unknown)=>request("/api/applications",{method:"POST",body:JSON.stringify(payload)}),
 submitApplication:(id:string)=>request("/api/applications/"+id+"/submit",{method:"POST"})
};
