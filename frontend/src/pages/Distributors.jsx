import React, { useState, useEffect } from 'react';
import { AlertCircle, Plus, X } from 'lucide-react';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const getCurrentUser = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('user');
    return null;
  }
};

const getAuthToken = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null;
    }
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

const isAdminUser = () => {
  const user = getCurrentUser();
  return user?.email === 'akash@gmail.com';
};

const Alert = ({ children, variant = 'default', onClose }) => {
  const baseClasses = 'p-4 rounded-lg border flex items-start space-x-3 mb-4';
  const variants = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  };
  
  return (
    <div className={`${baseClasses} ${variants[variant]}`}>
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">{children}</div>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}
    </div>
  );
};

const AddDistributorModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    country: '',
    company: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const resetForm = () => {
    setFormData({
      country: '',
      company: '',
      address: '',
      phone: ''
    });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Add New Distributor</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter country"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Distributor'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DistributorTable = () => {
  // ✅ Move hardcoded data outside state for fallback reference
  const staticDistributors = [
    {
      country: 'Brazil',
      company: 'Lactea Cientifica',
      address: 'Rua Scuvero 22301527-00, São Paulo (SP)',
      phone: '+55 11 3277 8523',
    },
    {
      country: 'Algeria',
      company: 'Tenerflow',
      address: 'Algeria',
      phone: '+216 98 938 128',
    },
    {
      country: 'Argentina',
      company: 'Supertec S.A',
      address: 'Piedras 1930, Buenos Aires',
      phone: '+54(11) 4307-2141',
    },
    {
      country: 'India',
      company: 'Wide Range Corporation',
      address: 'Aurangabad',
      phone: '+91 93733 50298',
    },
  ];

  const [distributors, setDistributors] = useState(staticDistributors);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const currentUser = getCurrentUser();
      const adminStatus = isAdminUser();
      const token = getAuthToken();
      
      console.log('Auth Debug - Current user:', currentUser);
      console.log('Auth Debug - Token exists:', !!token);
      console.log('Auth Debug - Is admin:', adminStatus);
      
      setUser(currentUser);
      setIsAdmin(adminStatus);

      // ✅ REMOVED - No more auth error messages for non-admin/non-logged users
      
      setIsLoading(false);
    };

    initializeAuth();
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      console.log('Fetching distributors from:', `${backendURL}/api/Distributor`);
      const response = await fetch(`${backendURL}/api/Distributor`);
      if (response.ok) {
        const data = await response.json();
        console.log('Distributors fetched:', data.distributors);
        // If backend has data, use it; otherwise keep static distributors
        if (data.distributors && data.distributors.length > 0) {
          // Combine backend data with static data (backend first)
          setDistributors([...data.distributors, ...staticDistributors]);
        }
        // If no backend data, static distributors remain (already set in useState)
      } else {
        console.error('Failed to fetch distributors:', response.status);
        // Keep static data if fetch fails (already set in useState)
      }
    } catch (error) {
      console.error('Error fetching distributors:', error);
      // Keep static data if network error occurs (already set in useState)
    }
  };

  const handleAddDistributor = async (formData) => {
    // ✅ REMOVED - No more auth checks here, only admin users can open modal anyway
    
    setIsSubmitting(true);
    setSubmitError('');
    setSuccessMessage('');

    try {
      const token = getAuthToken();
      const response = await fetch(`${backendURL}/api/auth/Distributor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Distributor added successfully!');
        setShowModal(false);
        // Add new distributor to the list (at the beginning)
        setDistributors(prev => [data.distributors, ...prev]);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setSubmitError(data.message || 'Failed to add distributor');
      }
    } catch (error) {
      console.error('Error adding distributor:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = () => {
    // ✅ REMOVED - No more auth error messages, button only shows for admin anyway
    setShowModal(true);
    setSubmitError('');
  };

  if (isLoading) {
    return (
      <div className="py-20 bg-white">
        <div className="flex justify-center items-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      <section className="bg-white py-1">
        <div className="flex justify-between items-center mb-8 px-4 max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900">
            Our Distributors
          </h2>
          
          {/* ✅ ONLY show button for admin users - no error messages for others */}
          {user && isAdmin && (
            <button
              onClick={handleOpenModal}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Distributor</span>
            </button>
          )}
        </div>

        {/* ✅ REMOVED - No more auth error messages */}

        {submitError && (
          <div className="px-4 max-w-5xl mx-auto mb-4">
            <Alert variant="error" onClose={() => setSubmitError('')}>
              {submitError}
            </Alert>
          </div>
        )}

        {successMessage && (
          <div className="px-4 max-w-5xl mx-auto mb-4">
            <Alert variant="success" onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          </div>
        )}

        <div className="flex justify-center px-4">
          <div className="w-full max-w-5xl overflow-x-auto border border-gray-300 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-4">Country</th>
                  <th className="text-left px-6 py-4">Company</th>
                  <th className="text-left px-6 py-4">Address</th>
                  <th className="text-left px-6 py-4">Phone</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {distributors.map((dist, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{dist.country}</td>
                    <td className="px-6 py-4">{dist.company}</td>
                    <td className="px-6 py-4">{dist.address}</td>
                    <td className="px-6 py-4">{dist.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add Distributor Modal */}
      <AddDistributorModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddDistributor}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default DistributorTable;