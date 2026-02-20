import { useState } from "react";
import Header from "../components/Header";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026
  const [viewMode, setViewMode] = useState("month");
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const scheduledPosts = {
    3: [
      { platform: "twitter", content: "New product launch announcement", time: "10:00 AM" },
      { platform: "instagram", content: "Behind the scenes photo", time: "2:00 PM" }
    ],
    5: [{ platform: "linkedin", content: "Weekly industry insights", time: "9:00 AM" }],
    6: [
      { platform: "twitter", content: "Customer success story", time: "11:00 AM" },
      { platform: "facebook", content: "Community poll", time: "3:00 PM" },
      { platform: "linkedin", content: "Team spotlight", time: "4:00 PM" }
    ],
    10: [{ platform: "instagram", content: "Product showcase", time: "1:00 PM" }],
    12: [{ platform: "twitter", content: "Tips & tricks thread", time: "10:00 AM" }],
    14: [{ platform: "facebook", content: "Valentine's Day special", time: "9:00 AM" }],
    18: [{ platform: "linkedin", content: "Case study release", time: "11:00 AM" }],
    20: [
      { platform: "twitter", content: "AI dashboard announcement", time: "2:00 PM" },
      { platform: "instagram", content: "Product shoot BTS", time: "4:00 PM" }
    ],
    24: [{ platform: "twitter", content: "Feature update", time: "10:00 AM" }],
    27: [{ platform: "facebook", content: "Month recap", time: "5:00 PM" }],
  };

  const platformColors = {
    twitter: "#1DA1F2",
    instagram: "#E4405F",
    linkedin: "#0077B5",
    facebook: "#1877F2"
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;
    return { daysInMonth, startDay };
  };

  const { daysInMonth, startDay } = getDaysInMonth(currentDate);
  const today = 20; // Current day

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <div className="calendar-page">
      <Header title="Calendar" subtitle="Plan and manage your content schedule" />

      <div className="calendar-toolbar">
        <div className="calendar-nav">
          <button className="nav-btn" onClick={() => navigateMonth(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h2 className="calendar-title">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button className="nav-btn" onClick={() => navigateMonth(1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === "month" ? "active" : ""}`}
            onClick={() => setViewMode("month")}
          >
            Month
          </button>
          <button 
            className={`view-btn ${viewMode === "week" ? "active" : ""}`}
            onClick={() => setViewMode("week")}
          >
            Week
          </button>
          <button 
            className={`view-btn ${viewMode === "day" ? "active" : ""}`}
            onClick={() => setViewMode("day")}
          >
            Day
          </button>
        </div>
      </div>

      <div className="calendar-container">
        <div className="calendar-main">
          <div className="calendar-weekdays-header">
            {daysOfWeek.map(day => (
              <div key={day} className="weekday-header">{day}</div>
            ))}
          </div>

          <div className="calendar-grid-full">
            {/* Empty cells for days before the first of the month */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="calendar-cell empty"></div>
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const posts = scheduledPosts[day] || [];
              const isToday = day === today;
              const isSelected = day === selectedDay;

              return (
                <div 
                  key={day} 
                  className={`calendar-cell ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${posts.length > 0 ? "has-posts" : ""}`}
                  onClick={() => setSelectedDay(day)}
                >
                  <span className="cell-day">{day}</span>
                  {posts.length > 0 && (
                    <div className="cell-posts">
                      {posts.slice(0, 3).map((post, idx) => (
                        <div 
                          key={idx} 
                          className="cell-post"
                          style={{ borderLeftColor: platformColors[post.platform] }}
                        >
                          <span className="cell-post-time">{post.time}</span>
                          <span className="cell-post-content">{post.content}</span>
                        </div>
                      ))}
                      {posts.length > 3 && (
                        <span className="more-posts">+{posts.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="card">
            <h3>
              {selectedDay ? `February ${selectedDay}, 2026` : "Select a Day"}
            </h3>
            
            {selectedDay && scheduledPosts[selectedDay] ? (
              <div className="sidebar-posts">
                {scheduledPosts[selectedDay].map((post, idx) => (
                  <div key={idx} className="sidebar-post">
                    <div className="sidebar-post-header">
                      <span 
                        className="platform-badge"
                        style={{ backgroundColor: platformColors[post.platform] }}
                      >
                        {post.platform}
                      </span>
                      <span className="post-time">{post.time}</span>
                    </div>
                    <p className="post-content">{post.content}</p>
                    <div className="post-actions">
                      <button className="action-btn">Edit</button>
                      <button className="action-btn">Reschedule</button>
                      <button className="action-btn danger">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-posts">
                {selectedDay ? "No posts scheduled for this day" : "Click on a day to view scheduled posts"}
              </p>
            )}

            <button className="btn btn-primary full-width">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Schedule New Post
            </button>
          </div>

          <div className="card">
            <h3>Platform Legend</h3>
            <div className="platform-legend">
              {Object.entries(platformColors).map(([platform, color]) => (
                <div key={platform} className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: color }} />
                  <span className="legend-label">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
