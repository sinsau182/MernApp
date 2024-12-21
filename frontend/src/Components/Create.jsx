import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, age };

    try {
      const response = await axios.post(`${BASE_URL}/api/v4`, newUser);
      console.log(response.data);
      setName('');
      setEmail('');
      setAge(0);
      navigate('/all');
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className="container my-5">
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="card shadow p-4">
        <h2 className="text-center text-primary mb-4">Enter the Data</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </div>
          <button type="submit" className="btn btn-primary w-75 mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
