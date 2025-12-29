import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTeamHeadModal from "./AddTeamHeadModal";

export default function TeamHeadPage() {
  const [teamHeads, setTeamHeads] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const loadTeamHeads = async () => {
    try {
      const res = await axios.get(
        "https://hr-server-six.vercel.app/api/teamhead/all"
      );
      setTeamHeads(res.data);
    } catch (err) {
      alert("Failed to load team heads");
    }
  };

  const deleteTeamHead = async (id) => {
    if (!window.confirm("Delete this team head?")) return;

    try {
      await axios.delete(
        `https://hr-server-six.vercel.app/api/teamhead/delete/${id}`
      );
      loadTeamHeads();
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    loadTeamHeads();
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: 30 }}>
      <h2>Team Heads</h2>

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "10px 20px",
          marginBottom: 15,
          backgroundColor: "#2a7bbf",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        + Add Team Head
      </button>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {teamHeads.map((th, i) => (
            <tr key={th._id}>
              <td>{i + 1}</td>
              <td>{th.name}</td>
             <td>{th.department}</td>
              <td>
                <button
                  onClick={() => deleteTeamHead(th._id)}
                  style={{
                    background: "red",
                    color: "white",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddTeamHeadModal
          onClose={() => setShowModal(false)}
          onSave={() => {
            setShowModal(false);
            loadTeamHeads();
          }}
        />
      )}
    </div>
  );
}
