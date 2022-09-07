import React from 'react'

function Profile(props) {
  return (
    <div className='centerDiv row' style={{
      marginTop:"15%",
      backgroundColor:"palegreen",
      border:"1px solid green",
      borderRadius:"20px",
      width:"50%"
      }}>
      <h1>Profile Details</h1>
      <form>
        <div className="form-outline mb-4">
          <h1>
            email:{props.getdetails()[0]}
          </h1>
        </div>
        <div className="form-outline mb-4">
          <h1>
            Password:{props.getdetails()[1]}
          </h1>
        </div>
        {/* <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button> */}
      </form>
   </div>
  )
}

export default Profile