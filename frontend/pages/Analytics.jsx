import { useState } from "react";
import Header from "../components/Header";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const platformColors = {
    twitter: "#1DA1F2",
    instagram: "#E4405F",
    linkedin: "#0077B5",
    facebook: "#1877F2"
  };

  const overviewStats = [
    { label: "Total Reach", value: "1.2M", change: "+15.3%", positive: true },
    { label: "Engagement Rate", value: "5.8%", change: "+0.6%", positive: true },
    { label: "New Followers", value: "3,847", change: "+12.1%", positive: true },
    { label: "Link Clicks", value: "8,234", change: "-2.3%", positive: false },
  ];

  const platformStats = [
    { platform: "twitter", followers: "12.5K", engagement: "4.2%", posts: 45, reach: "450K" },
    { platform: "instagram", followers: "8.3K", engagement: "6.8%", posts: 32, reach: "380K" },
    { platform: "linkedin", followers: "2.8K", engagement: "3.5%", posts: 28, reach: "120K" },
    { platform: "facebook", followers: "5.1K", engagement: "2.9%", posts: 38, reach: "250K" },
  ];

  const topPosts = [
    {
      platform: "twitter",
      content: "Excited to share our latest AI-powered analytics dashboard! 🚀",
      engagement: 368,
      reach: "45.2K",
      date: "Feb 18, 2026"
    },
    {
      platform: "instagram",
      content: "Behind the scenes of our new product shoot 📸",
      engagement: 892,
      reach: "62.1K",
      date: "Feb 15, 2026"
    },
    {
      platform: "linkedin",
      content: "5 strategies that increased our engagement by 200%",
      engagement: 234,
      reach: "28.4K",
      date: "Feb 12, 2026"
    }
  ];

  const audienceInsights = {
    demographics: [
      { label: "18-24", value: 22 },
      { label: "25-34", value: 38 },
      { label: "35-44", value: 25 },
      { label: "45-54", value: 10 },
      { label: "55+", value: 5 },
    ],
    locations: [
      { label: "United States", value: 45 },
      { label: "United Kingdom", value: 15 },
      { label: "Canada", value: 12 },
      { label: "Australia", value: 8 },
      { label: "Other", value: 20 },
    ],
    peakHours: ["9 AM", "12 PM", "2 PM", "6 PM", "8 PM"]
  };

  return (
    <div className="analytics-page">
      <Header title="Analytics" subtitle="Track your social media performance" />

      <div className="analytics-toolbar">
        <div className="filter-group">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="filter-select"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>

          <select 
            value={selectedPlatform} 
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Platforms</option>
            <option value="twitter">Twitter / X</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>

        <button className="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export Report
        </button>
      </div>

      <div className="analytics-overview">
        {overviewStats.map((stat, idx) => (
          <div key={idx} className="overview-card">
            <span className="overview-label">{stat.label}</span>
            <span className="overview-value">{stat.value}</span>
            <span className={`overview-change ${stat.positive ? "positive" : "negative"}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="card chart-card">
          <h3>Engagement Over Time</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              {[65, 78, 52, 89, 95, 72, 88, 92, 68, 85, 91, 78].map((h, i) => (
                <div key={i} className="chart-bar" style={{ height: `${h}%` }}>
                  <span className="bar-value">{h}%</span>
                </div>
              ))}
            </div>
            <div className="chart-labels">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Platform Performance</h3>
          <div className="platform-table">
            <div className="table-header">
              <span>Platform</span>
              <span>Followers</span>
              <span>Engagement</span>
              <span>Reach</span>
            </div>
            {platformStats.map((stat) => (
              <div key={stat.platform} className="table-row">
                <span className="platform-cell">
                  <span className="platform-dot" style={{ backgroundColor: platformColors[stat.platform] }} />
                  {stat.platform}
                </span>
                <span>{stat.followers}</span>
                <span>{stat.engagement}</span>
                <span>{stat.reach}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Top Performing Posts</h3>
          <div className="top-posts-list">
            {topPosts.map((post, idx) => (
              <div key={idx} className="top-post">
                <div className="top-post-header">
                  <span 
                    className="platform-badge"
                    style={{ backgroundColor: platformColors[post.platform] }}
                  >
                    {post.platform}
                  </span>
                  <span className="post-date">{post.date}</span>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-metrics">
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    {post.engagement} engagements
                  </span>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    {post.reach} reach
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Audience Demographics</h3>
          <div className="demographics-section">
            <h4>Age Distribution</h4>
            <div className="demographic-bars">
              {audienceInsights.demographics.map((item) => (
                <div key={item.label} className="demo-bar-item">
                  <span className="demo-label">{item.label}</span>
                  <div className="demo-bar-container">
                    <div 
                      className="demo-bar-fill"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className="demo-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="demographics-section">
            <h4>Top Locations</h4>
            <div className="location-list">
              {audienceInsights.locations.map((item) => (
                <div key={item.label} className="location-item">
                  <span className="location-name">{item.label}</span>
                  <span className="location-value">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="demographics-section">
            <h4>Peak Activity Hours</h4>
            <div className="peak-hours">
              {audienceInsights.peakHours.map((hour) => (
                <span key={hour} className="peak-hour">{hour}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
