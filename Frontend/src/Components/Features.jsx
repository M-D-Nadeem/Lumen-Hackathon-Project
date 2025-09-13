const features = [
  { title: "Easy Setup", icon: "⚙️" },
  { title: "Secure Payments", icon: "🔒" },
  { title: "Analytics Dashboard", icon: "📊" },
  { title: "24/7 Support", icon: "📞" }
];

const Features = () => {
  return (
    <section className="features-container">
      <h2 className="features-title">Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
