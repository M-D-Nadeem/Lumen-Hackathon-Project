import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <Link to="/about" className="footer-link">About Us</Link>
        <Link to="/careers" className="footer-link">Careers</Link>
        <Link to="/contact" className="footer-link">Contact</Link>
        <Link to="/faq" className="footer-link">FAQ</Link>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
      </div>
      <div className="footer-text">© 2025 SubsManager. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
