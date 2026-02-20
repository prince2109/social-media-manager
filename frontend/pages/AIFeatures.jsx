import { useState, useEffect } from "react";
import {
  getTrends,
  getAudienceSegments,
  getSentimentDemo,
  getCompetitorsDemo,
  rewriteCaption,
  translateContent
} from "../api/api";

export default function AIFeatures() {
  const [activeTab, setActiveTab] = useState("trends");
  const [trends, setTrends] = useState(null);
  const [segments, setSegments] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [competitors, setCompetitors] = useState(null);
  const [loading, setLoading] = useState(false);

  // Caption Rewriter State
  const [captionInput, setCaptionInput] = useState("");
  const [rewriteStyle, setRewriteStyle] = useState("engaging");
  const [rewriteResult, setRewriteResult] = useState(null);
  const [rewriteLoading, setRewriteLoading] = useState(false);

  // Translation State
  const [translateInput, setTranslateInput] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState(["spanish", "french"]);
  const [translations, setTranslations] = useState(null);
  const [translateLoading, setTranslateLoading] = useState(false);

  useEffect(() => {
    loadTabData(activeTab);
  }, [activeTab]);

  const loadTabData = async (tab) => {
    setLoading(true);
    try {
      switch (tab) {
        case "trends":
          if (!trends) {
            const res = await getTrends();
            setTrends(res.data);
          }
          break;
        case "audience":
          if (!segments) {
            const res = await getAudienceSegments();
            setSegments(res.data);
          }
          break;
        case "sentiment":
          if (!sentiment) {
            const res = await getSentimentDemo();
            setSentiment(res.data);
          }
          break;
        case "competitors":
          if (!competitors) {
            const res = await getCompetitorsDemo();
            setCompetitors(res.data);
          }
          break;
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    }
    setLoading(false);
  };

  const handleRewrite = async () => {
    if (!captionInput.trim()) return;
    setRewriteLoading(true);
    try {
      const res = await rewriteCaption(captionInput, rewriteStyle, "twitter");
      setRewriteResult(res.data);
    } catch (error) {
      console.error("Rewrite failed:", error);
    }
    setRewriteLoading(false);
  };

  const handleTranslate = async () => {
    if (!translateInput.trim()) return;
    setTranslateLoading(true);
    try {
      const res = await translateContent(translateInput, selectedLanguages);
      setTranslations(res.data);
    } catch (error) {
      console.error("Translation failed:", error);
    }
    setTranslateLoading(false);
  };

  const tabs = [
    { id: "trends", label: "📈 Trends", icon: "📈" },
    { id: "audience", label: "👥 Audience", icon: "👥" },
    { id: "sentiment", label: "💬 Sentiment", icon: "💬" },
    { id: "competitors", label: "🎯 Competitors", icon: "🎯" },
    { id: "rewrite", label: "✏️ Caption AI", icon: "✏️" },
    { id: "translate", label: "🌐 Multilingual", icon: "🌐" }
  ];

  return (
    <div className="ai-features-page">
      <h2>🤖 AI-Powered Features</h2>
      
      <div className="ai-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`ai-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="ai-content">
        {loading && <div className="loading">Loading AI insights...</div>}

        {/* Trends Tab */}
        {activeTab === "trends" && trends && (
          <div className="trends-section">
            <div className="ai-grid">
              <div className="card">
                <h3>🔥 Trending Hashtags</h3>
                <div className="hashtag-list">
                  {trends.hashtags.map((tag, i) => (
                    <div key={i} className="hashtag-item">
                      <span className="hashtag-name">{tag.tag}</span>
                      <div className="hashtag-meta">
                        <span className="volume">{(tag.volume / 1000).toFixed(0)}K posts</span>
                        <span className={`growth ${tag.growth.startsWith("+") ? "positive" : "negative"}`}>
                          {tag.growth}
                        </span>
                        <span className={`sentiment-badge ${tag.sentiment}`}>{tag.sentiment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3>📰 Trending Topics</h3>
                <div className="topics-list">
                  {trends.topics.map((topic, i) => (
                    <div key={i} className="topic-item">
                      <div className="topic-header">
                        <span className="topic-name">{topic.topic}</span>
                        <span className="relevance-badge">{topic.relevance}% relevant</span>
                      </div>
                      <span className="topic-category">{topic.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3>📢 Latest News</h3>
                <div className="news-list">
                  {trends.news.map((item, i) => (
                    <div key={i} className="news-item">
                      <span className="news-title">{item.title}</span>
                      <div className="news-meta">
                        <span className="source">{item.source}</span>
                        <span className={`impact impact-${item.impact}`}>{item.impact} impact</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3>💡 Content Ideas</h3>
                <ul className="ideas-list">
                  {trends.recommended_content_ideas.map((idea, i) => (
                    <li key={i}>{idea}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === "audience" && segments && (
          <div className="audience-section">
            <div className="audience-header">
              <div className="stat-highlight">
                <span className="big-number">{segments.total_audience.toLocaleString()}</span>
                <span className="stat-label">Total Audience</span>
              </div>
              <div className="stat-highlight">
                <span className="big-number">{(segments.segmentation_confidence * 100).toFixed(0)}%</span>
                <span className="stat-label">Confidence</span>
              </div>
            </div>
            
            <div className="segments-grid">
              {segments.segments.map((seg, i) => (
                <div key={i} className="card segment-card">
                  <div className="segment-header">
                    <h4>{seg.name}</h4>
                    <span className="segment-size">{seg.size}%</span>
                  </div>
                  <div className="segment-stats">
                    <span>Engagement: {seg.avg_engagement}%</span>
                    <span className={seg.growth_trend.startsWith("+") ? "positive" : "negative"}>
                      {seg.growth_trend}
                    </span>
                  </div>
                  <div className="segment-details">
                    <p><strong>Active:</strong> {seg.active_hours}</p>
                    <p><strong>Characteristics:</strong></p>
                    <ul>
                      {seg.characteristics.map((c, j) => <li key={j}>{c}</li>)}
                    </ul>
                    <p><strong>Best Content:</strong></p>
                    <div className="content-tags">
                      {seg.best_content.map((c, j) => (
                        <span key={j} className="content-tag">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card recommendations-card">
              <h3>📋 Recommendations</h3>
              <ul>
                {segments.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Sentiment Tab */}
        {activeTab === "sentiment" && sentiment && (
          <div className="sentiment-section">
            <div className="sentiment-overview">
              <div className="card sentiment-summary">
                <h3>Overall Sentiment</h3>
                <div className={`sentiment-indicator ${sentiment.overall_sentiment}`}>
                  {sentiment.overall_sentiment === "positive" && "😊"}
                  {sentiment.overall_sentiment === "negative" && "😔"}
                  {sentiment.overall_sentiment === "neutral" && "😐"}
                  <span>{sentiment.overall_sentiment}</span>
                </div>
                <div className="sentiment-score">
                  Score: {(sentiment.sentiment_score * 100).toFixed(0)}/100
                </div>
              </div>

              <div className="card">
                <h3>Distribution</h3>
                <div className="sentiment-bars">
                  <div className="sentiment-bar">
                    <span>Positive</span>
                    <div className="bar-container">
                      <div 
                        className="bar positive" 
                        style={{ width: `${sentiment.distribution.positive}%` }}
                      />
                    </div>
                    <span>{sentiment.distribution.positive}%</span>
                  </div>
                  <div className="sentiment-bar">
                    <span>Neutral</span>
                    <div className="bar-container">
                      <div 
                        className="bar neutral" 
                        style={{ width: `${sentiment.distribution.neutral}%` }}
                      />
                    </div>
                    <span>{sentiment.distribution.neutral}%</span>
                  </div>
                  <div className="sentiment-bar">
                    <span>Negative</span>
                    <div className="bar-container">
                      <div 
                        className="bar negative" 
                        style={{ width: `${sentiment.distribution.negative}%` }}
                      />
                    </div>
                    <span>{sentiment.distribution.negative}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>Analyzed Comments</h3>
              <div className="comments-list">
                {sentiment.analyzed_comments.map((comment, i) => (
                  <div key={i} className={`comment-item ${comment.sentiment}`}>
                    <p>"{comment.text}"</p>
                    <div className="comment-meta">
                      <span className={`sentiment-tag ${comment.sentiment}`}>
                        {comment.sentiment}
                      </span>
                      <span className="confidence">
                        {(comment.confidence * 100).toFixed(0)}% confident
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ai-grid">
              <div className="card">
                <h3>Key Themes</h3>
                <div className="themes-list">
                  {sentiment.key_themes.map((theme, i) => (
                    <span key={i} className="theme-tag">{theme}</span>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3>Action Items</h3>
                <ul>
                  {sentiment.action_items.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Competitors Tab */}
        {activeTab === "competitors" && competitors && (
          <div className="competitors-section">
            <div className="card your-position">
              <h3>Your Competitive Position</h3>
              <div className="position-stats">
                <div className="stat">
                  <span className="stat-value">#{competitors.your_position.rank}</span>
                  <span className="stat-label">Market Rank</span>
                </div>
                <div className="stat">
                  <span className="stat-value positive">{competitors.your_position.compared_to_avg}</span>
                  <span className="stat-label">vs Average</span>
                </div>
              </div>
            </div>

            <div className="competitors-grid">
              {competitors.competitors.map((comp, i) => (
                <div key={i} className="card competitor-card">
                  <div className="competitor-header">
                    <h4>{comp.name}</h4>
                    <span className="handle">{comp.handle}</span>
                  </div>
                  <div className="competitor-stats">
                    <div className="stat">
                      <span className="value">{(comp.followers / 1000).toFixed(0)}K</span>
                      <span className="label">Followers</span>
                    </div>
                    <div className="stat">
                      <span className="value">{comp.engagement_rate}%</span>
                      <span className="label">Engagement</span>
                    </div>
                    <div className="stat">
                      <span className="value positive">{comp.growth_rate}</span>
                      <span className="label">Growth</span>
                    </div>
                  </div>
                  <div className="competitor-details">
                    <p><strong>Posts:</strong> {comp.posting_frequency}</p>
                    <p><strong>Top Content:</strong> {comp.top_content_types.join(", ")}</p>
                    <div className="strengths-weaknesses">
                      <div className="strengths">
                        <strong>Strengths:</strong>
                        <ul>
                          {comp.strengths.map((s, j) => <li key={j}>{s}</li>)}
                        </ul>
                      </div>
                      <div className="weaknesses">
                        <strong>Weaknesses:</strong>
                        <ul>
                          {comp.weaknesses.map((w, j) => <li key={j}>{w}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ai-grid">
              <div className="card">
                <h3>Content Gaps</h3>
                <ul>
                  {competitors.content_gaps.map((gap, i) => (
                    <li key={i}>{gap}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3>Recommended Strategies</h3>
                <ul>
                  {competitors.recommended_strategies.map((strategy, i) => (
                    <li key={i}>{strategy}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Caption Rewriter Tab */}
        {activeTab === "rewrite" && (
          <div className="rewrite-section">
            <div className="card">
              <h3>✨ AI Caption Rewriter</h3>
              <p className="description">Transform your captions for maximum engagement</p>
              
              <div className="form-group">
                <label>Original Caption</label>
                <textarea
                  value={captionInput}
                  onChange={(e) => setCaptionInput(e.target.value)}
                  placeholder="Enter your caption to rewrite..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Style</label>
                <select value={rewriteStyle} onChange={(e) => setRewriteStyle(e.target.value)}>
                  <option value="engaging">🎯 Engaging</option>
                  <option value="professional">💼 Professional</option>
                  <option value="casual">😊 Casual</option>
                  <option value="viral">🔥 Viral</option>
                </select>
              </div>

              <button onClick={handleRewrite} disabled={rewriteLoading || !captionInput.trim()}>
                {rewriteLoading ? "Rewriting..." : "✨ Rewrite Caption"}
              </button>
            </div>

            {rewriteResult && (
              <div className="card rewrite-results">
                <h3>🎉 Rewritten Variations</h3>
                <div className="variations-list">
                  {rewriteResult.variations.map((v, i) => (
                    <div key={i} className={`variation-item ${i === 0 ? "recommended" : ""}`}>
                      {i === 0 && <span className="recommended-badge">⭐ Recommended</span>}
                      <p className="variation-text">{v.text}</p>
                      <div className="variation-meta">
                        <span className="style-tag">{v.style}</span>
                        <span className="engagement-score">
                          📊 {v.predicted_engagement}% engagement
                        </span>
                      </div>
                      <button 
                        className="copy-btn"
                        onClick={() => navigator.clipboard.writeText(v.text)}
                      >
                        📋 Copy
                      </button>
                    </div>
                  ))}
                </div>
                <div className="improvements">
                  <h4>Improvements Made:</h4>
                  <ul>
                    {rewriteResult.improvements.map((imp, i) => (
                      <li key={i}>✅ {imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Multilingual Tab */}
        {activeTab === "translate" && (
          <div className="translate-section">
            <div className="card">
              <h3>🌐 Multilingual Content Generator</h3>
              <p className="description">Expand your reach with localized content</p>
              
              <div className="form-group">
                <label>Content to Translate</label>
                <textarea
                  value={translateInput}
                  onChange={(e) => setTranslateInput(e.target.value)}
                  placeholder="Enter content to translate..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Target Languages</label>
                <div className="language-checkboxes">
                  {["spanish", "french", "german", "portuguese", "japanese"].map((lang) => (
                    <label key={lang} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedLanguages.includes(lang)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLanguages([...selectedLanguages, lang]);
                          } else {
                            setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                          }
                        }}
                      />
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={handleTranslate} disabled={translateLoading || !translateInput.trim()}>
                {translateLoading ? "Translating..." : "🌐 Generate Translations"}
              </button>
            </div>

            {translations && (
              <div className="card translations-results">
                <h3>📝 Translations</h3>
                <div className="translations-grid">
                  {Object.entries(translations.translations).map(([lang, data]) => (
                    <div key={lang} className="translation-item">
                      <div className="translation-header">
                        <h4>{lang.charAt(0).toUpperCase() + lang.slice(1)}</h4>
                        <button 
                          className="copy-btn small"
                          onClick={() => navigator.clipboard.writeText(data.text)}
                        >
                          📋
                        </button>
                      </div>
                      <p className="translated-text">{data.text}</p>
                      <div className="localized-hashtags">
                        {data.localized_hashtags.map((tag, i) => (
                          <span key={i} className="hashtag">{tag}</span>
                        ))}
                      </div>
                      <p className="cultural-note">💡 {data.cultural_notes}</p>
                    </div>
                  ))}
                </div>
                
                <div className="localization-tips">
                  <h4>🎯 Localization Tips</h4>
                  <ul>
                    {translations.localization_tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
