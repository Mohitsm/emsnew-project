// components/HRAppraisal.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal';

const AdminHRAppraisal = ({ loading, setLoading }) => {
  const [appraisals, setAppraisals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    employeeId: '',
    period: '',
    rating: 0,
    strengths: '',
    areasForImprovement: '',
    feedback: '',
    promotionRecommendation: false
  });

  const [goalForm, setGoalForm] = useState({
    title: '',
    description: '',
    employeeId: '',
    targetDate: '',
    priority: 'medium',
    kpis: ''
  });

  const ratingOptions = [
    { value: 1, label: 'Needs Improvement', color: 'bg-red-100 text-red-800' },
    { value: 2, label: 'Meets Expectations', color: 'bg-yellow-100 text-yellow-800' },
    { value: 3, label: 'Exceeds Expectations', color: 'bg-green-100 text-green-800' },
    { value: 4, label: 'Outstanding', color: 'bg-blue-100 text-blue-800' },
    { value: 5, label: 'Exceptional', color: 'bg-purple-100 text-purple-800' },
  ];

  useEffect(() => {
    fetchAppraisals();
    fetchGoals();
  }, []);

  const fetchAppraisals = () => {
    // Mock data
    setAppraisals([
      { 
        id: 1, 
        employeeName: 'John Doe', 
        period: 'Q4 2024', 
        rating: 4, 
        status: 'completed',
        reviewer: 'Jane Manager',
        date: '2024-12-15'
      },
      { 
        id: 2, 
        employeeName: 'Jane Smith', 
        period: 'Q4 2024', 
        rating: 3, 
        status: 'in-progress',
        reviewer: 'John Manager',
        date: '2024-12-10'
      },
    ]);
  };

  const fetchGoals = () => {
    setGoals([
      { 
        id: 1, 
        title: 'Increase Sales Revenue', 
        employeeName: 'John Doe',
        progress: 75, 
        targetDate: '2024-12-31',
        priority: 'high',
        status: 'on-track'
      },
      { 
        id: 2, 
        title: 'Complete Project X', 
        employeeName: 'Jane Smith',
        progress: 40, 
        targetDate: '2024-12-20',
        priority: 'medium',
        status: 'delayed'
      },
    ]);
  };

  const handleCreateReview = () => {
    setReviewForm({
      employeeId: '',
      period: 'Q1 2025',
      rating: 3,
      strengths: '',
      areasForImprovement: '',
      feedback: '',
      promotionRecommendation: false
    });
    setShowReviewModal(true);
  };

  const handleCreateGoal = () => {
    setGoalForm({
      title: '',
      description: '',
      employeeId: '',
      targetDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      kpis: ''
    });
    setShowGoalModal(true);
  };

  const handleSaveReview = () => {
    const newReview = {
      id: appraisals.length + 1,
      employeeName: 'New Employee',
      period: reviewForm.period,
      rating: reviewForm.rating,
      status: 'draft',
      reviewer: 'Current User',
      date: new Date().toISOString().split('T')[0]
    };
    setAppraisals([newReview, ...appraisals]);
    setShowReviewModal(false);
    alert('Performance review saved!');
  };

  const handleSaveGoal = () => {
    const newGoal = {
      id: goals.length + 1,
      title: goalForm.title,
      employeeName: 'New Employee',
      progress: 0,
      targetDate: goalForm.targetDate,
      priority: goalForm.priority,
      status: 'not-started'
    };
    setGoals([newGoal, ...goals]);
    setShowGoalModal(false);
    alert('Goal created successfully!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-track': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <span 
            key={star} 
            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">HR Appraisal</h2>
          <p className="text-gray-600">Manage performance reviews and goal setting</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={handleCreateGoal}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            🎯 Set Goal
          </button>
          <button
            onClick={handleCreateReview}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            📝 Start Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Reviews */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Performance Reviews</h3>
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                <option value="">All Periods</option>
                <option value="q1">Q1 2024</option>
                <option value="q2">Q2 2024</option>
                <option value="q3">Q3 2024</option>
                <option value="q4">Q4 2024</option>
              </select>
            </div>

            <div className="space-y-4">
              {appraisals.map(review => (
                <div key={review.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.employeeName}</h4>
                      <p className="text-sm text-gray-600">{review.period} • Reviewed by {review.reviewer}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(review.status)} mb-2`}>
                        {review.status}
                      </span>
                      {renderRatingStars(review.rating)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{review.date}</span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-700 text-sm">
                        Finalize
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goal Tracking */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Goal Tracking</h3>
              <button className="text-blue-600 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.employeeName}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getGoalStatusColor(goal.status)}`}>
                        {goal.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          goal.progress < 50 ? 'bg-red-500' :
                          goal.progress < 80 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Due: {goal.targetDate}</span>
                    <button className="text-blue-600 hover:text-blue-700">
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rating System */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Rating System</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Criteria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ratingOptions.map(rating => (
                <tr key={rating.value} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderRatingStars(rating.value)}
                      <span className="ml-3 font-medium">{rating.value}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${rating.color}`}>
                      {rating.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">
                      {rating.value === 1 ? 'Performance below expectations, requires improvement' :
                       rating.value === 2 ? 'Meets basic job requirements' :
                       rating.value === 3 ? 'Consistently exceeds expectations' :
                       rating.value === 4 ? 'Significantly exceeds expectations' :
                       'Exceptional performance, role model for others'}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Review Modal */}
      <Modal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Performance Review"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee *
              </label>
              <select
                value={reviewForm.employeeId}
                onChange={(e) => setReviewForm({...reviewForm, employeeId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Employee</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Period *
              </label>
              <select
                value={reviewForm.period}
                onChange={(e) => setReviewForm({...reviewForm, period: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="q1">Q1 2025</option>
                <option value="q2">Q2 2025</option>
                <option value="q3">Q3 2025</option>
                <option value="q4">Q4 2025</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating *
            </label>
            <div className="flex space-x-4">
              {ratingOptions.map(rating => (
                <button
                  key={rating.value}
                  type="button"
                  onClick={() => setReviewForm({...reviewForm, rating: rating.value})}
                  className={`px-4 py-2 rounded-lg ${
                    reviewForm.rating === rating.value
                      ? rating.color
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating.value} - {rating.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Strengths
            </label>
            <textarea
              value={reviewForm.strengths}
              onChange={(e) => setReviewForm({...reviewForm, strengths: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="List the employee's key strengths and achievements"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Areas for Improvement
            </label>
            <textarea
              value={reviewForm.areasForImprovement}
              onChange={(e) => setReviewForm({...reviewForm, areasForImprovement: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Areas where the employee can improve"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Feedback
            </label>
            <textarea
              value={reviewForm.feedback}
              onChange={(e) => setReviewForm({...reviewForm, feedback: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Provide overall feedback and recommendations"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={reviewForm.promotionRecommendation}
              onChange={(e) => setReviewForm({...reviewForm, promotionRecommendation: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              Recommend for promotion
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowReviewModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveReview}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Review
          </button>
        </div>
      </Modal>

      {/* Set Goal Modal */}
      <Modal
        show={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        title="Set Performance Goal"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal Title *
            </label>
            <input
              type="text"
              value={goalForm.title}
              onChange={(e) => setGoalForm({...goalForm, title: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., Increase sales by 20%"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={goalForm.description}
              onChange={(e) => setGoalForm({...goalForm, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Detailed description of the goal"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign to Employee *
            </label>
            <select
              value={goalForm.employeeId}
              onChange={(e) => setGoalForm({...goalForm, employeeId: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Employee</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Date *
              </label>
              <input
                type="date"
                value={goalForm.targetDate}
                onChange={(e) => setGoalForm({...goalForm, targetDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority *
              </label>
              <select
                value={goalForm.priority}
                onChange={(e) => setGoalForm({...goalForm, priority: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Performance Indicators (KPIs)
            </label>
            <textarea
              value={goalForm.kpis}
              onChange={(e) => setGoalForm({...goalForm, kpis: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Measurable KPIs to track goal progress"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowGoalModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveGoal}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Set Goal
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminHRAppraisal;