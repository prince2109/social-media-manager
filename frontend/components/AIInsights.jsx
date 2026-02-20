export default function AIInsights() {
  const insights = [
    {
      icon: "clock",
      title: "Optimal posting time",
      description: "Your audience is most active at 2 PM EST on Tuesdays",
      color: "#f97316"
    },
    {
      icon: "trending",
      title: "Trending hashtag",
      description: "#AIMarketing is trending — consider using it today",
      color: "#f97316"
    },
    {
      icon: "alert",
      title: "Content gap detected",
      description: "You haven't posted on LinkedIn in 5 days",
      color: "#f97316"
    }
  ];

  const icons = {
    clock: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    trending: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    alert: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    )
  };

  return (
    <div className="ai-insights">
      <div className="ai-insights-header">
        <div className="ai-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
            <path d="M16 14a4 4 0 0 1 4 4v4H4v-4a4 4 0 0 1 4-4h8z"/>
          </svg>
        </div>
        <div>
          <h3>AI Insights</h3>
          <span className="ai-subtitle">Agent suggestions</span>
        </div>
      </div>

      <div className="insights-list">
        {insights.map((insight, index) => (
          <div key={index} className="insight-item">
            <div className="insight-icon" style={{ color: insight.color }}>
              {icons[insight.icon]}
            </div>
            <div className="insight-content">
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
