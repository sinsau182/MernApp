import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData() {

    try {
      const response = await axios.get('http://localhost:4000/');
      console.log(response.data);
      setData(response.data);

    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      setTimeout(() => {
      setError("");
        }, 5000);

    }
}

const handleDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4000/${id}`);
    getData();
    setError("Deleted Successfully");
    setTimeout(() => {
      setError("");
    }, 2000);

  } catch (error) {
    console.log(error.response.data.error);
    setError(error.response.data.error);
    setTimeout(() => {
      setError("");
    }, 5000);
  }
}

useEffect(() => {
getData();
}
, []);

  return (
    <div className='container my-2'>
      {error && <div class="alert alert-danger" >{error}</div>}
      <h2 className='text-center'>All Data</h2>

      <div className='row'>
        {data?.map((ele) => (
        <div key={ele._id} className='col-3'>

        <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{ele.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
    <p className="text-muted">{ele.age}</p>
    <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}>
      Delete
      </a>
    <Link to={`/${ele._id}`} className="card-link">
      Edit{" "}
      </Link>
  </div>
</div>
          </div>
          ))}
      </div>
    </div>
  )
}

export default Home
