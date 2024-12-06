import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const getSingleUser = async () => {

    try {
      const response = await axios.get(`http://localhost:4000/api/v4/${id}`);
      console.log(id);
      setName(response.data.name);
      setEmail(response.data.email);
      setAge(response.data.age);
      } catch(error) {
        setError(error.response.data.error);
  
        setTimeout(() => {
          setError("");
        }, 2000)
      }
    
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {name, email, age}


    try {
      console.log(updatedUser);
        const response = await axios.patch(`http://localhost:4000/api/v4/${id}`, updatedUser);

        console.log(response.data);
        navigate("/all");

    } catch (error) {
        console.log(error.response.data.error);
        setError(error.response.data.error);
        setTimeout(() => {
            setError("");
        }, 5000);
    }
  }

  useEffect(() => {
    getSingleUser();
  }
  , []);

  return (
    <div>
  <div className="container my-4 p-4" style={{ maxWidth: "600px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
    {error && (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )}
    <h2 className="text-center mb-4" style={{ color: "#333", fontWeight: "600" }}>Edit Your Data</h2>

    <form onSubmit={handleUpdate}>
      <div className="mb-3">
        <label className="form-label" style={{ fontWeight: "500" }}>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px" }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" style={{ fontWeight: "500" }}>Email Address</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", borderRadius: "6px" }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label" style={{ fontWeight: "500" }}>Age</label>
        <input
          type="number"
          className="form-control"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onFocus={(e) => e.target.select()}
          style={{ padding: "10px", borderRadius: "6px" }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-100"
        style={{ padding: "10px", fontWeight: "500", borderRadius: "6px" }}
      >
        Submit
      </button>
    </form>
  </div>
</div>

  )
}

export default Update
