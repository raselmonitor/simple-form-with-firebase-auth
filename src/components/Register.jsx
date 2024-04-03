import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";

const Register = () => {
    const [error, setError] = useState('');
    const { handleSignUp } = useContext(AuthContext);
    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirm.value;
        const agree = e.target.agree.checked;
        console.log(name, email, password, confirmPassword, agree);

        setError('')

        if (password.length < 8) {
            return setError('Please use minimum 8 characters for the password')
        }

        if (password !== confirmPassword) {
            return setError('password dose not match')
        }
        if (!agree) {
            return setError('please accept out trams & condition')
        }

        handleSignUp(email, password)
            .then(result => {
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(result => console.log(result.user))
                    .catch(err => console.log(err))
                console.log(result.user)
            })
            .catch(error => console.error(error));



        e.target.reset();
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                </div>
                <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" name="confirm" placeholder="Confirm Password" className="input input-bordered" required />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="agree" id="agree" />
                            <label htmlFor="agree">I agree to the terms and conditions.</label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p>{error && <span className="text-red-600">{error}</span>}</p>
                        <p>Already have an account? Please <Link to='/login'><span className="btn-link">Login</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;