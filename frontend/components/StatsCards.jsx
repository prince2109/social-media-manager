export default function StatsCards({ stats }) {
  const defaultStats = [
    {
      icon: "users",
      value: "24.5K",
      label: "Total Followers",
      change: "+12.3%",
      positive: true,
      color: "#f97316"
    },
    {
      icon: "eye",
      value: "142K",
      label: "Post Impressions",
      change: "+8.7%",
      positive: true,
      color: "#f97316"
    },
    {
      icon: "trending",
      value: "5.2%",
      label: "Engagement Rate",
      change: "+0.8%",
      positive: true,
      color: "#f97316"
    },
    {
      icon: "click",
      value: "3,847",
      label: "Link Clicks",
      change: "-2.1%",
      positive: false,
      color: "#f97316"
    }
  ];

  const data = stats || defaultStats;

  const icons = {
    users: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    eye: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    trending: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    click: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    )
  };

  return (
    <div className="stats-cards">
      {data.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {icons[stat.icon]}
            </div>
            <div className={`stat-change ${stat.positive ? "positive" : "negative"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points={stat.positive ? "23 6 13.5 15.5 8.5 10.5 1 18" : "23 18 13.5 8.5 8.5 13.5 1 6"}/>
              </svg>
              {stat.change}
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
