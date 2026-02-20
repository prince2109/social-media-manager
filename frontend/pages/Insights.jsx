import { useEffect, useState } from "react";
import { getInsights } from "../api/api";

export default function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInsights()
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="insights-page">
      <h2>Audience Insights</h2>

      {loading ? (
        <div className="loading">Analyzing your data</div>
      ) : data ? (
        <div className="insights-grid">
          <div className="card insight-card">
            <h3>🕐 Best Posting Hour</h3>
            <span className="insight-value">{data.best_posting_hour}:00</span>
            <p className="insight-description">
              Posts at this hour get the highest engagement
            </p>
          </div>
          
          <div className="card insight-card">
            <h3>🎯 Best Content Type</h3>
            <span className="insight-value">{data.best_content_type}</span>
            <p className="insight-description">
              This content type performs best with your audience
            </p>
          </div>

          {data.total_posts && (
            <div className="card insight-card">
              <h3>📊 Total Posts Analyzed</h3>
              <span className="insight-value">{data.total_posts}</span>
            </div>
          )}

          {data.avg_engagement && (
            <div className="card insight-card">
              <h3>💬 Average Engagement</h3>
              <span className="insight-value">{data.avg_engagement}</span>
            </div>
          )}
        </div>
      ) : (
        <p className="empty-state">No insights available yet</p>
      )}
    </div>
  );
}