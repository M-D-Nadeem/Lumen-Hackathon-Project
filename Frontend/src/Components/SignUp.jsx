import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    agree: false,
    subscribe: false,
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
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // handle registration logic here
    alert(`Registered ${form.firstName} ${form.lastName} as ${form.role}`);
    navigate('/login');
  };

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6', padding: '2rem' },
    card: { backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' },
    heading: { textAlign: 'center', fontSize: '1.5rem', marginBottom: '1rem', color: '#111827' },
    input: { width: '100%', padding: '0.5rem', margin: '0.25rem 0', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '1rem' },
    select: { width: '100%', padding: '0.5rem', margin: '0.25rem 0', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '1rem' },
    checkboxContainer: { display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.9rem', margin: '0.5rem 0' },
    button: { padding: '0.75rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' },
    footerText: { textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' },
    orDivider: { textAlign: 'center', margin: '1rem 0' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>✨ CREATE YOUR ACCOUNT</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input style={styles.input} type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <input style={styles.input} type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <input style={styles.input} type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input style={styles.input} type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input style={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
          <select style={styles.select} name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div style={styles.checkboxContainer}>
            <label>
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} /> I agree to Terms & Conditions
            </label>
            <label>
              <input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} /> Subscribe to newsletter
            </label>
          </div>
          <button type="submit" style={styles.button}>CREATE ACCOUNT</button>
        </form>
        <div style={styles.orDivider}>──────── OR ────────</div>
        <div style={styles.footerText}>
          Already have an account? <a href="/login" style={{ color: '#2563EB' }}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
