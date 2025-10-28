import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎓 AI Learning Platform
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#6b7280', 
          maxWidth: '600px', 
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Advanced learning platform powered by artificial intelligence. 
          Learn any topic you want with personalized lessons
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '32px',
        marginBottom: '60px'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🤖</div>
          <h3>Advanced AI</h3>
          <p style={{ color: '#6b7280' }}>
            Get detailed and personalized answers to any question
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📚</div>
          <h3>Diverse Topics</h3>
          <p style={{ color: '#6b7280' }}>
            Learn science, technology, history and many other subjects
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📈</div>
          <h3>Progress Tracking</h3>
          <p style={{ color: '#6b7280' }}>
            Track your progress and view your learning history
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        {isAuthenticated ? (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Welcome back!</h2>
            <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: '18px' }}>
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Ready to start?</h2>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Link to="/register" className="btn btn-primary" style={{ fontSize: '18px' }}>
                Register Now
              </Link>
              <Link to="/login" className="btn btn-outline" style={{ fontSize: '18px' }}>
                Login
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '60px', textAlign: 'center' }}>
        <h3>How it works?</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px',
          marginTop: '32px'
        }}>
          <div>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#dbeafe', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px'
            }}>
              1️⃣
            </div>
            <h4>Choose Topic</h4>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Select a category and subcategory from the list
            </p>
          </div>
          
          <div>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#dcfce7', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px'
            }}>
              2️⃣
            </div>
            <h4>Ask Question</h4>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Write your question or topic you want to learn
            </p>
          </div>
          
          <div>
            <div style={{ 
              width: '60px', 
              height: '60px', 
              backgroundColor: '#fef3c7', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '24px'
            }}>
              3️⃣
            </div>
            <h4>Get Lesson</h4>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Receive a detailed and customized lesson from AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;