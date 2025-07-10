import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ImageSlider from '../components/ImageSlider';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: 'USER',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = isLogin
        ? 'http://localhost:8089/api/v1/login'
        : 'http://localhost:8089/api/v1/save';

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Full login response:", response.data);

      setFormData({ userName: '', email: '', password: '', role: 'USER' });

      if (isLogin) {
        const { id, role, email } = response.data;

      
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userId', id);

        console.log('User ID from login:', id);
        console.log('Saved userId to sessionStorage:', sessionStorage.getItem('userId'));

        // setMessage(`Welcome, ${userName}!`);
        setMessageType('success');

        navigate(role === 'ADMIN' ? '/admin/dashboard' : '/');
        setTimeout(() => window.location.reload(), 100);
      } else {
        setMessage('Registration successful!');
        setMessageType('success');
      }
    } catch (error) {
      setMessage(isLogin ? 'Login failed.' : 'Registration failed.');
      setMessageType('error');
      console.error(error);
    }
  };

  const switchMode = (mode) => {
    setIsLogin(mode === 'login');
    setFormData({ userName: '', email: '', password: '', role: 'USER' });
    setMessage('');
    setMessageType('');
  };


return (
  <div className="login-page">
    <div className="left-panel">
      <ImageSlider />
    </div>

    <div className="right-panel">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        {!isLogin && (
          <>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Select Role</label>
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group password-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-eye" onClick={togglePassword}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        </div>

        <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>

        {message && <p className={`response-message ${messageType}`}>{message}</p>}

        <div className="footer-text">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <span className="fake-link" onClick={() => switchMode('register')}>
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className="fake-link" onClick={() => switchMode('login')}>
                Sign in
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  </div>
);
}


