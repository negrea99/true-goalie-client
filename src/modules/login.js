import React,{ useState, useEffect } from 'react';
import { login } from '../api/auth';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
    const [email,setemail]= useState("")
    const [password,setpassword]= useState("")
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const onChange= (e)=>{
        if (e.target.name==="email") {
            setemail(e.target.value)
        }
        if (e.target.name==="password") {
            setpassword(e.target.value)
        }
    }

    const onClickLogin = async () => {
        try {
                if (email == ''){
                    setErrors([...errors, 'This must be filled'])
                }
                const res = await login({
                    identifier: email,
                    password,
                });
  
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.jwt);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    setSuccess(true);
                } else {
                    setErrors([res.response.data.data[0].messages[0].message]);
                }
        } catch (error) {
            console.log(error);
            console.log(Object.keys(error));
            setErrors([...errors, error])
        }
    }
console.log(errors);
    return (
        <div className="basic-container register-container">
            {
                success && <Redirect to="?login=Success" />
            }
            <h1 className="page-title">Login</h1>
            {
                errors.map((item, index) => {
                    return (
                        <p id="abc" key={index}>{item}</p>
                    )
                })
            }
            <form className="register-form">
            <label className="form-label"  htmlFor="email">Email
                <input type="text" onChange={onChange} name="email" >
                
                </input>
            </label>
            <label className="form-label"  htmlFor="password">Password
                <input type="password" onChange={onChange} name="password" >
                
                </input>
            </label>
            </form>
            <p onClick={onClickLogin} className="register-btn">Login</p>
            
        </div>

    )
}
export default Login