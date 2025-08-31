// somewhere in AdminHistory.jsx
import { useEffect, useState } from "react";

const API_BASE = "https://quiz.selfmade.express";

export default function AdminHistory() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  
const load = async () => {
  let token = localStorage.getItem("token");
  try {
    const res = await fetch(`${API_BASE}/api/getdetails`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await res.json();

    // Ensure it's an array, otherwise fallback empty
    if (Array.isArray(json)) {
      setData(json);
    } else {
      setData([]);
    }
  } catch (err) {
    setData([]);
  }
};

  useEffect(() => {
    load();
  }, []); // load on mount

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Certificate History</h2>
      <input
        placeholder="Search by name / roll / technology"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") load();
        }}
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={() => load()}>Search</button>

      <table
        style={{ marginTop: 16, width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: 8,
              }}
            >
              Student
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: 8,
              }}
            >
              Roll No
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: 8,
              }}
            >
              Technology
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: 8,
              }}
            >
              Score
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: 8,
              }}
            >
              Date
            </th>
            <th
              style={{
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                padding: 8,
              }}
            >
              Shared Via
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((c) => (
            <tr key={c._id}>
              <td style={{ padding: 8 }}>{c.studentName}</td>
              <td style={{ padding: 8 }}>{c.rollNo}</td>
              <td style={{ padding: 8 }}>{c.technology}</td>
              <td style={{ padding: 8 }}>{c.score}</td>
              <td style={{ padding: 8 }}>{c.date}</td>
              <td style={{ padding: 8 }}>{(c.sharedVia || []).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
