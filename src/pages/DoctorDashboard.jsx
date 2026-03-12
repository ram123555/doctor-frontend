import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/HomeNavbar";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("All");

  const [doctor, setDoctor] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  const [profileForm, setProfileForm] = useState({
    specialization: "",
    experience: "",
    slots: ""
  });

  // Load data
  useEffect(() => {
    loadAppointments();
    loadProfile();
  }, []);

  // ================= LOAD APPOINTMENTS =================
  const loadAppointments = async () => {
    const res = await api.get("/appointments/doctor");
    setAppointments(res.data);
  };

  // ================= LOAD PROFILE =================
  const loadProfile = async () => {
    const res = await api.get("/doctors/profile");
    setDoctor(res.data);
    setProfileForm({
      specialization: res.data.specialization,
      experience: res.data.experience,
      slots: res.data.availableSlots.join(",")
    });
  };

  // ================= UPDATE PROFILE =================
  const updateProfile = async () => {
    try {
      await api.put("/doctors/profile", {
        specialization: profileForm.specialization,
        experience: profileForm.experience,
        availableSlots: profileForm.slots.split(",")
      });

      alert("Profile updated successfully");
      setEditProfile(false);
      loadProfile();
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  // ================= APPROVE / REJECT =================
  const updateStatus = async (id, status) => {
    await api.put(`/appointments/status/${id}`, { status });
    setAppointments(prev =>
      prev.map(app =>
        app._id === id ? { ...app, status } : app
      )
    );
  };

  // ================= FILTER =================
  const filteredAppointments = appointments.filter(app => {
    if (filter === "All") return true;
    return app.status === filter;
  });

  const badgeClass = status => {
    if (status === "Approved") return "badge bg-success";
    if (status === "Rejected") return "badge bg-danger";
    return "badge bg-warning text-dark";
  };

  return (
    <>
      <Navbar title="Doctor Dashboard" />

      <div className="container mt-4">

        {/* ================= DOCTOR PROFILE ================= */}
        {doctor && (
          <div className="card p-4 mb-4">
            <h4>My Profile</h4>

            <p><b>Name:</b> {doctor.userId.name}</p>
            <p><b>Email:</b> {doctor.userId.email}</p>

            {!editProfile ? (
              <>
                <p><b>Specialization:</b> {doctor.specialization}</p>
                <p><b>Experience:</b> {doctor.experience} years</p>
                <p><b>Available Slots:</b> {doctor.availableSlots.join(", ")}</p>

                <button
                  className="btn btn-warning"
                  onClick={() => setEditProfile(true)}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <input
                  className="form-control mb-2"
                  value={profileForm.specialization}
                  onChange={e =>
                    setProfileForm({ ...profileForm, specialization: e.target.value })
                  }
                />

                <input
                  type="number"
                  className="form-control mb-2"
                  value={profileForm.experience}
                  onChange={e =>
                    setProfileForm({ ...profileForm, experience: e.target.value })
                  }
                />

                <input
                  className="form-control mb-2"
                  placeholder="09:00-10:00,10:00-11:00"
                  value={profileForm.slots}
                  onChange={e =>
                    setProfileForm({ ...profileForm, slots: e.target.value })
                  }
                />

                <button className="btn btn-success me-2" onClick={updateProfile}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditProfile(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}

        {/* ================= FILTER BUTTONS ================= */}
        <div className="mb-3">
          <button className="btn btn-secondary me-2" onClick={() => setFilter("All")}>
            All
          </button>
          <button className="btn btn-warning me-2" onClick={() => setFilter("Pending")}>
            Pending
          </button>
          <button className="btn btn-success me-2" onClick={() => setFilter("Approved")}>
            Approved
          </button>
          <button className="btn btn-danger" onClick={() => setFilter("Rejected")}>
            Rejected
          </button>
        </div>

        {/* ================= APPOINTMENTS TABLE ================= */}
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No appointments found
                </td>
              </tr>
            ) : (
              filteredAppointments.map(app => (
                <tr key={app._id}>
                  <td>{app.patientId?.name}</td>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>
                    <span className={badgeClass(app.status)}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    {app.status === "Pending" ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => updateStatus(app._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => updateStatus(app._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-muted">No action</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </>
  );
}
