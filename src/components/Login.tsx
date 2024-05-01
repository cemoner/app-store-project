import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/firebase';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', cred.user);
            navigate("/admin");
        } catch (err:any) {
            console.log("Incorrect email or password:", err.message);
        }
    };
    return (
        <main className="loginMain">
            <form  className="loginForm" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label id="emailLabel" htmlFor="email">email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                />

                <button className="login" type="submit">Login</button>
            </form>
        </main>
    );
};

export default Login;