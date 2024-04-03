import { useContext, useRef, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";

const Login = () => {
    const { handleLogin } = useContext(AuthContext);
    const [error, setError] = useState('');
    const emailRef = useRef(null);


    const handleSign = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        handleLogin(email, password)
            .then(result => console.log(result.user))
            .catch((error) => setError(error.message.replace('Firebase: Error (auth/invalid-credential).', 'Invalid password')));
        e.target.reset()

    }

    // set reset password
    const handleForgetPassword = () => {
        console.log('forget click', emailRef.current.value);
        const email = emailRef.current.value;
        if (!email) {
            return setError("Please enter your registered Email");
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return setError("Invalid Email format")
        }

        sendPasswordResetEmail(auth, email)
            .then(result => alert('Check your inbox for a Password Reset link'))
            .catch(error => alert(error.message));
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSign} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email" name="email"
                                placeholder="email"
                                className="input input-bordered"
                                ref={emailRef}
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>{error && <span className="text-red-600">{error}</span>}</p>
                        <p>Do not have any account? Please <Link to='/register'><span className="btn-link">Register</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;