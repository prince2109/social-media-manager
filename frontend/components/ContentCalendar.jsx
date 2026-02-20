import { useState } from "react";

export default function ContentCalendar() {
  const [currentDate] = useState(new Date(2026, 1, 20)); // February 2026
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Sample scheduled posts data
  const scheduledPosts = {
    3: [{ platform: "twitter", count: 2 }],
    5: [{ platform: "instagram", count: 1 }],
    6: [{ platform: "twitter", count: 1 }, { platform: "linkedin", count: 2 }],
    10: [{ platform: "facebook", count: 1 }],
    12: [{ platform: "linkedin", count: 2 }],
    14: [{ platform: "instagram", count: 1 }],
    18: [{ platform: "twitter", count: 1 }, { platform: "facebook", count: 1 }],
    20: [{ platform: "instagram", count: 1 }],
    24: [{ platform: "twitter", count: 3 }],
    27: [{ platform: "facebook", count: 1 }],
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
    
    // Get the day of week (0 = Sunday, convert to Monday = 0)
    let startDay = firstDay.getDay() - 1;
    if (startDay < 0) startDay = 6;
    
    return { daysInMonth, startDay };
  };

  const { daysInMonth, startDay } = getDaysInMonth(currentDate);
  const today = currentDate.getDate();

  const renderDays = () => {
    const days = [];
    
    // Empty cells for days before the first of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const posts = scheduledPosts[day] || [];
      const isToday = day === today;
      
      days.push(
        <div key={day} className={`calendar-day ${isToday ? "today" : ""}`}>
          <span className="day-number">{day}</span>
          {posts.length > 0 && (
            <div className="day-posts">
              {posts.map((post, idx) => (
                <span
                  key={idx}
                  className="post-dot"
                  style={{ backgroundColor: platformColors[post.platform] }}
                  title={`${post.count} ${post.platform} post(s)`}
                >
                  {post.count > 1 && <span className="post-count">{post.count}</span>}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="content-calendar">
      <div className="calendar-header">
        <h3>Content Calendar</h3>
        <div className="calendar-month">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {daysOfWeek.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {renderDays()}
        </div>
      </div>
    </div>
  );
}
