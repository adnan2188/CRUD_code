import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
function Create_form() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSavedForm = () => {
        const data = {
            firstName,
            lastName,
            email,
            password
        };
        axios.post('http://localhost:7890/visitor/register', data)
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="bg-red-500">
            <Link to="/">go back</Link>
            <input
                placeholder="first name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                placeholder="last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="p-2 bg-sky-300 m-8 " onClick={handleSavedForm}>
                Save
            </button>
        </div>

    )
}

export default Create_form
