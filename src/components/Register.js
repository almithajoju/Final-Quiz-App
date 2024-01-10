import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "./Card";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const checkEmail = (users) => {
        const user = users.find((user) => user.email === email);
        return user;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const existingUser = await axios.get("/users").then((res) => checkEmail(res.data));

            if (existingUser) {
                alert("User already exists!");
            } else {
                const newUser = { username, email, password };
                await axios.post("/users", newUser);
                alert("User created!");
                navigate("/Home")
            }
        } catch (error) {
            console.error("Error during user registration:", error);
        }
    };

    return (
        <div className="container">
            <Card>
                <form className="form-container">
                    <h1>Register User</h1>
                    <label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button className="btn" type="submit" onClick={handleSubmit}>
                        <p>Register</p>
                    </button>
                </form>
            </Card>
        </div>
    );
};

export default Register;
