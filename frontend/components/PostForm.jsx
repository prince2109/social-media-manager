import { useState } from "react";
import { createPost, predictEngagement, rewriteCaption, scoreContent } from "../api/api";

export default function PostForm({ onPostCreated }) {
  const [formData, setFormData] = useState({
    content: "",
    platform: "twitter",
    contentType: "text"
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [contentScore, setContentScore] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
    
    // Clear predictions when content changes significantly
    if (e.target.name === "content") {
      setPrediction(null);
      setContentScore(null);
      setSuggestions(null);
    }
  };

  const handlePredictEngagement = async () => {
    if (!formData.content.trim()) return;
    setAiLoading(true);
    try {
      const [predRes, scoreRes] = await Promise.all([
        predictEngagement({
          content: formData.content,
          platform: formData.platform,
          content_type: formData.contentType
        }),
        scoreContent({
          content: formData.content,
          platform: formData.platform
        })
      ]);
      setPrediction(predRes.data);
      setContentScore(scoreRes.data);
    } catch (error) {
      console.error("Prediction failed:", error);
    }
    setAiLoading(false);
  };

  const handleGetSuggestions = async () => {
    if (!formData.content.trim()) return;
    setAiLoading(true);
    try {
      const res = await rewriteCaption(formData.content, "engaging", formData.platform);
      setSuggestions(res.data);
    } catch (error) {
      console.error("Suggestions failed:", error);
    }
    setAiLoading(false);
  };

  const handleUseSuggestion = (text) => {
    setFormData({ ...formData, content: text });
    setSuggestions(null);
    setPrediction(null);
    setContentScore(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    setLoading(true);
    try {
      await createPost(formData);
      setFormData({ content: "", platform: "twitter", contentType: "text" });
      setPrediction(null);
      setContentScore(null);
      setSuggestions(null);
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post");
    }
    setLoading(false);
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>Create New Post</h3>
      
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="What's on your mind?"
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
          <label htmlFor="contentType">Content Type</label>
          <select
            id="contentType"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
          >
            <option value="text">📝 Text</option>
            <option value="image">🖼️ Image</option>
            <option value="video">🎬 Video</option>
          </select>
        </div>
      </div>

      {/* AI Features Row */}
      <div className="ai-actions">
        <button 
          type="button" 
          className="ai-btn"
          onClick={handlePredictEngagement}
          disabled={aiLoading || !formData.content.trim()}
        >
          {aiLoading ? "..." : "🔮 Predict Engagement"}
        </button>
        <button 
          type="button" 
          className="ai-btn"
          onClick={handleGetSuggestions}
          disabled={aiLoading || !formData.content.trim()}
        >
          {aiLoading ? "..." : "✨ AI Suggestions"}
        </button>
      </div>

      {/* Engagement Prediction */}
      {prediction && (
        <div className="prediction-card">
          <h4>📊 Engagement Prediction</h4>
          <div className="prediction-grid">
            <div className="prediction-stat">
              <span className="value">{prediction.engagement_score}</span>
              <span className="label">Score</span>
            </div>
            <div className="prediction-stat">
              <span className="value">{prediction.predicted_likes}</span>
              <span className="label">Likes</span>
            </div>
            <div className="prediction-stat">
              <span className="value">{prediction.predicted_comments}</span>
              <span className="label">Comments</span>
            </div>
            <div className="prediction-stat">
              <span className="value">{prediction.predicted_reach}</span>
              <span className="label">Reach</span>
            </div>
          </div>
          <div className="prediction-extra">
            <span>🎯 Viral Probability: {(prediction.viral_probability * 100).toFixed(0)}%</span>
            <span>⏰ Best Time: {prediction.best_time_to_post}</span>
          </div>
          {prediction.recommendations?.length > 0 && (
            <div className="recommendations">
              <strong>Tips:</strong>
              <ul>
                {prediction.recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Content Score */}
      {contentScore && (
        <div className="score-card">
          <h4>📝 Content Score: <span className="grade">{contentScore.grade}</span></h4>
          <div className="score-breakdown">
            {Object.entries(contentScore.breakdown).map(([key, value]) => (
              <div key={key} className="score-item">
                <span className="score-label">{key.replace("_", " ")}</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${value}%` }} />
                </div>
                <span className="score-value">{value.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      {suggestions && (
        <div className="suggestions-card">
          <h4>✨ AI-Enhanced Versions</h4>
          <div className="suggestions-list">
            {suggestions.variations.map((v, i) => (
              <div key={i} className="suggestion-item">
                <p>{v.text}</p>
                <div className="suggestion-meta">
                  <span className="engagement">📊 {v.predicted_engagement}%</span>
                  <button 
                    type="button"
                    className="use-btn"
                    onClick={() => handleUseSuggestion(v.text)}
                  >
                    Use This
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Posting..." : "🚀 Create Post"}
      </button>
    </form>
  );
}

