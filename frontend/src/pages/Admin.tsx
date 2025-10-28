import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { adminAPI } from '../services/api';
import type { User, Prompt, PaginationInfo } from '../types';

interface Filters {
  search: string;
  role: string;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination and filtering
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState<Filters>({
    search: '',
    role: ''
  });

  useEffect(() => {
    loadUsers();
  }, [pagination.page, filters]);

  const loadUsers = async () => {
    try {
      console.log('Admin: Loading users from API...');
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        role: filters.role
      };
      
      const response = await adminAPI.getAllUsers(params);
      console.log('Admin: Users loaded:', response.data);
      
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (err: any) {
      console.error('Admin: Error loading users:', err);
      setError('Error loading users: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const loadUserPrompts = async (userId: string) => {
    try {
      console.log('Admin: Loading prompts for user:', userId);
      const response = await adminAPI.getUserPrompts(userId);
      console.log('Admin: User prompts loaded:', response.data);
      setUserPrompts(response.data);
      setSelectedUser(users.find(u => u._id === userId) || null);
    } catch (err: any) {
      console.error('Admin: Error loading user prompts:', err);
      setError('Error loading user activity: ' + (err.response?.data?.message || err.message));
    }
  };

  const deleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      console.log('Admin: Deleting user:', userId);
      await adminAPI.deleteUser(userId);
      console.log('Admin: User deleted successfully');
      
      // Refresh users list
      loadUsers();
      
      // Clear selected user if it was deleted
      if (selectedUser?._id === userId) {
        setSelectedUser(null);
        setUserPrompts([]);
      }
      
      setError('');
    } catch (err: any) {
      console.error('Admin: Error deleting user:', err);
      setError('Error deleting user: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatDate = (dateString: string) => {
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
              {pagination.total}
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

        {/* Filters */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '16px',
          marginBottom: '24px',
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px'
        }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Search Users</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange('search', e.target.value)}
              className="form-input"
              placeholder="Search by name or phone..."
            />
          </div>
          
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Filter by Role</label>
            <select
              value={filters.role}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange('role', e.target.value)}
              className="form-select"
            >
              <option value="">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
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
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => loadUserPrompts(user._id)}
                        className="btn btn-outline"
                        style={{ fontSize: '14px', padding: '6px 12px' }}
                      >
                        View Activity
                      </button>
                      <button
                        onClick={() => deleteUser(user._id, user.name)}
                        className="btn btn-danger"
                        style={{ fontSize: '14px', padding: '6px 12px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '8px',
            marginTop: '24px'
          }}>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="btn btn-outline"
              style={{ fontSize: '14px', padding: '8px 12px' }}
            >
              Previous
            </button>
            
            <span style={{ margin: '0 16px', color: '#6b7280' }}>
              Page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </span>
            
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.pages}
              className="btn btn-outline"
              style={{ fontSize: '14px', padding: '8px 12px' }}
            >
              Next
            </button>
          </div>
        )}
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