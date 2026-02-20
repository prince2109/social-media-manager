import { useState, useEffect } from "react";
import { schedulePost, getSchedule } from "../api/api";

export default function Schedule() {
  const [formData, setFormData] = useState({
    content: "",
    platform: "twitter",
    scheduledTime: ""
  });
  const [scheduled, setScheduled] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchScheduled = async () => {
    try {
      const res = await getSchedule();
      setScheduled(res.data);
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
    }
  };

  useEffect(() => {
    fetchScheduled();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    setLoading(true);
    try {
      await schedulePost(formData);
      setFormData({ content: "", platform: "twitter", scheduledTime: "" });
      fetchScheduled();
      alert("Post scheduled!");
    } catch (error) {
      console.error("Failed to schedule post:", error);
      alert("Failed to schedule post");
    }
    setLoading(false);
  };

  return (
    <div className="schedule-page">
      <h2>Schedule Posts</h2>

      <div className="schedule-grid">
        <div className="card">
          <h3>✏️ Schedule New Post</h3>
          <form className="schedule-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your post content..."
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="platform">Platform</label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                >
                  <option value="twitter">🐦 Twitter</option>
                  <option value="facebook">📘 Facebook</option>
                  <option value="instagram">📸 Instagram</option>
                  <option value="linkedin">💼 LinkedIn</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="scheduledTime">Schedule Time</label>
                <input
                  type="datetime-local"
                  id="scheduledTime"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Scheduling..." : "📤 Schedule Post"}
            </button>
          </form>
        </div>

        <div className="card">
          <h3>📋 Scheduled Posts</h3>
          {scheduled.length === 0 ? (
            <p className="empty-state">No scheduled posts yet</p>
          ) : (
            <ul className="scheduled-list">
              {scheduled.map((post, index) => (
                <li key={index} className="scheduled-item">
                  <p>{post.content || post.text}</p>
                  <div className="scheduled-meta">
                    <span>{post.platform}</span>
                    {post.scheduledTime && (
                      <span>{new Date(post.scheduledTime).toLocaleString()}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}