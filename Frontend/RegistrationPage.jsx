import React, { useState } from 'react';

const App = () => {
  const [page, setPage] = useState('register');

  const renderPage = () => {
    switch (page) {
      case 'register':
        return <RegistrationPage setPage={setPage} />;
      case 'login':
        return <LoginPage setPage={setPage} />;
      default:
        return <RegistrationPage setPage={setPage} />;
    }
  };

  return renderPage();
};

const RegistrationPage = ({ setPage }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setStatus({ message: 'Passwords do not match.', type: 'error' });
      return;
    }
    if (!validatePassword(password)) {
      setStatus({ message: 'Password must be 8+ characters with uppercase, lowercase, number & special char.', type: 'error' });
      return;
    }
    if (!agreedToTerms) {
      setStatus({ message: 'You must agree to the terms.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setStatus({ message: '', type: '' });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
      });
      const data = await response.json();
      if (response.ok) setStatus({ message: data.message, type: 'success' });
      else setStatus({ message: data.message || 'Registration failed.', type: 'error' });
    } catch (error) {
      console.error('Registration error:', error);
      setStatus({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Your Account</h1>

        {status.message && (
          <div style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', textAlign: 'center', color: status.type === 'success' ? 'green' : 'red', border: `1px solid ${status.type === 'success' ? 'green' : 'red'}` }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
          </div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} required />
            <span>I agree to the Terms & Conditions</span>
          </div>

          <button type="submit" disabled={isLoading} style={{ padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Already have an account?{' '}
          <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => setPage('login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

const LoginPage = ({ setPage }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login Page</h1>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>This is a placeholder for the login page.</p>
        <button onClick={() => setPage('register')} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
          Go to Registration
        </button>
      </div>
    </div>
  );
};

export default App;
