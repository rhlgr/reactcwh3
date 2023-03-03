import React from 'react'
import loader from "./loading.gif"
const Loader = ()=> {
  
    return (
      <div className='text-center'>
        <img style={{height:"40vmax"}} src={loader} alt= {loader} />
      </div>
    )
  
}

export default Loader
