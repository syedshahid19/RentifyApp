import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {toast} from 'react-hot-toast'
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const BASE_URL = process.env.REACT_APP_BASE_URL

function SignupForm() {
  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.SELLER)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber:"",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate();

  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = async (e)=>{
    e.preventDefault();

    if(password !== confirmPassword){
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData,
      accountType
    }

    try{
      const response = await axios.post(`${BASE_URL}/signup`, signupData);
      localStorage.setItem('userId', response.data.user._id);
      console.log("sign up response", response);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
        navigate("/login");
      }else {
        toast.error("Something went wrong. Please try again later.");
      }
    }

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber:"",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.SELLER)

  }


  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Seller",
      type: ACCOUNT_TYPE.SELLER,
    },
    {
      id: 2,
      tabName: "Buyer",
      type: ACCOUNT_TYPE.BUYER,
    },
  ]

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form className="flex w-full flex-col gap-y-4" onSubmit={handleOnSubmit}>
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-style w-full bg-richblack-800 h-12 pl-4 rounded-lg text-richblack-50"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-style w-full bg-richblack-800 h-12 pl-4 rounded-lg text-richblack-50"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full bg-richblack-800 h-12 pl-4 rounded-lg text-richblack-50"
          />
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Phone Number <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleOnChange}
            placeholder="Enter Phone Number"
            className="form-style w-full bg-richblack-800 h-12 pl-4 rounded-lg text-richblack-50"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full !pr-10 bg-richblack-800 h-12 pl-4 rounded-lg text-richblack-50"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full !pr-10 bg-richblack-800 h-12 pl-4 rounded-lg text-richblack-50"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 mb-10 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
