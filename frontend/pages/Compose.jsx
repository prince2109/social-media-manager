import { useState } from "react";
import Header from "../components/Header";
import { createPost } from "../api/api";

export default function Compose() {
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["twitter"]);
  const [contentType, setContentType] = useState("text");
  const [scheduledTime, setScheduledTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const platforms = [
    { id: "twitter", label: "Twitter / X", color: "#1DA1F2", maxLength: 280 },
    { id: "instagram", label: "Instagram", color: "#E4405F", maxLength: 2200 },
    { id: "linkedin", label: "LinkedIn", color: "#0077B5", maxLength: 3000 },
    { id: "facebook", label: "Facebook", color: "#1877F2", maxLength: 63206 },
  ];

  const contentTypes = [
    { id: "text", label: "Text Post", icon: "file-text" },
    { id: "image", label: "Image Post", icon: "image" },
    { id: "video", label: "Video Post", icon: "video" },
    { id: "carousel", label: "Carousel", icon: "layers" },
  ];

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(p => p !== platformId);
      }
      return [...prev, platformId];
    });
  };

  const getMaxLength = () => {
    if (selectedPlatforms.length === 0) return 280;
    return Math.min(...selectedPlatforms.map(p => 
      platforms.find(pl => pl.id === p)?.maxLength || 280
    ));
  };

  const handleSubmit = async (isDraft = false) => {
    if (!content.trim() || selectedPlatforms.length === 0) return;

    setLoading(true);
    try {
      await createPost({
        content,
        platforms: selectedPlatforms,
        contentType,
        scheduledTime: scheduledTime || null,
        status: isDraft ? "draft" : scheduledTime ? "scheduled" : "published"
      });
      setContent("");
      setScheduledTime("");
      alert(isDraft ? "Draft saved!" : scheduledTime ? "Post scheduled!" : "Post published!");
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post");
    }
    setLoading(false);
  };

  const generateAISuggestions = () => {
    setAiSuggestions({
      engagement: 78,
      bestTime: "Tuesday, 2:00 PM EST",
      hashtags: ["#SocialMedia", "#Marketing", "#Growth", "#AI"],
      improvements: [
        "Add a call-to-action to increase engagement",
        "Consider adding relevant emojis",
        "Include a question to encourage comments"
      ]
    });
  };

  const maxLength = getMaxLength();

  return (
    <div className="compose-page">
      <Header title="Compose" subtitle="Create and schedule your social media content" />

      <div className="compose-layout">
        <div className="compose-editor">
          <div className="card">
            <h3>Select Platforms</h3>
            <div className="platform-selector">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  className={`platform-chip ${selectedPlatforms.includes(platform.id) ? "selected" : ""}`}
                  onClick={() => togglePlatform(platform.id)}
                  style={{ "--platform-color": platform.color }}
                >
                  <span className="platform-dot" style={{ backgroundColor: platform.color }} />
                  {platform.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Content Type</h3>
            <div className="content-type-selector">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  className={`type-btn ${contentType === type.id ? "selected" : ""}`}
                  onClick={() => setContentType(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Write Your Post</h3>
            <div className="editor-wrapper">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Write your post content here..."
                maxLength={maxLength}
                rows={8}
              />
              <div className="editor-footer">
                <div className="editor-actions">
                  <button className="icon-btn" title="Add Image">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="m21 15-5-5L5 21"/>
                    </svg>
                  </button>
                  <button className="icon-btn" title="Add Emoji">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </button>
                  <button className="icon-btn" title="Add Hashtags">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="4" y1="9" x2="20" y2="9"/>
                      <line x1="4" y1="15" x2="20" y2="15"/>
                      <line x1="10" y1="3" x2="8" y2="21"/>
                      <line x1="16" y1="3" x2="14" y2="21"/>
                    </svg>
                  </button>
                </div>
                <span className={`char-count ${content.length > maxLength * 0.9 ? "warning" : ""}`}>
                  {content.length}/{maxLength}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Schedule (Optional)</h3>
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="schedule-input"
            />
          </div>

          <div className="compose-actions">
            <button className="btn btn-secondary" onClick={() => handleSubmit(true)} disabled={loading}>
              Save as Draft
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => handleSubmit(false)} 
              disabled={loading || !content.trim() || selectedPlatforms.length === 0}
            >
              {loading ? "Publishing..." : scheduledTime ? "Schedule Post" : "Publish Now"}
            </button>
          </div>
        </div>

        <div className="compose-preview">
          <div className="card">
            <h3>AI Insights</h3>
            <button className="btn btn-ai" onClick={generateAISuggestions}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/>
                <path d="M8 14h8a4 4 0 0 1 4 4v4H4v-4a4 4 0 0 1 4-4z"/>
              </svg>
              Analyze Content
            </button>

            {aiSuggestions && (
              <div className="ai-analysis">
                <div className="engagement-score">
                  <div className="score-circle">
                    <span className="score-value">{aiSuggestions.engagement}</span>
                    <span className="score-label">Predicted Engagement</span>
                  </div>
                </div>

                <div className="suggestion-item">
                  <h4>Best Time to Post</h4>
                  <p>{aiSuggestions.bestTime}</p>
                </div>

                <div className="suggestion-item">
                  <h4>Suggested Hashtags</h4>
                  <div className="hashtag-list">
                    {aiSuggestions.hashtags.map((tag, i) => (
                      <span key={i} className="hashtag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="suggestion-item">
                  <h4>Improvements</h4>
                  <ul className="improvements-list">
                    {aiSuggestions.improvements.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <h3>Preview</h3>
            <div className="post-preview">
              {selectedPlatforms.length === 0 ? (
                <p className="preview-empty">Select a platform to see preview</p>
              ) : (
                <div className="preview-content">
                  <div className="preview-header">
                    <div className="preview-avatar">A</div>
                    <div>
                      <span className="preview-name">Your Brand</span>
                      <span className="preview-handle">@yourbrand</span>
                    </div>
                  </div>
                  <p className="preview-text">{content || "Your post content will appear here..."}</p>
                  <div className="preview-platforms">
                    {selectedPlatforms.map(p => {
                      const platform = platforms.find(pl => pl.id === p);
                      return (
                        <span key={p} className="preview-platform" style={{ backgroundColor: platform?.color }}>
                          {platform?.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
