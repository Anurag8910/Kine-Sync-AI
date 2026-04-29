import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import BackgroundImage from '../assets/img1.jpg';
import { useUser } from './UserContext';

// ── Design tokens ────────────────────────────────────────────
const C = {
    bgBase:      '#080B12',
    bgCard:      '#0E1420',
    bgInput:     '#111827',
    accent:      '#3B82F6',
    accentHover: '#2563EB',
    accentDim:   'rgba(59,130,246,0.12)',
    accentGlow:  'rgba(59,130,246,0.3)',
    textHi:      '#F1F5F9',
    textMid:     '#94A3B8',
    textLo:      '#475569',
    border:      'rgba(255,255,255,0.08)',
    error:       '#F87171',
    fontDisplay: "'Barlow Condensed', sans-serif",
    fontBody:    "'Barlow', sans-serif",
};

// ── Input field with focus state ─────────────────────────────
const Field = ({ icon: Icon, ...props }) => {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ position: 'relative', marginBottom: '12px' }}>
            
            <Icon style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)',
                color: focused ? C.accent : C.textLo,
                fontSize: '15px', pointerEvents: 'none',
                transition: 'color 0.2s',
            }} />
            <input
                {...props}
                onFocus={e => { setFocused(true); props.onFocus?.(e); }}
                onBlur={e => { setFocused(false); props.onBlur?.(e); }}
                style={{
                    width: '100%',
                    padding: '13px 14px 13px 42px',
                    border: `1px solid ${focused ? 'rgba(59,130,246,0.5)' : C.border}`,
                    borderRadius: '9px',
                    fontSize: '14px',
                    fontFamily: C.fontBody,
                    background: C.bgInput,
                    color: C.textHi,
                    outline: 'none',
                    boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.12)' : 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
            />
        </div>
    );
};

// ── Social button ─────────────────────────────────────────────
const SocialBtn = ({ Icon, label }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : C.border}`,
                borderRadius: '9px',
                fontSize: '14px',
                fontFamily: C.fontBody,
                fontWeight: 500,
                cursor: 'pointer',
                background: hovered ? 'rgba(255,255,255,0.05)' : C.bgInput,
                color: hovered ? C.textHi : C.textMid,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '10px',
                transition: 'all 0.15s',
            }}
        >
            <Icon style={{ fontSize: '15px' }} />
            {label}
        </button>
    );
};

// ── Main component ───────────────────────────────────────────
const AuthPage = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const { login, signup, loading, error, clearError } = useUser();

    const [isLogin, setIsLogin]   = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage]   = useState('');
    const [btnHover, setBtnHover] = useState(false);

    const switchMode = (toLogin) => {
        setIsLogin(toLogin);
        setMessage('');
        clearError();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        clearError();

        if (!email || !password || (!isLogin && !username)) {
            setMessage('Please fill in all fields.');
            return;
        }

        let result;
        if (isLogin) {
            result = await login(email, password);
        } else {
            result = await signup(username, email, password);
        }

        if (result.success) {
            localStorage.removeItem('profileSetupFinished');
            if (onLoginSuccess) onLoginSuccess();
            navigate('/setup-profile');
        } else {
            setMessage(result.message || (isLogin ? 'Login failed' : 'Signup failed'));
        }
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: C.bgBase,
            fontFamily: C.fontBody,
            color: C.textHi,
            WebkitFontSmoothing: 'antialiased',
        }}>
            <audio autoPlay loop ref={(audio) => audio && (audio.volume = 0.8)}>
                <source src="/Arnold.mp3" type="audio/mpeg" />
            </audio>
            
            {/* ── Left panel ────────────────────────────── */}
            <div style={{
                flex: 3,
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                position: 'relative',
                overflow: 'hidden',
            }}>
               
                {/* Gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(to bottom, rgba(8,11,18,0.15) 0%, rgba(8,11,18,0.8) 100%)',
                }} />
                {/* Right edge accent line */}
                <div style={{
                    position: 'absolute', top: 0, right: 0, zIndex: 2,
                    width: '1px', height: '100%',
                    background: `linear-gradient(to bottom, transparent, ${C.accent}, transparent)`,
                    opacity: 0.4,
                }} />

                {/* Text content */}
                <div style={{ position: 'relative', zIndex: 3, padding: '52px', maxWidth: '520px' }}>

                    {/* Brand pill */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        fontFamily: C.fontBody, fontSize: '11px', fontWeight: 600,
                        letterSpacing: '0.18em', textTransform: 'uppercase',
                        color: C.accent, background: C.accentDim,
                        border: '1px solid rgba(59,130,246,0.25)',
                        padding: '5px 14px', borderRadius: '100px', marginBottom: '24px',
                    }}>♧ AI-Powered Fitness</div>

                    <h1 style={{
                        fontFamily: C.fontDisplay,
                        fontSize: 'clamp(40px, 4.5vw, 60px)',
                        fontWeight: 900, lineHeight: 1.0,
                        letterSpacing: '-0.01em', textTransform: 'uppercase',
                        color: C.textHi, marginBottom: '14px',
                    }}>
                        Kine<span style={{ color: C.accent }}>-Sync</span> AI
                    </h1>

                    <p style={{
                        fontFamily: C.fontBody, fontSize: '17px',
                        color: C.textMid, lineHeight: 1.5, marginBottom: '36px',
                    }}>
                        Precision in Every Rep.
                    </p>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '32px' }}>
                        {[
                            { num: '33+',      label: 'Body Points'   },
                            { num: 'Real-Time', label: 'Form Feedback' },
                            { num: 'Free',      label: 'To Start'      },
                        ].map(({ num, label }) => (
                            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{
                                    fontFamily: C.fontDisplay, fontSize: '22px',
                                    fontWeight: 800, color: C.textHi, letterSpacing: '-0.01em',
                                }}>{num}</span>
                                <span style={{
                                    fontFamily: C.fontBody, fontSize: '11px',
                                    color: C.textLo, letterSpacing: '0.08em', textTransform: 'uppercase',
                                }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Right form panel ──────────────────────── */}
            <div style={{
                flex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 24px',
                background: C.bgBase,
                position: 'relative',
            }}>
                {/* Back to Home Button */}
                <button
                    onClick={() => navigate('/')}
                    style={{
                        position: 'absolute',
                        top: 24,
                        left: 24,
                        background: 'transparent',
                        border: `1px solid ${C.accent}`,
                        color: C.accent,
                        borderRadius: '8px',
                        padding: '7px 16px',
                        fontFamily: C.fontDisplay,
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                        zIndex: 10,
                        transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.accentDim}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    ← 
                </button>
                {/* Background grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: `
                        linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
                }} />

                {/* Card */}
                <div style={{
                    background: C.bgCard,
                    border: `1px solid ${C.border}`,
                    borderTop: `1px solid ${C.accent}`,
                    padding: '40px 36px',
                    borderRadius: '16px',
                    boxShadow: `0 0 0 1px rgba(59,130,246,0.06), 0 24px 64px rgba(0,0,0,0.5)`,
                    width: '100%',
                    maxWidth: '420px',
                    position: 'relative',
                }}>

                    {/* Tab switcher */}
                    <div style={{
                        display: 'flex',
                        background: C.bgInput,
                        border: `1px solid ${C.border}`,
                        borderRadius: '10px',
                        padding: '4px',
                        marginBottom: '28px',
                        gap: '4px',
                    }}>
                        {[{ label: 'Sign Up', val: false }, { label: 'Log In', val: true }].map(({ label, val }) => {
                            const active = isLogin === val;
                            return (
                                <button key={label} type="button" onClick={() => switchMode(val)} style={{
                                    flex: 1, padding: '9px 0', border: 'none',
                                    borderRadius: '7px',
                                    fontFamily: C.fontDisplay, fontSize: '13px', fontWeight: 700,
                                    letterSpacing: '0.08em', textTransform: 'uppercase',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    background: active ? C.accent : 'transparent',
                                    color: active ? '#fff' : C.textLo,
                                    boxShadow: active ? `0 0 16px ${C.accentGlow}` : 'none',
                                }}>{label}</button>
                            );
                        })}
                    </div>

                    <h2 style={{
                        fontFamily: C.fontDisplay, fontSize: '26px', fontWeight: 800,
                        letterSpacing: '-0.01em', textTransform: 'uppercase',
                        color: C.textHi, marginBottom: '6px',
                    }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{
                        fontFamily: C.fontBody, color: C.textLo,
                        fontSize: '14px', lineHeight: 1.5, marginBottom: '24px',
                    }}>
                        {isLogin
                            ? 'Continue your AI-powered fitness journey.'
                            : 'Start training smarter with real-time AI feedback.'}
                    </p>

                    {/* Error message */}
                    {(message || error) && (
                        <div style={{
                            background: 'rgba(248,113,113,0.1)',
                            border: '1px solid rgba(248,113,113,0.25)',
                            borderRadius: '8px', color: C.error,
                            padding: '10px 14px', fontSize: '13px',
                            fontFamily: C.fontBody, marginBottom: '16px',
                        }}>
                            ⚠ {message || error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <Field icon={FiUser} type="text" name="username" placeholder="Username"
                                value={username} onChange={e => setUsername(e.target.value)} required={!isLogin} />
                        )}
                        <Field icon={FiMail} type="email" name="email" placeholder="Email address"
                            value={email} onChange={e => setEmail(e.target.value)} required />
                        <Field icon={FiLock} type="password" name="password" placeholder="Password"
                            value={password} onChange={e => setPassword(e.target.value)} required />

                        <button
                            type="submit"
                            disabled={loading}
                            onMouseEnter={() => setBtnHover(true)}
                            onMouseLeave={() => setBtnHover(false)}
                            style={{
                                width: '100%', marginTop: '8px',
                                padding: '14px 20px', border: 'none', borderRadius: '9px',
                                fontFamily: C.fontDisplay, fontSize: '15px', fontWeight: 700,
                                letterSpacing: '0.08em', textTransform: 'uppercase',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.5 : 1,
                                background: btnHover && !loading ? C.accentHover : C.accent,
                                color: '#fff',
                                boxShadow: btnHover && !loading
                                    ? '0 0 36px rgba(59,130,246,0.45)'
                                    : `0 0 24px ${C.accentGlow}`,
                                transform: btnHover && !loading ? 'translateY(-1px)' : 'none',
                                transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            }}
                        >
                            {loading ? 'Processing...' : isLogin
                                ? <><FiLogIn /> Log In</>
                                : 'Sign Up for Free →'
                            }
                        </button>
                    </form>

                    {/* OR divider */}
                    <div style={{
                        textAlign: 'center', color: C.textLo,
                        fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
                        margin: '20px 0', position: 'relative',
                    }}>
                        <span style={{
                            position: 'relative', zIndex: 1,
                            background: C.bgCard, padding: '0 12px',
                        }}>OR</span>
                        <div style={{
                            position: 'absolute', top: '50%', left: 0, right: 0,
                            height: '1px', background: C.border, zIndex: 0,
                        }} />
                    </div>

                    <SocialBtn Icon={FaGoogle}    label="Continue with Google"   />
                    <SocialBtn Icon={FaFacebookF} label="Continue with Facebook" />

                    {/* Toggle */}
                    <div style={{
                        textAlign: 'center', marginTop: '20px',
                        fontFamily: C.fontBody, fontSize: '13px', color: C.textLo,
                    }}>
                        {isLogin ? (
                            <p>Need an account?{' '}
                                <span onClick={() => switchMode(false)}
                                    style={{ color: C.accent, cursor: 'pointer', fontWeight: 600 }}>
                                    Sign Up
                                </span>
                            </p>
                        ) : (
                            <p>Already have an account?{' '}
                                <span onClick={() => switchMode(true)}
                                    style={{ color: C.accent, cursor: 'pointer', fontWeight: 600 }}>
                                    Log In
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;