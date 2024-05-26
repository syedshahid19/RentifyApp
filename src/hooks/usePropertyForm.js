import { useState } from 'react';

const usePropertyForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (index, value, field) => {
    if (field === "nearbyHospitals" || field === "nearbyColleges") {
      const updatedField = [...formData[field]];
      updatedField[index] = value;
      setFormData(prevData => ({ ...prevData, [field]: updatedField }));
    } else {
      setFormData(prevData => ({ ...prevData, [field]: value }));
    }
  };

  const addField = (field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: [...prevData[field], ""],
    }));
  };

  return { formData, setFormData, handleInputChange, addField };
};

export default usePropertyForm;
