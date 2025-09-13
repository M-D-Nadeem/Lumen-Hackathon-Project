const testimonials = [
  { name: "John D.", text: "⭐⭐⭐⭐⭐ Great service! Managing subscriptions has never been easier." },
  { name: "Emily R.", text: "⭐⭐⭐⭐⭐ Excellent support and smooth interface." },
  { name: "Alex P.", text: "⭐⭐⭐⭐⭐ Affordable plans and powerful features!" }
];

const Testimonials = () => {
  return (
    <section className="testimonials-container">
      <h2 className="testimonials-title">What Our Users Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((test, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-text">{test.text}</p>
            <p className="testimonial-name">- {test.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
