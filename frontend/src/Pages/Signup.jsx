import Heading from '../Components/Header.jsx'
import Subheading from '../Components/Subheading.jsx'
import InputBox from '../Components/InputBox.jsx'
import Button from '../Components/Button.jsx'
import BottomWarning from '../Components/BottomWarning.jsx'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState();

    const navigate = useNavigate();

    return(
        <div >
            <div>
                <div>

                    <Heading text={"Sign Up"} />
                    <Subheading text={"Enter your information to create an account"} />

                    <InputBox 
                        type={"text"} 
                        label={"First Name"} 
                        name={"firstName"} 
                        placeholder={"John"} 
                        onChange={useCallback((e)=>{
                            setFirstName(e.target.value);
                    }, [firstName])} />

                    <InputBox 
                        type={"text"} 
                        label={"Last Name"} 
                        name={"lastName"} 
                        placeholder={"Doe"} 
                        onChange={useCallback((e)=>{
                            setLastName(e.target.value);
                    }, [lastName])} />

                    <InputBox 
                        type={"number"} 
                        label={"Mobile Number"} 
                        name={"mobile"} 
                        placeholder={""} 
                        onChange={useCallback((e)=>{
                            setMobile(e.target.value);
                    }, [mobile])} />

                    <InputBox 
                        type={"email"} 
                        label={"Email"} 
                        name={"username"} 
                        placeholder={"John@email.com"} 
                        onChange={useCallback((e)=>{
                            setUsername(e.target.value);
                    }, [username])} />

                    <InputBox 
                        type={"password"} 
                        label={"Password"} 
                        name={"password"} 
                        placeholder={"123456"} 
                        onChange={useCallback((e)=>{
                            setPassword(e.target.value);
                    }, [password])} />

                    <Button text={"Sign Up"} onClick={async ()=>{
                        try{
                            const result = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                email: username,
                                firstName: firstName,
                                lastName: lastName,
                                password: password,
                                mobile: parseInt(mobile)
                            });
                            
                            localStorage.setItem("token", result.data.token);
                            navigate('/home');
                        }
                        catch(error){
                            if (error.response) {
                            console.log("Error status:", error.response.status);
                            console.log("Error:", error.response.data.message);
                            } else if (error.request) {
                                console.log("No response received:", error.request);
                            } else {
                                console.log("Error setting up the request:", error.message);
                            }
                        }
                    }} />

                    <BottomWarning text={"Already have an acccount? "} buttonText={"Log in"} to={"/login"} />
                </div>
            </div>
        </div>
    )
}

export default Signup