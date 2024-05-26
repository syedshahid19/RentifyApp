import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-richblack-800 py-6 text-richblack-400 bottom-0 w-full'>
      <div className="container mx-auto text-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-3">Rentify</h2>
          <div className='w-full md:w-11/12 mx-auto border-b pb-4'>
            <h2 className="text-xl font-bold">Contact Us</h2>
            <p className="mt-2">Email: info@rentify.com</p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Rentify St, Real Estate City</p>
          </div>
          <p className='mt-3'>&copy; 2024 Rentify. All rights reserved.</p>
      </div>
     </div>
    </footer>
  )
}

export default Footer
