import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Ensure this imports the updated CSS file
import './AuthPage1.css'; 
// Import icons (you'll need to install react-icons: npm install react-icons)
import { FiUser, FiMail, FiLock, FiLogIn } from 'react-icons/fi'; 
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
// ✅ Your image import is correctly set up here
import BackgroundImage from '../assets/img1.jpg'; 


const AuthPage = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    // Start with isLogin as false to show the 'Create Your Account' screen first
    const [isLogin, setIsLogin] = useState(false); 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [message, setMessage] = useState('');

    // MOCK: Simulate login/signup success without backend
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        // Basic form validation for presentation purposes
        if (!email || !password || (!isLogin && !username)) {
            setMessage('Please fill in all fields.');
            return;
        }

        // Simulate a delay to mimic API response
        setTimeout(() => {
            // Always "succeed"
            localStorage.setItem('token', 'mock_token');
            if (onLoginSuccess) onLoginSuccess('mock_token');
            navigate('/setup-profile');
        }, 500);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Continuing with ${provider}...`);
        // Add actual social login logic here
    };

    return (
        // The main container now needs to accommodate the split screen layout
        <div className="auth-page-split-container">
            {/* Left Content Section */}
            {/* 💡 CHANGE: Use the imported BackgroundImage variable in an inline style */}
            <audio autoPlay loop ref={(audio) => audio && (audio.volume = 0.8)}>
            <source src="/Arnold.mp3" type="audio/mpeg" />
             </audio>
            <div 
                className="auth-content-left"
                style={{ backgroundImage: `url(${BackgroundImage})` }}
            >
                <div className="content-overlay">
                    <h1>Kine-Sync AI</h1>
                    <p className="tagline">Precision in Every Rep.</p>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="auth-form-right">
                <div className="form-card">
                    {/* Title changes based on isLogin state */}
                    <h2>{isLogin ? 'Log In to Your Account' : 'Create Your Account'}</h2>
                    <p className="subtitle">
                        {isLogin 
                            ? 'Welcome back to your AI-powered fitness journey!'
                            : 'Start your AI-powered fitness journey today'}
                    </p>
                    {message && <p className="error-message">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        {/* Username Field (Only for Sign Up) */}
                        {!isLogin && (
                            <div className="input-group">
                                <FiUser className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="input-group">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="input-group">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        {/* Submit Button */}
                        <button type="submit" className="main-auth-button">
                            {isLogin ? <><FiLogIn /> Log In</> : 'Sign Up for Free'}
                        </button>
                    </form>

                    <div className="or-divider">OR</div>
                    
                    {/* Social Login Buttons */}
                    <button 
                        className="social-button google" 
                        onClick={() => handleSocialLogin('Google')}
                    >
                        <FaGoogle className="social-icon" /> Continue with Google
                    </button>
                    
                    <button 
                        className="social-button facebook" 
                        onClick={() => handleSocialLogin('Facebook')}
                    >
                        <FaFacebookF className="social-icon" /> Continue with Facebook
                    </button>

                    {/* Toggle Link */}
                    <div className="account-toggle-area">
                        {isLogin ? (
                            <p>
                                Need an account? <span onClick={() => setIsLogin(false)} className="toggle-link">Sign Up</span>
                            </p>
                        ) : (
                            <p>
                                Already have an account? <span onClick={() => setIsLogin(true)} className="toggle-link">Log In</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;