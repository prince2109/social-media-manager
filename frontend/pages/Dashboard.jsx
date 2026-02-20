import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import ComposePost from "../components/ComposePost";
import ContentCalendar from "../components/ContentCalendar";
import RecentPosts from "../components/RecentPosts";
import AIInsights from "../components/AIInsights";

export default function Dashboard() {
  const handlePostCreated = () => {
    window.location.reload();
  };

  return (
    <div className="dashboard-page">
      <Header 
        title="Dashboard" 
        subtitle="Welcome back — here's your social media overview"
      />

      <StatsCards />

      <div className="dashboard-content">
        <div className="dashboard-main">
          <ComposePost onPostCreated={handlePostCreated} />
          <RecentPosts />
        </div>

        <div className="dashboard-sidebar">
          <ContentCalendar />
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
