import React, {useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import usePropertyForm from '../../../hooks/usePropertyForm';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { formData, setFormData, handleInputChange, addField } = usePropertyForm({
    location: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    nearbyHospitals: [""],
    nearbyColleges: [""],
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getProperty/${id}`);
        const { location, area, bedrooms, bathrooms, nearby } = response.data;
        setFormData({
          location,
          area,
          bedrooms,
          bathrooms,
          nearbyHospitals: nearby.hospitals,
          nearbyColleges: nearby.colleges,
        });
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };
    fetchProperty();
  }, [id, setFormData]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/updateProperty/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
      );
      navigate('/dashboard/seller');
      toast.success("Property updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center w-11/12 gap-2">
        <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
          {['location', 'area', 'bedrooms', 'bathrooms'].map((field, idx) => (
            <label key={idx}>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                {field.charAt(0).toUpperCase() + field.slice(1)} <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name={field}
                value={formData[field]}
                onChange={(e) => handleInputChange(null, e.target.value, field)}
                placeholder={`Enter ${field}`}
                className="form-style bg-richblack-800 h-12 pl-4 rounded-lg text-richblack-50"
              />
            </label>
          ))}
        </div>
        <div className='grid grid-cols-1 grid-rows-2 gap-3'>
          {['nearbyHospitals', 'nearbyColleges'].map((field, idx) => (
            <label key={idx} className="text-richblack-50">
              <p className="mb-2 text-[0.875rem] leading-[1.375rem] text-richblack-5 mt-2">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
              </p>
              {formData[field].map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => handleInputChange(index, e.target.value, field)}
                  className="form-style bg-richblack-800 h-12 pl-4 rounded-lg text-richblack-50 w-[420px] flex gap-3 mt-3"
                  placeholder={`Enter ${field.slice(6, -1)}`}
                />
              ))}
              <button type="button" onClick={() => addField(field)} className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Add {field.slice(6, -1)}</button>
            </label>
          ))}
        </div>
        <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 mb-8">
          Update Property
        </button>
      </form>
    </div>
  );
};


export default UpdateProperty;
