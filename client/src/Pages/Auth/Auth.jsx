import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import './Auth.css'
import icon from  '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import { signup, login} from '../../actions/auth'

const Auth =() =>{

    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSwitch = () =>{
        setIsSignup(!isSignup)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!email && !password){
            alert('Enter mail and password')
        }
        if(isSignup){
            if(!name){
                alert('Enter a name to continue')
            }
            dispatch(signup({ name, email, password }, navigate))
        }else{
            dispatch(login({ email, password }, navigate))
            alert("User succssfully logged in")
        }
    

    }

    return(
       <section className='auth-section'>
        <div className='aboutauth'>

            { isSignup && <AboutAuth/> }
        </div>

            <div className="auth-container">
                
                {!isSignup && <img src={icon} alt='stack overflow' className='img-logo'/>}
                
                    <form onSubmit={handleSubmit}>
                            <div class='authform' >
                                
                               
                                { isSignup  &&  <label htmlFor='name'>
                                <h4>Display name</h4>
                                <input type='text' name='name' id='name' onChange={(e) =>{setName(e.target.value)}} />
                                </label>
                            
                                }
                                <label htmlFor='email'>
                                    <h4>Email</h4>
                                    <input type='email' name='email' id='email' onChange={(e) =>{setEmail(e.target.value)}}  />
                                </label>
                                <label htmlFor='password'>
                                    <div className='auth-forgot'>
                                        <h4>Password</h4>
                                        { !isSignup && <p> forgot password?</p> }
                                    </div>
                                    <input type='password' name='password' id='password' onChange={(e) =>{setPassword(e.target.value)}}  />
                                    { isSignup && <p id='auth-password'>Passwords must contain atleast eight <br />characters, including atleast 1 Letter and <br /> 1 number</p> }
                                </label><br /><br /><br /><br />
                                <button type='submit' className='auth-btn'>{isSignup? 'Sign up': 'Log in'}</button>
                            </div>
                        </form>
                        <p className='auth-account'>
                            {isSignup? 'Already have an account?': "Don't have an account"}
                        
                        <button type='button' className='handle-swith-btn' onClick={handleSwitch}>{ isSignup? "login in": "sign up" }</button>
                        </p>

                    
                    

            </div>
            
       </section>

            
    )

}

export default Auth