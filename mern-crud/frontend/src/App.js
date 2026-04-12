import { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    rollNo: "",
    contact: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStudent = async () => {
    await fetch("http://localhost:5000/students/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ firstName: "", lastName: "", rollNo: "", contact: "" });
    setIsEditing(false);
    fetchStudents();
  };

  const updateStudent = async () => {
    await fetch(`http://localhost:5000/students/${form.rollNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ firstName: "", lastName: "", rollNo: "", contact: "" });
    setIsEditing(false);
    fetchStudents();
  };

  const deleteStudent = async (rollNo) => {
    await fetch(`http://localhost:5000/students/${rollNo}`, {
      method: "DELETE"
    });
    fetchStudents();
  };

  const editStudent = (student) => {
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      rollNo: student.rollNo,
      contact: student.contact
    });
    setIsEditing(true);
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateStudent();
    } else {
      addStudent();
    }
  };

  const styles = {
    app: {
      backgroundColor: "#0f1623",
      minHeight: "100vh",
      padding: "24px",
      fontFamily: "sans-serif",
      color: "#e2e8f0"
    },
    hero: {
      backgroundColor: "#1a2232",
      borderRadius: "16px",
      padding: "40px",
      textAlign: "center",
      marginBottom: "28px"
    },
    heroTitle: {
      fontSize: "32px",
      fontWeight: "600",
      color: "#60a5fa",
      marginBottom: "8px"
    },
    heroSub: {
      color: "#94a3b8",
      fontSize: "15px"
    },
    layout: {
      display: "grid",
      gridTemplateColumns: "380px 1fr",
      gap: "20px"
    },
    panel: {
      backgroundColor: "#1a2232",
      borderRadius: "14px",
      padding: "28px"
    },
    panelTitle: {
      color: "#60a5fa",
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "24px"
    },
    fieldWrap: {
      marginBottom: "18px"
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#cbd5e1",
      marginBottom: "8px"
    },
    input: {
      width: "100%",
      backgroundColor: "#0f1a2e",
      border: "1.5px solid #2d3e55",
      borderRadius: "8px",
      padding: "10px 14px",
      color: "#e2e8f0",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box"
    },
    inputReadonly: {
      width: "100%",
      backgroundColor: "#1e2d40",
      border: "1.5px solid #2d3e55",
      borderRadius: "8px",
      padding: "10px 14px",
      color: "#64748b",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box"
    },
    btnAdd: {
      width: "100%",
      padding: "11px",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "8px"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse"
    },
    th: {
      color: "#60a5fa",
      fontSize: "13px",
      fontWeight: "500",
      padding: "14px 16px",
      textAlign: "left",
      borderBottom: "1.5px solid #2d3e55",
      letterSpacing: "0.04em"
    },
    td: {
      padding: "14px 16px",
      fontSize: "14px",
      color: "#cbd5e1",
      borderBottom: "1px solid #1e2d40"
    },
    btnEdit: {
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "6px 16px",
      cursor: "pointer",
      fontSize: "13px",
      marginRight: "6px"
    },
    btnDelete: {
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "6px",
      padding: "6px 16px",
      cursor: "pointer",
      fontSize: "13px"
    }
  };

  return (
    <div style={styles.app}>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Student Registration System</h1>
        <p style={styles.heroSub}>Manage student records efficiently with our secure portal.</p>
      </div>

      <div style={styles.layout}>
        {/* Form Panel */}
        <div style={styles.panel}>
          <div style={styles.panelTitle}>
            {isEditing ? "Update Student Details" : "Add Student Details"}
          </div>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>First Name</label>
            <input
              style={styles.input}
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>Last Name</label>
            <input
              style={styles.input}
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>Roll No / ID (Read Only)</label>
            <input
              style={styles.inputReadonly}
              name="rollNo"
              placeholder="Auto-generated"
              value={form.rollNo}
              readOnly
            />
          </div>

          <div style={styles.fieldWrap}>
            <label style={styles.label}>Contact Number</label>
            <input
              style={styles.input}
              name="contact"
              placeholder="Contact number"
              value={form.contact}
              onChange={handleChange}
            />
          </div>

          <button style={styles.btnAdd} onClick={handleSubmit}>
            {isEditing ? "Update Student" : "Add Student"}
          </button>
        </div>

        {/* Table Panel */}
        <div style={styles.panel}>
          <div style={styles.panelTitle}>Registered Students</div>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ROLL NO</th>
                  <th style={styles.th}>NAME</th>
                  <th style={styles.th}>CONTACT</th>
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ ...styles.td, color: "#475569" }}>
                      No students registered yet.
                    </td>
                  </tr>
                ) : (
                  students.map((s) => (
                    <tr key={s.rollNo}>
                      <td style={styles.td}>{s.rollNo}</td>
                      <td style={styles.td}>{s.firstName} {s.lastName}</td>
                      <td style={styles.td}>{s.contact}</td>
                      <td style={styles.td}>
                        <button style={styles.btnEdit} onClick={() => editStudent(s)}>
                          Edit
                        </button>
                        <button style={styles.btnDelete} onClick={() => deleteStudent(s.rollNo)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;