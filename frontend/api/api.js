import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

// Posts API
export const getPosts = () => API.get("/posts/");
export const createPost = (post) => API.post("/posts/", post);

// Insights API
export const getInsights = () => API.get("/insights/");

// Schedule API
export const getSchedule = () => API.get("/schedule/");
export const schedulePost = (post) => API.post("/schedule/", post);

// AI Features API
export const predictEngagement = (data) => API.post("/ai/predict-engagement", data);
export const scoreContent = (data) => API.post("/ai/score-content", data);
export const getTrends = () => API.get("/ai/trends");
export const getAudienceSegments = () => API.get("/ai/audience-segments");
export const analyzeSentiment = (comments) => API.post("/ai/analyze-sentiment", { comments });
export const getSentimentDemo = () => API.get("/ai/sentiment-demo");
export const analyzeCompetitors = (handles) => API.post("/ai/competitors", { handles });
export const getCompetitorsDemo = () => API.get("/ai/competitors-demo");
export const rewriteCaption = (content, style, platform) => 
  API.post("/ai/rewrite-caption", { content, style, platform });
export const translateContent = (content, languages) => 
  API.post("/ai/translate", { content, languages });

export default API;