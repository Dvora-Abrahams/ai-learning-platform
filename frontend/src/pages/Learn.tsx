import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { categoriesAPI, promptsAPI } from '../services/api';
import type { Category, SubCategory } from '../types';

const Learn = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (err) {
      setError('Error loading categories');
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory('');
    setSubCategories([]);

    if (categoryId) {
      try {
        const response = await categoriesAPI.getSubCategories(categoryId);
        setSubCategories(response.data);
      } catch (err) {
        setError('Error loading subcategories');
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory || !prompt.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await promptsAPI.create({
        category_id: selectedCategory,
        sub_category_id: selectedSubCategory,
        prompt: prompt.trim()
      });
      
      console.log('Prompt created successfully:', result.data);
      setResponse(result.data.response);
      setPrompt('');
    } catch (err: any) {
      console.error('Error creating prompt:', err);
      setError(err.response?.data?.message || 'Error submitting question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div className="card">
        <h2>Start Learning</h2>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          Choose a topic and ask AI any question you want
        </p>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              value={selectedCategory}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => handleCategoryChange(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {subCategories.length > 0 && (
            <div className="form-group">
              <label className="form-label">Subcategory</label>
              <select
                value={selectedSubCategory}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedSubCategory(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select Subcategory</option>
                {subCategories.map(subCategory => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Your Question</label>
            <textarea
              value={prompt}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
              className="form-input"
              rows={4}
              placeholder="For example: Explain black holes to me..."
              required
              minLength={5}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading || !selectedCategory || !selectedSubCategory}
          >
            {loading ? 'Sending...' : 'Send Question'}
          </button>
        </form>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}

      {response && (
        <div className="card">
          <h3>Your Answer</h3>
          <div style={{ 
            whiteSpace: 'pre-wrap', 
            lineHeight: '1.8',
            marginTop: '16px',
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;