import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_BASE_URL

function LoginForm() {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = async (e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      })
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("accountType", response.data.user.accountType);
      localStorage.setItem('userId', response.data.user._id);
      toast.success("Logged In")
      navigate("/dashboard");
    }catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Assuming 401 is used for both invalid email and invalid password
        if (error.response.data.message === "User is not Registered with Us Please SignUp to Continue") {
          toast.error("Email does not exist. Please sign up.");
          navigate("/signup");
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
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
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
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
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
