import React ,{useRef,useState} from 'react'
import './globalstyles.css'
import { checkUserLogin } from '../backend-requests/requests'
function Login(props) {
  let emailRef=useRef('')
  let passRef=useRef('')

  const [warn,setwarn]=useState(null)

  const onSubmit=()=>{
    let email=emailRef.current.value
    let pass=passRef.current.value
    checkUserLogin((d)=>{
      console.log(d)
      if(d.isValid)
      props.setLogin(email,pass)
      else
      setwarn("Invalid creds")
    },email,pass)
  }

  return (
    <div className='centerDiv row' style={{
      marginTop:"15%",
      backgroundColor:"palegreen",
      border:"1px solid green",
      borderRadius:"20px"
      }}>
      <h1>Login</h1>
      <form>
        <div className="form-outline mb-4">
          <input type="email" ref={emailRef}  className="form-control" placeholder='email: admin@gmail.com'/>
        </div>
        <div className="form-outline mb-4">
          <input type="password" ref={passRef}  className="form-control" placeholder='pass: admin' />
        </div>
        <button type="button" onClick={onSubmit} className="btn btn-primary btn-block mb-4">Sign in</button>
        {warn&&<div style={{
      backgroundColor:"mistyrose",
      border:"1px solid red",
      borderRadius:"20px"
      }}>{warn}</div>}
      </form>
   </div>
  )
}

export default Login