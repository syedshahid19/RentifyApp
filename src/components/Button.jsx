import React from 'react';

const Button = (props) => {
  return (
    <button 
      className='bg-yellow-200 font-inter p-2 rounded-md text-base text-center font-bold hover:bg-yellow-400 transition-all duration-200 cursor-pointer transform hover:scale-105' 
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
