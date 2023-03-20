import React, { useState } from 'react'
import './auth.css'
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import bg2 from './../../../assets/images/bg2.jpg'





function Register() {
  const history = useHistory();
  const [registerInput, setRegister] = useState({
    // first_name:'',
    // last_name:'',
    // address:'',
    // landmark:'',
    // contact_num:'',
    // email:'',
    // password:'',
    name: '',
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  }

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      // first_name: registerInput.first_name,
      // last_name: registerInput.last_name,
      // address: registerInput.address,
      // landmark: registerInput.landmark,
      // contact_num: registerInput.contact_num,
      // email: registerInput.email,
      // password: registerInput.password,
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/register`, data).then(res => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          history.push('/');
        }
        else {
          setRegister({ ...registerInput, error_list: res.data.validation_errors });
        }
      });
    });
  }
  return (
    <section>
          {/* <Navbar /> */}
    <div className='registerLoginbox ' style={{background: `url(${bg2})no-repeat`}}>
 
      <div className='form-box'>
        <div className='form-value'>
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <div className='inputbox'>
                  <input type="text" name="name" className='inputInput' onChange={handleInput} value={registerInput.name}  required />
                  <label className='labelLabel'>Name</label>
                </div>
                <div className='inputbox'>                 
                    <input type="email" name="email" className='inputInput' onChange={handleInput} value={registerInput.email}  required />
                    <label className='labelLabel'>Email</label>
                    <span>{registerInput.error_list.email}</span>
                 </div>
               <div className='inputbox'>
                   <input type="text" name="password" className='inputInput' onChange={handleInput} value={registerInput.password}  required />
                   <label className='labelLabel'>Password</label>         
                  <span>{registerInput.error_list.password}</span>
                 </div>
                 <div >
                  <button type="submit" name="password" className='buttonButton' >Register</button>
               </div>
            </form>
        </div>

      </div>
    </div>
    </section>
   
  )
}

export default Register
