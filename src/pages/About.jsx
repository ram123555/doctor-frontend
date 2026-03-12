import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";

export default function About(){
return(
<>
<HomeNavbar/>

<div className="container my-5">

<h2 className="text-center mb-4">About Our Platform</h2>

<p className="lead text-center">
Our Doctor Appointment System helps patients book appointments
online with trusted doctors quickly and securely.
</p>

<div className="row mt-5">

<div className="col-md-4 text-center">
<i className="fa-solid fa-user-doctor fa-3x text-primary"></i>
<h5 className="mt-3">Expert Doctors</h5>
<p>Consult experienced doctors anytime.</p>
</div>

<div className="col-md-4 text-center">
<i className="fa-solid fa-clock fa-3x text-success"></i>
<h5 className="mt-3">Save Time</h5>
<p>No waiting in long hospital queues.</p>
</div>

<div className="col-md-4 text-center">
<i className="fa-solid fa-heart-pulse fa-3x text-danger"></i>
<h5 className="mt-3">Better Health</h5>
<p>Manage your health with ease.</p>
</div>

</div>

</div>

<Footer/>
</>
);
}