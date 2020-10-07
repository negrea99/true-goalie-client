import React,{ useState, useEffect } from 'react';
import { register, getUser } from '../api/auth';
import { Redirect } from 'react-router-dom';

const Register = (props) => {
    const [email,setemail]= useState("")
    const [password,setpassword]= useState("")
    const [repassword,setrepassword]= useState("")
    const [username, setUsername] = useState('');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState([]);
    // const [errors, setErrors] = useState({});

    const onChange= (e)=>{
        console.log(e.target.name, e.target.value);
        if (e.target.name==="email") {
            setemail(e.target.value)
        }
        if (e.target.name==="password") {
            setpassword(e.target.value)
        }
        if (e.target.name==="repassword") {
            setrepassword(e.target.value)
        }
        if (e.target.name==="username") {
            setUsername(e.target.value)
        }

    }

    const onClickSubmit = async () => {
        const validationErrors = [];
        try {
            if (username == ''){
                validationErrors.push('Username must be filled');   
            }
            if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
                validationErrors.push('This must be a valid email');
            }
            if (password == '') {
                validationErrors.push('Password must be filled');
            }
            if (repassword == '') {
                validationErrors.push('Repassword must be filled');
            }
            else{
            if (password !== repassword) {
                validationErrors.push('Passwords do not match!');
            }
        }
            if (validationErrors.length === 0) {
                const res =  await register({
                    username,
                    email,
                    password,
                });
                console.log(res);
                setSuccess(true);
            } else {
                setErrors([...validationErrors]);
            }
            
        } catch (error) {
            setErrors([...errors, error])
        }
    }
    console.log(errors);
    console.log(email, password, repassword)
    return (
        <div className="basic-container register-container">
            {
                success && <Redirect to="?registered=Success" />
            }
            <h1 className="page-title">Register</h1>
            <form className="register-form">
                <label className="form-label" htmlFor="username">Username
                    <input type="text" onChange={onChange} name="username" >
                    
                    </input>
                </label>
                {
                     
                    errors.includes('Username must be filled')
                    ? <p id="abc">Username must be filled</p>
                    : null
                }
                <label className="form-label" htmlFor="email">Email
                    <input type="text" onChange={onChange} name="email" >
                    
                    </input>
                </label>
                {
                    errors.includes('This must be a valid email')
                    ? <p id="abc">This must be a valid mail</p>
                    : null
                }
                <label className="form-label" htmlFor="password">Password
                    <input type="password" onChange={onChange} name="password" >
                    
                    </input>
                </label>
                {
                    // errors.repassword 
                    errors.includes('Password must be filled')
                    ? <p id="abc">Password must be filled</p>
                    : null
                }
                <label className="form-label" htmlFor="repassword">Repassword
                    <input type="password" onChange={onChange} name="repassword" >
                    
                    </input>
                </label>
                {
                     
                     errors.includes('Repassword must be filled')
                     ? <p id="abc">Repassword must be filled</p>
                     : null
                }
                {
                    // errors.password
                    errors.includes('Passwords do not match!')
                    ? <p id="abc">Passwords do not match!</p>
                    : null
                }
                

                <p onClick={onClickSubmit} className="register-btn">Register</p>
            </form>
        </div>

    )
}






export default Register