import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaGoogle, FaTwitter, FaGithub, FaInstagram, FaPinterest, FaDribbble } from 'react-icons/fa';
import './LoginPage.css'; // Import custom CSS file

const LoginPage: React.FC = () => {
  return (
    <div className="container-fluid p-0 min-vh-100 d-flex flex-column">

      

      {/* Login Form */}
      <div className="mt-5 mb-5 d-flex justify-content-center login-cont">
        <div className="row">
          <div>
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <h5 className="card-title mb-4 text-center">Log in</h5>
                  <img className='login-img' src={require('./../../Images/bg.jpg')}/>
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="text-center mt-3">
                  <a href="#" className="text-primary">Forgot your password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
