import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await axios.get("http://localhost:4000/api/v4");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.response?.data?.error || "An error occurred");
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v4/${id}`);
      getData();
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
      }, 2000);
    } catch (error) {
      console.log(error.response?.data?.error || "An error occurred");
      setError(error.response?.data?.error || "An error occurred");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-4">
      {/* Alert Message */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Header */}
      <h2 className="text-center mb-4">All Data</h2>

      {/* Data Cards */}
      <div className="row">
        {data?.length ? (
          data.map((ele) => (
            <div key={ele._id} className="col-md-4 col-lg-3 my-3">
              <div className="card border-dark shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text text-muted">Age: {ele.age}</p>
                  <div className="d-flex justify-content-evenly ">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(ele._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/${ele._id}`} className="btn btn-primary btn-sm">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
