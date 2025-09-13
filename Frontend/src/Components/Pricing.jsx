const plans = [
  { name: "Basic", price: "$10/month", description: "Essential features to get you started." },
  { name: "Standard", price: "$20/month", description: "Ideal for growing needs." },
  { name: "Premium", price: "$30/month", description: "All advanced features included." }
];

const Pricing = () => {
  return (
    <section className="pricing-container">
      <h2 className="pricing-title">Pricing Plans</h2>
      <p className="pricing-subtitle">Choose a plan that fits your needs.</p>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`pricing-card ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <h3 className="pricing-name">{plan.name}</h3>
            <p className="pricing-price">{plan.price}</p>
            <p className="pricing-description">{plan.description}</p>
            <button className="btn-primary">Select Plan</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
