import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/HomeNavbar";

export default function AdminDashboard() {

const [doctors, setDoctors] = useState([]);
const [pendingDoctors, setPendingDoctors] = useState([]);
const [appointments, setAppointments] = useState([]);

const [doctorSearch, setDoctorSearch] = useState("");
const [appointmentSearch, setAppointmentSearch] = useState("");

const [editingDoctor, setEditingDoctor] = useState(null);

const [form, setForm] = useState({
name: "",
email: "",
password: "",
specialization: "",
experience: "",
slots: ""
});

const [editForm, setEditForm] = useState({
specialization: "",
experience: "",
slots: ""
});

useEffect(() => {
loadDoctors();
loadPendingDoctors();
loadAppointments();
}, []);

/* ================= LOAD DATA ================= */

const loadDoctors = async () => {
const res = await api.get("/doctors");
setDoctors(res.data);
};

const loadPendingDoctors = async () => {
const res = await api.get("/admin/pending-doctors");
setPendingDoctors(res.data);
};

const loadAppointments = async () => {
const res = await api.get("/admin/appointments");
setAppointments(res.data);
};

/* ================= ADD DOCTOR ================= */

const addDoctor = async () => {


if (!form.name || !form.email || !form.password) {
  alert("Please fill all required fields");
  return;
}

try {

  await api.post("/admin/add-doctor", {
    name: form.name,
    email: form.email,
    password: form.password,
    specialization: form.specialization,
    experience: form.experience,
    availableSlots: form.slots.split(",")
  });

  alert("Doctor created successfully");

  setForm({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    slots: ""
  });

  loadDoctors();

} catch (err) {

  alert(err.response?.data?.msg || "Failed to add doctor");

}


};

/* ================= APPROVE / REJECT ================= */

const approveDoctor = async (id) => {


await api.put(`/admin/approve-doctor/${id}`);

alert("Doctor approved");

loadPendingDoctors();
loadDoctors();


};

const rejectDoctor = async (id) => {


if (!window.confirm("Reject this doctor?")) return;

await api.put(`/admin/reject-doctor/${id}`);

alert("Doctor rejected");

loadPendingDoctors();


};

const undoRejectDoctor = async (id) => {


await api.put(`/admin/undo-reject-doctor/${id}`);

alert("Rejection undone");

loadPendingDoctors();


};

/* ================= EDIT DOCTOR ================= */

const startEdit = (doctor) => {


setEditingDoctor(doctor);

setEditForm({
  specialization: doctor.specialization,
  experience: doctor.experience,
  slots: doctor.availableSlots.join(",")
});


};

const updateDoctor = async () => {


try {

  await api.put(`/admin/update-doctor/${editingDoctor._id}`, {
    specialization: editForm.specialization,
    experience: editForm.experience,
    availableSlots: editForm.slots.split(",")
  });

  alert("Doctor updated");

  setEditingDoctor(null);

  loadDoctors();

} catch {

  alert("Failed to update doctor");

}


};

/* ================= FILTER ================= */

const filteredDoctors = doctors.filter(d =>
d.userId?.name?.toLowerCase().includes(doctorSearch.toLowerCase())
);

const filteredAppointments = appointments.filter(a =>
a.patientId?.name?.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
a.doctorId?.userId?.name?.toLowerCase().includes(appointmentSearch.toLowerCase())
);

return (
<> <Navbar title="Admin Dashboard" />


  <div className="container mt-4">

    {/* ================= PENDING DOCTORS ================= */}

    <div className="card p-4 mb-4 border-warning">

      <h4>Pending Doctor Approvals</h4>

      {pendingDoctors.length === 0 ? (
        <p className="text-muted">No pending doctors</p>
      ) : (

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {pendingDoctors.map(d => (

              <tr key={d._id}>

                <td>{d.name}</td>
                <td>{d.email}</td>

                <td>
                  {d.rejected ? (
                    <span className="badge bg-danger">Rejected</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Pending</span>
                  )}
                </td>

                <td>

                  {!d.rejected ? (

                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => approveDoctor(d._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectDoctor(d._id)}
                      >
                        Reject
                      </button>
                    </>

                  ) : (

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => undoRejectDoctor(d._id)}
                    >
                      Undo Rejection
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

    {/* ================= ADD DOCTOR ================= */}

    <div className="card p-4 mb-4">

      <h4>Add Doctor (Admin)</h4>

      <input className="form-control mb-2" placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input className="form-control mb-2" placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input type="password" className="form-control mb-2" placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <input className="form-control mb-2" placeholder="Specialization"
        value={form.specialization}
        onChange={e => setForm({ ...form, specialization: e.target.value })} />

      <input className="form-control mb-2" placeholder="Experience"
        value={form.experience}
        onChange={e => setForm({ ...form, experience: e.target.value })} />

      <input className="form-control mb-2" placeholder="Slots (09:00-10:00,10:00-11:00)"
        value={form.slots}
        onChange={e => setForm({ ...form, slots: e.target.value })} />

      <button className="btn btn-primary" onClick={addDoctor}>
        Add Doctor
      </button>

    </div>

    {/* ================= APPROVED DOCTORS ================= */}

    <div className="card p-4 mb-4">

      <h4>Approved Doctors</h4>

      <input
        className="form-control mb-3"
        placeholder="Search doctor..."
        value={doctorSearch}
        onChange={(e) => setDoctorSearch(e.target.value)}
      />

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Slots</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredDoctors.map(d => (

            <tr key={d._id}>

              <td>{d.userId?.name}</td>
              <td>{d.specialization}</td>
              <td>{d.experience}</td>
              <td>{d.availableSlots.join(", ")}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => startEdit(d)}
                >
                  Edit
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

    {/* ================= EDIT DOCTOR ================= */}

    {editingDoctor && (

      <div className="card p-4 mb-4 border-warning">

        <h4>Edit Doctor</h4>

        <input className="form-control mb-2"
          value={editForm.specialization}
          onChange={e => setEditForm({
            ...editForm,
            specialization: e.target.value
          })} />

        <input className="form-control mb-2"
          value={editForm.experience}
          onChange={e => setEditForm({
            ...editForm,
            experience: e.target.value
          })} />

        <input className="form-control mb-2"
          value={editForm.slots}
          onChange={e => setEditForm({
            ...editForm,
            slots: e.target.value
          })} />

        <button
          className="btn btn-success me-2"
          onClick={updateDoctor}
        >
          Save
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => setEditingDoctor(null)}
        >
          Cancel
        </button>

      </div>

    )}

    {/* ================= APPOINTMENTS ================= */}

    <div className="card p-4">

      <h4>All Appointments</h4>

      <input
        className="form-control mb-3"
        placeholder="Search appointments..."
        value={appointmentSearch}
        onChange={(e) => setAppointmentSearch(e.target.value)}
      />

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {filteredAppointments.map(a => (

            <tr key={a._id}>

              <td>{a.patientId?.name}</td>
              <td>{a.doctorId?.userId?.name}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>

              <td>

                <span className={`badge ${
                  a.status === "Approved"
                    ? "bg-success"
                    : a.status === "Rejected"
                    ? "bg-danger"
                    : "bg-warning text-dark"
                }`}>
                  {a.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
</>


);
}
