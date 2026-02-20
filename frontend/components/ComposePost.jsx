import { useState } from "react";
import { createPost } from "../api/api";

export default function ComposePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["twitter"]);
  const [loading, setLoading] = useState(false);

  const platforms = [
    { id: "twitter", label: "Twitter / X", color: "#1DA1F2" },
    { id: "instagram", label: "Instagram", color: "#E4405F" },
    { id: "linkedin", label: "LinkedIn", color: "#0077B5" },
    { id: "facebook", label: "Facebook", color: "#1877F2" },
  ];

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(p => p !== platformId);
      }
      return [...prev, platformId];
    });
  };

  const handleSubmit = async () => {
    if (!content.trim() || selectedPlatforms.length === 0) return;

    setLoading(true);
    try {
      await createPost({
        content,
        platforms: selectedPlatforms,
        contentType: "text",
        status: "published"
      });
      setContent("");
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error("Failed to create post:", error);
    }
    setLoading(false);
  };

  const maxLength = 280;

  return (
    <div className="compose-post">
      <h3>Compose Post</h3>
      
      <div className="platform-tabs">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            className={`platform-tab ${selectedPlatforms.includes(platform.id) ? "selected" : ""}`}
            onClick={() => togglePlatform(platform.id)}
            style={{
              "--platform-color": platform.color,
              borderColor: selectedPlatforms.includes(platform.id) ? platform.color : "transparent"
            }}
          >
            <span 
              className="platform-dot" 
              style={{ backgroundColor: platform.color }}
            />
            {platform.label}
            {selectedPlatforms.includes(platform.id) && (
              <span className="remove-platform">×</span>
            )}
          </button>
        ))}
      </div>

      <div className="compose-textarea-wrapper">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Let AI help you craft the perfect post..."
          maxLength={maxLength}
        />
      </div>

      <div className="compose-footer">
        <div className="compose-actions">
          <button className="action-btn" title="Add Image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </button>
          <button className="action-btn" title="Add Emoji">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </button>
          <button className="action-btn" title="Schedule">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </button>
          <span className="char-count">{content.length}/{maxLength}</span>
        </div>

        <button 
          className="post-btn"
          onClick={handleSubmit}
          disabled={loading || !content.trim() || selectedPlatforms.length === 0}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          {loading ? "Posting..." : "Post Now"}
        </button>
      </div>
    </div>
  );
}
