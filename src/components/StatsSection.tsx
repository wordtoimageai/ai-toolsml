const stats = [
  { number: "1000+", label: "AI Tools Listed" },
  { number: "50K+", label: "Monthly Users" },
  { number: "25+", label: "Categories" },
  { number: "99%", label: "User Satisfaction" }
];

const StatsSection = () => {
  return (
    <section className="stats-gradient py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-xl text-white/90 mb-16 max-w-2xl mx-auto">
            Join thousands of professionals who discover and use the best AI tools through our platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;