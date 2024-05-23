import React from 'react'

const Checkbox = ({title, state, onChange}) => {
  return (
    <div className='flex items-center gap-2'>
      <input type='checkbox' checked={state} onChange={onChange}/>
      <label>{title}</label>
    </div>
  )
}

export default Checkbox
