import React, { useState } from 'react';

const Notifications = () => {
  // Hardcoded initial data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'salary',
      title: 'Salary Credited',
      message: 'Your salary for November 2024 has been credited to your account.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'leave',
      title: 'Leave Request Approved',
      message: 'Your leave request for Dec 20-22 has been approved by your manager.',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'announcement',
      title: 'Company Holiday Announcement',
      message: 'Office will be closed on December 25th for Christmas. Happy Holidays!',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'reimbursement',
      title: 'Reimbursement Processed',
      message: 'Your travel reimbursement of ₹5,500 has been processed successfully.',
      time: '2 days ago',
      read: true
    },
    {
      id: 5,
      type: 'announcement',
      title: 'New Policy Update',
      message: 'Please review the updated work from home policy in the employee handbook.',
      time: '3 days ago',
      read: false
    },
    {
      id: 6,
      type: 'leave',
      title: 'Leave Balance Update',
      message: 'Your leave balance has been updated. You have 12 days remaining.',
      time: '4 days ago',
      read: true
    }
  ]);
  
  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(notif => notif.id !== id));
    }
  };

  const deleteAllRead = () => {
    if (window.confirm('Are you sure you want to delete all read notifications?')) {
      setNotifications(notifications.filter(notif => !notif.read));
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const getIcon = (type) => {
    switch(type) {
      case 'salary': return '💰';
      case 'leave': return '🏖️';
      case 'announcement': return '📢';
      case 'reimbursement': return '🧾';
      default: return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            <p className="text-gray-600">
              Stay updated with important alerts
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className={`px-4 py-2 border border-gray-300 rounded-lg transition ${
                unreadCount === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50'
              }`}
            >
              Mark All Read
            </button>
            <button
              onClick={deleteAllRead}
              disabled={notifications.filter(n => n.read).length === 0}
              className={`px-4 py-2 bg-red-600 text-white rounded-lg transition ${
                notifications.filter(n => n.read).length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-red-700'
              }`}
            >
              Delete All Read
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'unread' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg transition ${
              filter === 'read' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Read ({notifications.filter(n => n.read).length})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 transition ${!notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-2xl mr-4 flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-sm text-gray-500">{notification.time}</span>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded capitalize">
                          {notification.type}
                        </span>
                      </div>
                      <div className="flex space-x-4 mt-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'You have no notifications yet.' 
                : filter === 'unread' 
                  ? 'All notifications are read.' 
                  : 'No read notifications.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;