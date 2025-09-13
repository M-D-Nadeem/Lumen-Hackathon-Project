import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user', // default role
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.role === 'admin') {
      navigate('/admin');  // Redirect to AdminDashboard
    } else {
      navigate('/plans');  // Redirect to user page
    }
    alert(`Logged in as ${form.role}\nEmail: ${form.email}`);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '90vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f3f4f6',
      padding: '2rem',
    },
    card: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      width: '350px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    heading: {
      textAlign: 'center',
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#111827',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      margin: '0.25rem 0',
      borderRadius: '4px',
      border: '1px solid #cbd5e1',
      fontSize: '1rem',
    },
    select: {
      width: '100%',
      padding: '0.5rem',
      margin: '0.25rem 0',
      borderRadius: '4px',
      border: '1px solid #cbd5e1',
      fontSize: '1rem',
    },
    checkboxContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0.5rem 0',
      fontSize: '0.9rem',
    },
    button: {
      padding: '0.75rem',
      backgroundColor: '#2563EB',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '0.5rem',
      transition: 'background-color 0.3s',
    },
    footerText: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.9rem',
      color: '#6b7280',
    },
    backLink: {
      alignSelf: 'flex-start',
      textDecoration: 'none',
      color: '#2563EB',
      marginBottom: '1rem',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <a href="/" style={styles.backLink}>← Back to Home</a>
      <div style={styles.card}>
        <h2 style={styles.heading}>🔐 LOGIN TO YOUR ACCOUNT</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select
            style={styles.select}
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div style={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              /> Remember me
            </label>
            <a href="/forgot" style={{ color: '#2563EB' }}>Forgot Password?</a>
          </div>
          <button type="submit" style={styles.button}>LOGIN</button>
        </form>
        <div style={{ textAlign: 'center', margin: '1rem 0' }}>──────── OR ────────</div>
        <div style={styles.footerText}>
          Don't have an account? <a href="/signup" style={{ color: '#2563EB' }}>Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
