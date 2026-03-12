import { useEffect, useState } from "react";
import api from "../api/axios";
import HomeNavbar from "../components/HomeNavbar";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home() {

    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    // BLOG STATES
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogPage, setBlogPage] = useState(1);
    const blogsPerPage = 4;

    const [page, setPage] = useState(1);
    const doctorsPerPage = 6;

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        const res = await api.get("/doctors");
        setDoctors(res.data);
    };

    const filteredDoctors = doctors.filter(d =>
        d.userId?.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization.toLowerCase().includes(search.toLowerCase())
    );



    const start = (page - 1) * doctorsPerPage;
    const paginatedDoctors = filteredDoctors.slice(start, start + doctorsPerPage);
    const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

    const blogs = [

        { title: "Diabetes", img: "https://storage.googleapis.com/treatspace-prod-media/pracimg/u-1998/shutterstock_722552959.jpeg", short: "Control blood sugar effectively.", content: `Symptoms: Frequent urination, thirst, fatigue\nCauses: Poor diet, genetics\nPrevention: Exercise and balanced diet.` },

        { title: "Heart Disease", img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7", short: "Protect your heart health.", content: `Symptoms: Chest pain\nPrevention: Exercise, healthy food.` },

        { title: "Dengue", img: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144", short: "Mosquito-borne disease.", content: `Symptoms: Fever, joint pain\nPrevention: Mosquito nets.` },

        { title: "Mental Health", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773", short: "Mental wellness matters.", content: `Cure: Meditation and counseling.` },

        { title: "Cold & Flu", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", short: "Common viral infection.", content: `Rest and drink warm fluids.` },

        { title: "Healthy Diet", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", short: "Eat balanced meals.", content: `Include fruits and vegetables.` },

        { title: "High Blood Pressure", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5", short: "Control blood pressure.", content: `Reduce salt intake.` },

        { title: "Obesity", img: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74", short: "Maintain healthy weight.", content: `Exercise regularly.` },

        { title: "Asthma", img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2", short: "Breathing disorder.", content: `Use inhalers.` },

        { title: "COVID-19", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Fphar-11-00937-g001.jpg/330px-Fphar-11-00937-g001.jpg", short: "Respiratory illness.", content: `Vaccination recommended.` },

        { title: "Anemia", img: "https://images.everydayhealth.com/images/blood-disorders/anemia/anemia-treatments-722x406.jpg", short: "Low hemoglobin levels.", content: `Eat iron rich foods.` },

        { title: "Migraine", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2", short: "Severe headaches.", content: `Reduce stress.` },

        { title: "Arthritis", img: "https://physiotherapistahmedabad.com/wp-content/uploads/2022/07/Arthritis.jpg", short: "Joint inflammation.", content: `Exercise helps.` },

        { title: "Kidney Stones", img: "https://www.rghospitals.com/assets/admin/images/blog/1760098197_b93c5f50ea69a1556db8.jpg", short: "Hard mineral deposits.", content: `Drink more water.` },

        { title: "Thyroid", img: "https://www.hopkinsmedicine.org/-/media/images/health/1_-conditions/thyroid-cancer/thyroid-conditions-teaser-image.jpg", short: "Hormone imbalance.", content: `Medication needed.` },

        { title: "Skin Allergy", img: "https://dermatologist.earthandetherclinic.com/wp-content/uploads/2025/06/Skin-Allergy-Vs.-Fungal-Infection.jpg", short: "Skin reactions.", content: `Avoid allergens.` },

        { title: "Eye Care", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSfWyzX263bxQZUvmA6sXjr2DRqGKm3-3C9g&s", short: "Protect eyesight.", content: `Reduce screen time.` },

        { title: "Back Pain", img: "https://images.emedicinehealth.com/images/slideshow/emss-topper/low-back-pain.jpg", short: "Spinal discomfort.", content: `Exercise helps.` },

        { title: "Indigestion", img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e", short: "Digestive issues.", content: `Eat light food.` },

        { title: "Sleep Disorder", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773", short: "Poor sleep health.", content: `Maintain sleep routine.` }

    ];
    const blogStart = (blogPage - 1) * blogsPerPage;
    const paginatedBlogs = blogs.slice(blogStart, blogStart + blogsPerPage);
    const blogTotalPages = Math.ceil(blogs.length / blogsPerPage);
    return (
        <>
            <HomeNavbar />

            {/* HERO */}
            <section className="hero text-center text-white">
                <div className="container">

                    <h1 className="display-4 fw-bold fade-in">
                        Book Doctor Appointments Online
                    </h1>

                    <p className="lead">
                        Find the best doctors and manage your health easily
                    </p>

                    <div className="search-box mt-4">
                        <input
                            className="form-control"
                            placeholder="Search doctor or specialization"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                </div>
            </section>


            {/* ================= DOCTORS ================= */}

            <section className="container my-5">

                <h2 className="text-center mb-4">
                    Available Doctors
                </h2>

                <div className="row">

                    {paginatedDoctors.map((d) => (

                        <div className="col-md-4 mb-4" key={d._id}>

                            {/* CLICKABLE CARD */}
                            <div
                                className="card doctor-card text-center shadow"
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedDoctor(d)}
                            >

                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                                    width="100"
                                    className="mx-auto mt-3"
                                />

                                <div className="card-body">

                                    <h5>{d.userId?.name}</h5>

                                    <p className="text-muted">
                                        {d.specialization}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* PAGINATION */}
                <div className="d-flex justify-content-center mt-3">

                    {[...Array(totalPages)].map((_, i) => (

                        <button
                            key={i}
                            className={`btn btn-sm mx-1 ${page === i + 1 ? "btn-primary" : "btn-outline-primary"
                                }`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>

                    ))}

                </div>

            </section>


            {/* ================= DOCTOR DETAIL CARD ================= */}

            {selectedDoctor && (

                <div className="modal show fade d-block">

                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5>{selectedDoctor.userId?.name}</h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setSelectedDoctor(null)}
                                ></button>

                            </div>

                            <div className="modal-body text-center">

                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                                    width="120"
                                    className="mb-3"
                                />

                                <p>
                                    <b>Specialization:</b>{" "}
                                    {selectedDoctor.specialization}
                                </p>

                                <p>
                                    <b>Experience:</b>{" "}
                                    {selectedDoctor.experience} years
                                </p>

                                <p>
                                    <b>Email:</b>{" "}
                                    {selectedDoctor.userId?.email}
                                </p>

                                <p><b>Available Slots:</b></p>

                                {selectedDoctor.availableSlots.map((s, i) => (
                                    <span
                                        key={i}
                                        className="badge bg-primary me-2"
                                    >
                                        {s}
                                    </span>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* ================= HEALTH BLOG SECTION ================= */}

            <section className="container my-5">

                <h2 className="text-center mb-4">Health Blogs</h2>

                <div className="row">

                    {paginatedBlogs.map((b, i) => (
                        <div className="col-md-6 mb-3" key={i}>

                            <div className="card shadow-sm blog-card">

                                <img src={b.img} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />

                                <div className="card-body">

                                    <h5>{b.title}</h5>

                                    <p>{b.short}</p>

                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => setSelectedBlog(b)}
                                    >
                                        Read More
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

                {/* BLOG PAGINATION */}

                <div className="d-flex justify-content-center mt-3">

                    {[...Array(blogTotalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`btn btn-sm mx-1 ${blogPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setBlogPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                </div>

            </section>

            {selectedBlog && (

                <div className="modal show fade d-block">

                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5>{selectedBlog.title}</h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setSelectedBlog(null)}
                                ></button>

                            </div>

                            <div className="modal-body">

                                <img
                                    src={selectedBlog.img}
                                    className="img-fluid mb-3 rounded"
                                />

                                <pre style={{ whiteSpace: "pre-wrap" }}>
                                    {selectedBlog.content}
                                </pre>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            <Footer />
        </>
    );
}