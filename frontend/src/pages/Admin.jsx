import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPrompts, setUserPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      console.log('Admin: Loading users from API...');
      const response = await adminAPI.getAllUsers();
      console.log('Admin: Users loaded:', response.data);
      setUsers(response.data);
    } catch (err) {
      console.error('Admin: Error loading users:', err);
      setError('Error loading users: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const loadUserPrompts = async (userId) => {
    try {
      console.log('Admin: Loading prompts for user:', userId);
      const response = await adminAPI.getUserPrompts(userId);
      console.log('Admin: User prompts loaded:', response.data);
      setUserPrompts(response.data);
      setSelectedUser(users.find(u => u._id === userId));
    } catch (err) {
      console.error('Admin: Error loading user prompts:', err);
      setError('Error loading user activity: ' + (err.response?.data?.message || err.message));
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
        <h2>⚙️ Admin Panel</h2>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          User management and system activity monitoring
        </p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>
              {users.length}
            </div>
            <div style={{ color: '#6b7280' }}>Total Users</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div style={{ color: '#6b7280' }}>Admins</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>
              {users.filter(u => u.role === 'user').length}
            </div>
            <div style={{ color: '#6b7280' }}>Regular Users</div>
          </div>
        </div>

        <h3>User List</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginTop: '16px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  Name
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  Phone
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  Role
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  Join Date
                </th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #e2e8f0' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>{user.name}</td>
                  <td style={{ padding: '12px' }}>{user.phone}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      backgroundColor: user.role === 'admin' ? '#fef3c7' : '#dbeafe',
                      color: user.role === 'admin' ? '#92400e' : '#1e40af'
                    }}>
                      {user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {formatDate(user.createdAt)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => loadUserPrompts(user._id)}
                      className="btn btn-outline"
                      style={{ fontSize: '14px', padding: '6px 12px' }}
                    >
                      View Activity
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="card">
          <h3>Activity for {selectedUser.name}</h3>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Total questions: {userPrompts.length}
          </p>

          {userPrompts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
              User hasn't asked any questions yet
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userPrompts.map((prompt) => (
                <div key={prompt._id} style={{ 
                  padding: '16px', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    marginBottom: '8px',
                    fontSize: '12px'
                  }}>
                    <span style={{ 
                      backgroundColor: '#dbeafe', 
                      color: '#1e40af',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {prompt.category_id?.name}
                    </span>
                    <span style={{ 
                      backgroundColor: '#dcfce7', 
                      color: '#166534',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {prompt.sub_category_id?.name}
                    </span>
                    <span style={{ color: '#6b7280', marginLeft: 'auto' }}>
                      {formatDate(prompt.createdAt)}
                    </span>
                  </div>
                  <p style={{ fontWeight: '500', marginBottom: '8px' }}>
                    {prompt.prompt}
                  </p>
                  <details>
                    <summary style={{ cursor: 'pointer', color: '#3b82f6' }}>
                      Show Answer
                    </summary>
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '12px', 
                      backgroundColor: '#f8fafc',
                      borderRadius: '6px',
                      whiteSpace: 'pre-wrap',
                      fontSize: '14px'
                    }}>
                      {prompt.response}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;