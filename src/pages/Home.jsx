import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"

const Home = () => {
  return (
    <section id="services" className="py-16">
    <div className="container mx-auto text-center w-11/12">
     <Link to={"/signup"}>
          <div className="group mx-auto -mt-2 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become Seller</p>
              <FaArrowRight />
            </div>
          </div>
      </Link>
      <h2 className="text-center text-4xl bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold mt-8">Our Services</h2>
      <p className="mt-4 text-lg font-bold text-richblack-300">We provide the best solutions for both tenants and landlords</p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-blue-300 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800">For Tenants</h3>
            <p className="mt-2 text-gray-600">Find your dream rental home with our extensive listings and advanced search options.</p>
        </div>
        <div className="bg-green-300 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800">For Landlords</h3>
            <p className="mt-2 text-gray-600">List your property with us and connect with reliable tenants easily.</p>
        </div>
        <div className="bg-yellow-300 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-800">24/7 Support</h3>
            <p className="mt-2 text-gray-600">Our team is here to help you with any queries or issues around the clock.</p>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Home
