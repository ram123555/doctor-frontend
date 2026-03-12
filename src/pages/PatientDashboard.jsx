import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/HomeNavbar";
import jsPDF from "jspdf";
import "../styles/patient.css";
import Footer from "../components/Footer";

export default function PatientDashboard() {
  const [user, setUser] = useState(null);              // ✅ NEW
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [search, setSearch] = useState("");

  // Blog states
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    loadProfile();        // ✅ NEW
    loadDoctors();
    loadAppointments();
  }, []);

  // ================= LOAD LOGGED-IN USER =================
  const loadProfile = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data);
  };

  const loadDoctors = async () => {
    const res = await api.get("/doctors");
    setDoctors(res.data);
  };

  const loadAppointments = async () => {
    const res = await api.get("/appointments/my");
    setAppointments(res.data);
  };

  const filteredDoctors = doctors.filter(d =>
    d.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const selectedDoctor = doctors.find(d => d._id === doctorId);

  const bookAppointment = async () => {
    if (!doctorId || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    await api.post("/appointments/book", { doctorId, date, time });
    alert("Appointment booked (Pending approval)");
    setDoctorId(""); setDate(""); setTime("");
    loadAppointments();
  };

  const downloadSlip = (a) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Doctor Appointment Slip", 20, 20);
    doc.setFontSize(12);
    doc.text(`Patient: ${user?.name}`, 20, 30);
    doc.text(`Doctor: ${a.doctorId?.userId?.name}`, 20, 40);
    doc.text(`Specialization: ${a.doctorId?.specialization}`, 20, 50);
    doc.text(`Date: ${a.date}`, 20, 60);
    doc.text(`Time: ${a.time}`, 20, 70);
    doc.text(`Status: ${a.status}`, 20, 80);
    doc.save("appointment-slip.pdf");
  };

  const badge = s =>
    s === "Approved" ? "bg-success" :
      s === "Rejected" ? "bg-danger" :
        "bg-warning text-dark";

  // ===================== BLOG DATA (UNCHANGED) =====================
  const blogs = [
    { title: "Diabetes", img: "https://storage.googleapis.com/treatspace-prod-media/pracimg/u-1998/shutterstock_722552959.jpeg", short: "Control blood sugar effectively.", content: `Symptoms: Frequent urination, thirst, fatigue\nCauses: Poor diet, genetics\nPrevention & Cure: Exercise, balanced diet, monitoring sugar levels.` },
    { title: "Heart Disease", img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7", short: "Keep your heart healthy.", content: `Symptoms: Chest pain, breathlessness\nCauses: Cholesterol, smoking\nPrevention: Exercise, low-fat diet.` },
    { title: "Dengue", img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144", short: "Mosquito-borne disease.", content: `Symptoms: High fever, joint pain\nPrevention: Mosquito nets, hydration.` },
    { title: "Mental Health", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773", short: "Mind health matters.", content: `Symptoms: Anxiety, depression\nCure: Counseling, meditation.` },
    { title: "Cold & Flu", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", short: "Common viral infection.", content: `Symptoms: Sneezing, fever\nCure: Rest, warm fluids.` },
    { title: "Healthy Diet", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", short: "Eat right, live strong.", content: `Benefits: Better immunity\nTips: Fruits, vegetables.` },
    { title: "High BP", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5", short: "Control blood pressure.", content: `Causes: Stress, salt\nPrevention: Exercise, low salt.` },
    { title: "Obesity", img: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74", short: "Maintain healthy weight.", content: `Risks: Diabetes, heart disease\nCure: Diet, exercise.` },
    { title: "Asthma", img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2", short: "Breathing disorder.", content: `Triggers: Dust, pollution\nCure: Inhalers, avoid triggers.` },
    { title: "COVID-19", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Fphar-11-00937-g001.jpg/330px-Fphar-11-00937-g001.jpg", short: "Viral respiratory illness.", content: `Prevention: Mask, vaccine\nCure: Rest, medical care.` },

    { title: "Anemia", img: "https://images.everydayhealth.com/images/blood-disorders/anemia/anemia-treatments-722x406.jpg?sfvrsn=de78f1ab_3", short: "Low hemoglobin levels.", content: `Symptoms: Fatigue, dizziness\nCure: Iron-rich diet.` },
    { title: "Migraine", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2", short: "Severe headaches.", content: `Triggers: Stress, light\nCure: Rest, medication.` },
    { title: "Arthritis", img: "https://physiotherapistahmedabad.com/wp-content/uploads/2022/07/Arthritis.jpg", short: "Joint inflammation.", content: `Symptoms: Pain, stiffness\nCure: Exercise, therapy.` },
    { title: "Kidney Stones", img: "https://www.rghospitals.com/assets/admin/images/blog/1760098197_b93c5f50ea69a1556db8.jpg", short: "Hard mineral deposits.", content: `Causes: Dehydration\nPrevention: Drink water.` },
    { title: "Thyroid", img: "https://www.hopkinsmedicine.org/-/media/images/health/1_-conditions/thyroid-cancer/thyroid-conditions-teaser-image.jpg", short: "Hormonal imbalance.", content: `Symptoms: Weight change\nCure: Medication.` },
    { title: "Skin Allergy", img: "https://dermatologist.earthandetherclinic.com/wp-content/uploads/2025/06/Skin-Allergy-Vs.-Fungal-Infection.jpg", short: "Skin reactions.", content: `Triggers: Dust, food\nCure: Avoid allergens.` },
    { title: "Eye Care", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSfWyzX263bxQZUvmA6sXjr2DRqGKm3-3C9g&s", short: "Protect your vision.", content: `Tips: Reduce screen time\nCheckups regularly.` },
    { title: "Back Pain", img: "https://images.emedicinehealth.com/images/slideshow/emss-topper/low-back-pain.jpg?output-quality=75", short: "Spinal discomfort.", content: `Causes: Poor posture\nCure: Exercise.` },
    { title: "Indigestion", img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e", short: "Digestive discomfort.", content: `Cure: Light food, hydration.` },
    { title: "Sleep Disorders", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773", short: "Poor sleep health.", content: `Cure: Fixed routine, avoid screens.` },
    { title: "Diabetes", img: "https://storage.googleapis.com/treatspace-prod-media/pracimg/u-1998/shutterstock_722552959.jpeg", short: "Control blood sugar effectively.", content: `Symptoms: Frequent urination, thirst, fatigue\nCauses: Poor diet, genetics\nPrevention & Cure: Exercise, balanced diet, monitoring sugar levels.` },
    { title: "Heart Disease", img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7", short: "Keep your heart healthy.", content: `Symptoms: Chest pain, breathlessness\nCauses: Cholesterol, smoking\nPrevention: Exercise, low-fat diet.` },
    { title: "Dengue", img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144", short: "Mosquito-borne disease.", content: `Symptoms: High fever, joint pain\nPrevention: Mosquito nets, hydration.` },
    { title: "Mental Health", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773", short: "Mind health matters.", content: `Symptoms: Anxiety, depression\nCure: Counseling, meditation.` },
    { title: "Cold & Flu", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", short: "Common viral infection.", content: `Symptoms: Sneezing, fever\nCure: Rest, warm fluids.` },
    { title: "Healthy Diet", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", short: "Eat right, live strong.", content: `Benefits: Better immunity\nTips: Fruits, vegetables.` },
    { title: "High BP", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5", short: "Control blood pressure.", content: `Causes: Stress, salt\nPrevention: Exercise, low salt.` },
    { title: "Obesity", img: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74", short: "Maintain healthy weight.", content: `Risks: Diabetes, heart disease\nCure: Diet, exercise.` },
    { title: "Asthma", img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2", short: "Breathing disorder.", content: `Triggers: Dust, pollution\nCure: Inhalers, avoid triggers.` },
    { title: "COVID-19", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Fphar-11-00937-g001.jpg/330px-Fphar-11-00937-g001.jpg", short: "Viral respiratory illness.", content: `Prevention: Mask, vaccine\nCure: Rest, medical care.` },
  ];

  const start = (page - 1) * blogsPerPage;
  const paginatedBlogs = blogs.slice(start, start + blogsPerPage);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <>
      <Navbar title="Patient Dashboard" />
      <div className="container mt-4 fade-in">

        {/* ✅ HERO WITH USER NAME */}
        <div className="card bg-primary text-white p-4 mb-4 hover-card">
          <h3>
            <i className="fa-solid fa-heart-pulse"></i>{" "}
            Welcome{user ? `, ${user.name}` : ""} 👋
          </h3>
          <p>Book appointments & learn about diseases and cures</p>
        </div>

        {/* ================= BOOK APPOINTMENT ================= */}
        <div className="card p-4 mb-4 hover-card">
          <h4><i className="fa-solid fa-calendar-check"></i> Book Appointment</h4>

          <input className="form-control my-2"
            placeholder="Search doctor"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select className="form-select my-2"
            value={doctorId}
            onChange={e => { setDoctorId(e.target.value); setTime(""); }}>
            <option value="">Select Doctor</option>
            {filteredDoctors.map(d => (
              <option key={d._id} value={d._id}>
                {d.userId?.name} — {d.specialization}
              </option>
            ))}
          </select>

          <input type="date" className="form-control my-2"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <select className="form-select my-2"
            value={time}
            onChange={e => setTime(e.target.value)}
            disabled={!doctorId}>
            <option value="">Select Time</option>
            {selectedDoctor?.availableSlots?.map((s, i) =>
              <option key={i}>{s}</option>
            )}
          </select>

          <button className="btn btn-primary w-100 mt-2" onClick={bookAppointment}>
            Book Appointment
          </button>
        </div>

        {/* ================= APPOINTMENTS ================= */}
        <div className="card p-4 mb-4 hover-card">
          <h4><i className="fa-solid fa-file-medical"></i> My Appointments</h4>

          <table className="table mt-3">
            <thead>
              <tr>
                <th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a._id}>
                  <td>{a.doctorId?.userId?.name}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <span className={`badge ${badge(a.status)}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    {a.status === "Approved" && (
                      <button className="btn btn-sm btn-outline-primary"
                        onClick={() => downloadSlip(a)}>
                        <i className="fa-solid fa-download"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= BLOG SECTION ================= */}
        <div className="card p-4 hover-card">
          <h4><i className="fa-solid fa-book-medical"></i> Health Blogs</h4>

          <div className="row mt-3">
            {paginatedBlogs.map((b, i) => (
              <div className="col-md-6 mb-3" key={i}>
                <div className="card h-100 hover-card">
                  <img src={b.img} className="card-img-top blog-img" />
                  <div className="card-body">
                    <h5>{b.title}</h5>
                    <p>{b.short}</p>
                    <button className="btn btn-sm btn-outline-primary"
                      onClick={() => setSelectedBlog(b)}>
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center mt-3">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i}
                className={`btn btn-sm mx-1 ${page === i + 1 ? "btn-primary" : "btn-outline-primary"
                  }`}
                onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* BLOG MODAL */}
        {selectedBlog && (
          <div className="modal show fade d-block">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{selectedBlog.title}</h5>
                  <button className="btn-close"
                    onClick={() => setSelectedBlog(null)}>
                  </button>
                </div>
                <div className="modal-body">
                  <img src={selectedBlog.img}
                    className="img-fluid mb-3 rounded" />
                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {selectedBlog.content}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer/>
    </>
  );
}
