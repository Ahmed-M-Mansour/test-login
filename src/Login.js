import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Perform validation
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // If there are validation errors, set the error messages and return
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: email, // Send email as user_name
          password: password // Send password as password
        })
      });

      // Check if the request was successful
      if (response.ok) {
        // Perform any necessary actions upon successful login
        console.log('Login successful');
      } else {
        // Handle any errors or display appropriate messages
        console.log('Login failed');
      }
    } catch (error) {
      // Handle any network or other errors
      console.log('Error:', error.message);
    }

    // Reset the form
    setEmail('');
    setPassword('');
    setErrors({ email: '', password: '' });

  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'Email is required';
    } else if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return 'Password is required';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
