import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast'
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Dashboard = () => {

  const [showProperties, setShowProperties] = useState([]);
  

  console.log("prop", showProperties);
  useEffect(() => {
    fetchProperties();
  }, []);
        
  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Dash", token);
      const response = await axios.get(`${BASE_URL}/getProperty`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setShowProperties(Array.isArray(response.data.properties) ? response.data.properties : []);
    } catch (error) {
      toast.error('Failed to fetch properties.');
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting property with ID:", id);
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${BASE_URL}/deleteProperty/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Property deleted successfully!')
      setShowProperties(showProperties.filter(property => property._id !== id));
    } catch (error) {
      toast.error('Failed to delete property.')
    }
  }

  return (
    <div className='flex items-center justify-center flex-col mt-10'>
      <h1 className='text-richblack-50 text-3xl font-semibold border p-2 rounded-lg mb-4'>My Properties</h1>
      <Link to="/createProperty">
        <span className='text-2xl font-semibold text-richblack-50 mt-2'>
          Add Property
        </span>
      </Link>
      <ul>
      {showProperties.length > 0 ? (
        <ul className='flex items-center justify-center flex-wrap gap-4 m-5 w-11/12'>
          {showProperties.map(property => (
            <li key={property._id}>
              <div className='text-richblack-50 border mt-4 p-4 bg-pure-greys-700 border-pure-greys-400 rounded-2xl'>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Area:</strong> {property.area}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                <p>
                  <strong>Nearby Hospitals:</strong> {property.nearbyHospitals?.join(', ') || 'N/A'}
                </p>
                <p>
                  <strong>Nearby Colleges:</strong> {property.nearbyColleges?.join(', ') || 'N/A'}
                </p>
                <div className='flex items-center gap-3 mt-4'>
                  <Link to={`/updateProperty/${property._id}`} className="bg-green-500 border border-green-300 p-2 rounded-md">Edit</Link>
                  <button onClick={() => handleDelete(property._id)} className="bg-red-500 border border-red-300 p-2 rounded-md">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-richblack-50 text-2xl mt-12">No properties found.</p>
      )}
      </ul>
    </div>
  )
}

export default Dashboard


