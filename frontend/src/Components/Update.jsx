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
      const response = await axios.get(`http://localhost:4000/${id}`);
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
        const response = await axios.patch(`http://localhost:4000/${id}`, updatedUser);
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
      <div className='container my-2'>
      {error && <div class="alert alert-danger" >{error}</div>}
        <h2 className='text-center'>Edit your Data</h2>

        <form onSubmit={handleUpdate} >
        <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" className="form-control" 
    value={name}
    onChange={(e) => setName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Age</label>
    <input type="number" className="form-control" 
    value={age} 
    onChange={(e) => setAge(e.target.value)}
    onFocus={(e) => e.target.select()} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </div>
    </div>
  )
}

export default Update
