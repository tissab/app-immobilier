import React from 'react'

const myStyle = {
   zIndex: "2000", 
   position:"fixed", 
   left: "50%", 
   top: "50%",
   width: "5rem", 
   height: "5rem"
}

const SpinnerLoading = () => {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow" style={myStyle} role="status">
          <span className="sr-only">Loading...</span>
        </div>
    </div>
    )
}

export default SpinnerLoading
