import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    bedrooms: '',
    bathrooms: '',
  });
  const [interestedPropertyId, setInterestedPropertyId] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6); // Set the number of properties per page
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredProperties = properties.filter((property) =>
    (!filters.location || property.location.includes(filters.location)) &&
    (!filters.bedrooms || property.bedrooms === Number(filters.bedrooms)) &&
    (!filters.bathrooms || property.bathrooms === Number(filters.bathrooms))
  );

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/showAllProperties`);
        if (response.data.success) {
          setProperties(response.data.propertyDetails);
        } else {
          toast.error('Failed to fetch properties:', response.data.message);
        }
      } catch (error) {
        toast.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  
  const userId = localStorage.getItem('userId');
  const handleInterest = async (propertyId, sellerId) => {
    const token = localStorage.getItem('token');

    if (userId === sellerId) {
      toast.error("You cannot express interest in your own property.");
      return;
    }


    if (!token) {
      navigate('/login');
      toast.error("You cannot express interest in property without login.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${BASE_URL}/expressInterestProperty/${propertyId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      console.log(response);
      if (response.data.success) {
        toast.success('Seller details sent to your email.');
        setInterestedPropertyId(propertyId);
        setSellerDetails(response.data.seller); 
      } else {
        toast.error(`Failed to express interest: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error expressing interest:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error expressing interest: ${error.response.data.message}`);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleLike = async (propertyId, sellerId) => {

    if (userId === sellerId) {
      toast.error("You cannot like your own property.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/likeProperty/${propertyId}`);
      if (response.data.success) {
        // Update the like count for the property in the state
        setProperties(properties.map(property => 
          property._id === propertyId ? { ...property, likes: response.data.likes } : property
        ));
        toast.success('Liked the property!');
      } else {
        toast.error(`Failed to like the property: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error liking property:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error liking property: ${error.response.data.message}`);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto px-4 py-8 w-11/12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-richblack-50">Filter Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentProperties.map((property) => (
          <div
            key={property._id}
            className={`bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between transition-all duration-300 ${
              interestedPropertyId === property._id ? 'h-auto' : ''
            }`}
          >
            <div>
              <h3 className="text-xl font-bold mb-2">{property.location}</h3>
              <p className="mb-1"><strong>Area:</strong> {property.area} sqft</p>
              <p className="mb-1"><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p className="mb-1"><strong>Bathrooms:</strong> {property.bathrooms}</p>
              <p className="mb-1"><strong>Nearby Hospitals:</strong> {property.nearbyHospitals}</p>
              <p className="mb-1"><strong>Nearby Colleges:</strong> {property.nearbyColleges}</p>
            </div>
            <div >
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4 md:mb-2 hover:bg-green-600 transition duration-300"
                onClick={() => handleInterest(property._id, property.sellerId)}
              >
                I'm Interested 
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition duration-300"
                onClick={() => handleLike(property._id, property.sellerId)}
              >
                Like {property.likes || 0}
              </button>
              {interestedPropertyId === property._id && sellerDetails && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                  <h4 className="text-lg font-bold">Seller Details</h4>
                  <p className="mb-1"><strong>Name:</strong> {sellerDetails.firstName}</p>
                  <p className="mb-1"><strong>Email:</strong> {sellerDetails.email}</p>
                  <p className="mb-1"><strong>Phone:</strong> {sellerDetails.phoneNumber}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => paginate(1)}
          className={`px-2 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-blue-500 text-white' : 'text-richblack-50'}`}
        >
          First
        </button>
        <button
          onClick={prevPage}
          className="px-2 py-2 mx-1 rounded text-richblack-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-2 py-2 mx-1 rounded-full ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-richblack-50'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          className="px-2 py-2 mx-1 rounded text-richblack-50"
        >
          Next
        </button>
        <button
          onClick={() => paginate(totalPages)}
          className={`px-2 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-blue-500 text-white' : ' text-richblack-50'}`}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Properties;
