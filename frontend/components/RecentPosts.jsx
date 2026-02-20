import { useState, useEffect } from "react";
import { getPosts } from "../api/api";

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample posts data for demo
  const samplePosts = [
    {
      id: 1,
      platform: "twitter",
      status: "published",
      content: "Excited to share our latest AI-powered analytics dashboard! 🚀 Check out how we're helping brands grow their social presence.",
      likes: 234,
      comments: 45,
      shares: 89,
      time: "2 hours ago"
    },
    {
      id: 2,
      platform: "instagram",
      status: "scheduled",
      content: "Behind the scenes of our new product shoot. Can't wait to share the full collection with you all! 📸 ✨",
      likes: 0,
      comments: 0,
      shares: 0,
      time: "Tomorrow, 2 PM"
    },
    {
      id: 3,
      platform: "linkedin",
      status: "draft",
      content: "We're hiring! Looking for talented social media strategists to join our growing team. If you're passionate about...",
      likes: 0,
      comments: 0,
      shares: 0,
      time: "Draft"
    }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        setPosts(res.data.length > 0 ? res.data : samplePosts);
      } catch (error) {
        setPosts(samplePosts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const platformConfig = {
    twitter: { label: "Twitter / X", color: "#1DA1F2" },
    instagram: { label: "Instagram", color: "#E4405F" },
    linkedin: { label: "LinkedIn", color: "#0077B5" },
    facebook: { label: "Facebook", color: "#1877F2" }
  };

  const statusConfig = {
    published: { label: "published", className: "status-published" },
    scheduled: { label: "scheduled", className: "status-scheduled" },
    draft: { label: "draft", className: "status-draft" }
  };

  const displayPosts = posts.length > 0 ? posts : samplePosts;

  return (
    <div className="recent-posts">
      <h3>Recent Posts</h3>
      
      {loading ? (
        <div className="loading-skeleton">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-post">
              <div className="skeleton-header"></div>
              <div className="skeleton-content"></div>
              <div className="skeleton-footer"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="posts-list">
          {displayPosts.map((post) => {
            const platform = platformConfig[post.platform] || platformConfig.twitter;
            const status = statusConfig[post.status] || statusConfig.draft;
            
            return (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-platform">
                    <span 
                      className="platform-indicator" 
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="platform-name">{platform.label}</span>
                    <span className={`post-status ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <button className="post-menu">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="2"/>
                      <circle cx="12" cy="12" r="2"/>
                      <circle cx="12" cy="19" r="2"/>
                    </svg>
                  </button>
                </div>
                
                <p className="post-content">{post.content}</p>
                
                <div className="post-footer">
                  <div className="post-stats">
                    <span className="stat">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      {post.likes}
                    </span>
                    <span className="stat">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                      {post.comments}
                    </span>
                    <span className="stat">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                      </svg>
                      {post.shares}
                    </span>
                  </div>
                  <span className="post-time">{post.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
