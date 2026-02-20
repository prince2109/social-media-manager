import { useState } from "react";
import Header from "../components/Header";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profile, setProfile] = useState({
    brandName: "Your Brand",
    email: "contact@yourbrand.com",
    timezone: "America/New_York",
    language: "en"
  });

  const [notifications, setNotifications] = useState({
    postReminders: true,
    weeklyReports: true,
    engagementAlerts: true,
    trendAlerts: false,
    emailDigest: true
  });

  const [connectedAccounts, setConnectedAccounts] = useState([
    { platform: "twitter", handle: "@yourbrand", connected: true },
    { platform: "instagram", handle: "@yourbrand", connected: true },
    { platform: "linkedin", handle: "Your Brand", connected: true },
    { platform: "facebook", handle: "Your Brand Page", connected: false },
  ]);

  const platformColors = {
    twitter: "#1DA1F2",
    instagram: "#E4405F",
    linkedin: "#0077B5",
    facebook: "#1877F2"
  };

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "accounts", label: "Connected Accounts" },
    { id: "notifications", label: "Notifications" },
    { id: "billing", label: "Billing" },
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="settings-page">
      <Header title="Settings" subtitle="Manage your account and preferences" />

      <div className="settings-layout">
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-section">
              <div className="card">
                <h3>Profile Information</h3>
                
                <div className="profile-avatar-section">
                  <div className="large-avatar">
                    <span>YB</span>
                  </div>
                  <button className="btn btn-secondary">Change Avatar</button>
                </div>

                <div className="form-group">
                  <label>Brand Name</label>
                  <input
                    type="text"
                    value={profile.brandName}
                    onChange={(e) => setProfile({ ...profile, brandName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Timezone</label>
                    <select
                      value={profile.timezone}
                      onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Language</label>
                    <select
                      value={profile.language}
                      onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === "accounts" && (
            <div className="settings-section">
              <div className="card">
                <h3>Connected Social Accounts</h3>
                <p className="section-description">
                  Connect your social media accounts to post and manage content.
                </p>

                <div className="accounts-list">
                  {connectedAccounts.map((account) => (
                    <div key={account.platform} className="account-item">
                      <div className="account-info">
                        <span 
                          className="account-icon"
                          style={{ backgroundColor: platformColors[account.platform] }}
                        >
                          {account.platform.charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <span className="account-platform">{account.platform}</span>
                          <span className="account-handle">{account.handle}</span>
                        </div>
                      </div>
                      <button 
                        className={`btn ${account.connected ? "btn-danger" : "btn-primary"}`}
                      >
                        {account.connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>

                <button className="btn btn-secondary full-width">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add Another Account
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="settings-section">
              <div className="card">
                <h3>Notification Preferences</h3>
                <p className="section-description">
                  Choose how you want to be notified about your social media activity.
                </p>

                <div className="notification-list">
                  <div className="notification-item">
                    <div>
                      <span className="notification-title">Post Reminders</span>
                      <span className="notification-desc">Get reminded about scheduled posts</span>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.postReminders}
                        onChange={() => handleNotificationChange("postReminders")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div>
                      <span className="notification-title">Weekly Reports</span>
                      <span className="notification-desc">Receive weekly performance summaries</span>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.weeklyReports}
                        onChange={() => handleNotificationChange("weeklyReports")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div>
                      <span className="notification-title">Engagement Alerts</span>
                      <span className="notification-desc">Get notified about high engagement</span>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.engagementAlerts}
                        onChange={() => handleNotificationChange("engagementAlerts")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div>
                      <span className="notification-title">Trend Alerts</span>
                      <span className="notification-desc">Be notified of trending topics in your niche</span>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.trendAlerts}
                        onChange={() => handleNotificationChange("trendAlerts")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-item">
                    <div>
                      <span className="notification-title">Email Digest</span>
                      <span className="notification-desc">Receive daily email summaries</span>
                    </div>
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={notifications.emailDigest}
                        onChange={() => handleNotificationChange("emailDigest")}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary">Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="settings-section">
              <div className="card">
                <h3>Current Plan</h3>
                <div className="current-plan">
                  <div className="plan-info">
                    <span className="plan-name">Pro Plan</span>
                    <span className="plan-price">$29/month</span>
                  </div>
                  <span className="plan-badge">Active</span>
                </div>
                
                <div className="plan-features">
                  <h4>Plan Features</h4>
                  <ul>
                    <li>Unlimited scheduled posts</li>
                    <li>All social platforms</li>
                    <li>AI-powered insights</li>
                    <li>Advanced analytics</li>
                    <li>Priority support</li>
                  </ul>
                </div>

                <div className="plan-actions">
                  <button className="btn btn-secondary">Change Plan</button>
                  <button className="btn btn-danger">Cancel Subscription</button>
                </div>
              </div>

              <div className="card">
                <h3>Payment Method</h3>
                <div className="payment-method">
                  <div className="card-info">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    <div>
                      <span className="card-number">•••• •••• •••• 4242</span>
                      <span className="card-expiry">Expires 12/27</span>
                    </div>
                  </div>
                  <button className="btn btn-secondary">Update</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
