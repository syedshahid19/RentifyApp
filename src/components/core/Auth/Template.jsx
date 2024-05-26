import React from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Template = ({title, description, formType}) => {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center mt-10 relative z-0">
      <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description}</span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
    </div>
  )
}

export default Template
