import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage1.css'; 
import { FiUser, FiMail, FiLock, FiLogIn } from 'react-icons/fi'; 
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import BackgroundImage from '../assets/img1.jpg'; 
// 👇 IMPORT THE CONTEXT HOOK
import { useUser } from './UserContext'; 

const AuthPage = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    // 👇 GET THE CONTEXT FUNCTION
    const { updateUserData } = useUser(); 

    const [isLogin, setIsLogin] = useState(false); 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        if (!email || !password || (!isLogin && !username)) {
            setMessage('Please fill in all fields.');
            return;
        }

        setTimeout(() => {
            // ✅ STORE AUTH DATA IN CONTEXT
            if (!isLogin) { 
                updateUserData('auth', { name: username, email: email });
            } else {
                updateUserData('auth', { email: email });
            }
            
            // Mock token handling (keep for front-end authentication flow)
            localStorage.setItem('token', 'mock_token'); 
            if (onLoginSuccess) onLoginSuccess('mock_token');
            
            navigate('/setup-profile'); 
        }, 500);
    };

    // ... (rest of the component logic and social login handlers remain the same) ...

    return (
        <div className="auth-page-split-container">
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

            <div className="auth-form-right">
                <div className="form-card">
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
                                    name="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        {/* Email and Password fields remain the same */}
                        <div className="input-group">
                            <FiMail className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <FiLock className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="main-auth-button">
                            {isLogin ? <><FiLogIn /> Log In</> : 'Sign Up for Free'}
                        </button>
                    </form>

                    <div className="or-divider">OR</div>
                    
                    <button className="social-button google">
                        <FaGoogle className="social-icon" /> Continue with Google
                    </button>
                    
                    <button className="social-button facebook">
                        <FaFacebookF className="social-icon" /> Continue with Facebook
                    </button>

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