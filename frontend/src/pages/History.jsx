import { useState, useEffect } from 'react';
import { promptsAPI } from '../services/api';

const History = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedPrompt, setExpandedPrompt] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      console.log('Loading user prompts...');
      const response = await promptsAPI.getUserPrompts();
      console.log('User prompts loaded:', response.data);
      setPrompts(response.data);
    } catch (err) {
      console.error('Error loading history:', err);
      setError('Error loading history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleExpanded = (promptId) => {
    setExpandedPrompt(expandedPrompt === promptId ? null : promptId);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div className="card">
        <h2>📚 Your Learning History</h2>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          All your lessons and questions in one place
        </p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {prompts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📖</div>
            <h3>You haven't learned anything yet</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Start learning to see your history here
            </p>
            <a href="/learn" className="btn btn-primary">
              Start Learning
            </a>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {prompts.map((promptItem) => (
              <div key={promptItem._id} className="card" style={{ margin: 0 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div>
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      <span style={{ 
                        backgroundColor: '#dbeafe', 
                        color: '#1e40af',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}>
                        {promptItem.category_id?.name}
                      </span>
                      <span style={{ 
                        backgroundColor: '#dcfce7', 
                        color: '#166534',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}>
                        {promptItem.sub_category_id?.name}
                      </span>
                    </div>
                    <h4 style={{ marginBottom: '8px' }}>
                      {promptItem.prompt.length > 100 
                        ? `${promptItem.prompt.substring(0, 100)}...`
                        : promptItem.prompt
                      }
                    </h4>
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {formatDate(promptItem.createdAt)}
                  </div>
                </div>

                <button
                  onClick={() => toggleExpanded(promptItem._id)}
                  className="btn btn-outline"
                  style={{ marginBottom: '16px' }}
                >
                  {expandedPrompt === promptItem._id ? 'Hide Answer' : 'Show Answer'}
                </button>

                {expandedPrompt === promptItem._id && (
                  <div style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.8',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {promptItem.response}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;