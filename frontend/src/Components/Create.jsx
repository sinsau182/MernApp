import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const [error, setError] = useState("");

    const navigate = useNavigate();

    console.log(name, email, age);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {name, email, age}

        try {
            const response = await axios.post('http://localhost:4000/api/v4', newUser);
            console.log(response.data);
            setName('');
            setEmail('');
            setAge(0);
            navigate("/all");

        } catch (error) {
            console.log(error.response.data.error);
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

  return (
    <div className='container my-2'>
      {error && <div class="alert alert-danger" >{error}</div>}
        <h2 className='text-center'>Enter the Data</h2>

        <form onSubmit={handleSubmit} >
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
  )
}

export default Create
