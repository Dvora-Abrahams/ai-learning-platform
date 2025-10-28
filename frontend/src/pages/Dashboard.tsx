import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { promptsAPI } from '../services/api';

interface Stats {
  totalLessons: number;
  uniqueTopics: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalLessons: 0,
    uniqueTopics: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await promptsAPI.getUserPrompts();
      const prompts = response.data;
      
      const uniqueCategories = new Set<string>();
      prompts.forEach(prompt => {
        if (prompt.category_id?.name) {
          uniqueCategories.add(prompt.category_id.name);
        }
      });

      setStats({
        totalLessons: prompts.length,
        uniqueTopics: uniqueCategories.size
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div className="card">
        <h1>Welcome, {user?.name}! 👋</h1>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          What would you like to learn today?
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
            <h3>Start Learning</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Choose a topic and ask AI a question
            </p>
            <Link to="/learn" className="btn btn-primary">
              Start Now
            </Link>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
            <h3>Learning History</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              View all the lessons you've received so far
            </p>
            <Link to="/history" className="btn btn-secondary">
              View History
            </Link>
          </div>

          {user?.role === 'admin' && (
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚙️</div>
              <h3>System Management</h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                View users and system activity
              </p>
              <Link to="/admin" className="btn btn-outline">
                Admin Panel
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Quick Statistics</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>
              {stats.totalLessons}
            </div>
            <div style={{ color: '#6b7280' }}>Lessons Learned</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
              {stats.uniqueTopics}
            </div>
            <div style={{ color: '#6b7280' }}>Topics Studied</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>
              {user?.role === 'admin' ? 'Admin' : 'User'}
            </div>
            <div style={{ color: '#6b7280' }}>Status</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;