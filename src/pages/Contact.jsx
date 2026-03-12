import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";
import { useState } from "react";
import api from "../api/axios";

export default function Contact(){

const [form,setForm]=useState({
name:"",
email:"",
phone:"",
message:""
});

const [loading,setLoading]=useState(false);

const sendMessage = async () => {

if(!form.name || !form.email || !form.phone || !form.message){
alert("Please fill all fields");
return;
}

try{

setLoading(true);

await api.post("/contact",form);

alert("Message sent successfully");

setForm({
name:"",
email:"",
phone:"",
message:""
});

}catch(err){

alert("Failed to send message");

}

setLoading(false);

};

return(
<> <HomeNavbar/>

<section className="container my-5">

<h2 className="text-center mb-5 fw-bold">
Contact Us
</h2>

<div className="row g-4">

{/* CONTACT INFO */}

<div className="col-md-5">

<div className="card shadow p-4 h-100">

<h4 className="mb-4 text-primary">
Get in Touch
</h4>

<p>
📍 <b>Address:</b><br/>
123 Health Street<br/>
Kolkata, India
</p>

<p>
📞 <b>Phone:</b><br/>
+91 9876543210
</p>

<p>
✉️ <b>Email:</b><br/>
support@healthcare.com
</p>

<p>
🕒 <b>Working Hours:</b><br/>
Mon - Sat : 9AM - 8PM
</p>

</div>

</div>

{/* CONTACT FORM */}

<div className="col-md-7">

<div className="card shadow p-4">

<h4 className="mb-4 text-success">
Send Message
</h4>

<input
className="form-control mb-3"
placeholder="Your Name"
value={form.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<input
type="email"
className="form-control mb-3"
placeholder="Email Address"
value={form.email}
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
type="tel"
className="form-control mb-3"
placeholder="Phone Number"
value={form.phone}
onChange={(e)=>setForm({...form,phone:e.target.value})}
/>

<textarea
className="form-control mb-3"
rows="5"
placeholder="Write your message..."
value={form.message}
onChange={(e)=>setForm({...form,message:e.target.value})}
/>

<button
className="btn btn-success w-100"
onClick={sendMessage}
disabled={loading}
>

{loading ? "Sending..." : "Send Message"}

</button>

</div>

</div>

</div>

</section>

<Footer/>

</>
);
}
