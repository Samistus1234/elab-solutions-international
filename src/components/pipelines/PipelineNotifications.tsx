'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, Check, AlertTriangle, Info, CheckCircle, 
  Clock, User, Calendar, ArrowRight, Settings,
  Volume2, VolumeX, Filter, Search
} from 'lucide-react';
import { usePipelineStore, PipelineNotification } from '@/lib/stores/pipeline-store';

interface PipelineNotificationsProps {
  compact?: boolean;
  showHeader?: boolean;
  maxNotifications?: number;
  enableSound?: boolean;
  enableFiltering?: boolean;
}

const PipelineNotifications: React.FC<PipelineNotificationsProps> = ({
  compact = false,
  showHeader = true,
  maxNotifications = 50,
  enableSound = true,
  enableFiltering = true
}) => {
  const {
    notifications,
    unreadNotifications,
    markNotificationRead,
    clearNotifications
  } = usePipelineStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(enableSound);
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'high' | 'medium' | 'low'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastNotificationCount, setLastNotificationCount] = useState(0);

  // Play notification sound for new notifications
  useEffect(() => {
    if (soundEnabled && notifications.length > lastNotificationCount && lastNotificationCount > 0) {
      playNotificationSound();
    }
    setLastNotificationCount(notifications.length);
  }, [notifications.length, soundEnabled, lastNotificationCount]);

  const playNotificationSound = () => {
    // Create a simple notification sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  };

  // Filter notifications based on criteria
  const filteredNotifications = notifications
    .filter(notification => {
      // Filter by type
      if (filterType === 'unread' && notification.isRead) return false;
      if (filterType !== 'all' && filterType !== 'unread' && notification.priority !== filterType) return false;
      
      // Filter by search query
      if (searchQuery && !notification.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !notification.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !notification.message.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .slice(0, maxNotifications);

  const getNotificationIcon = (event: PipelineNotification['event'], priority: string) => {
    const iconClass = `h-5 w-5 ${
      priority === 'high' ? 'text-red-500' : 
      priority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
    }`;

    switch (event) {
      case 'stage_changed':
        return <CheckCircle className={iconClass} />;
      case 'stage_delayed':
        return <Clock className={iconClass} />;
      case 'insufficiency':
        return <AlertTriangle className={iconClass} />;
      case 'completed':
        return <CheckCircle className={`h-5 w-5 text-green-500`} />;
      default:
        return <Info className={iconClass} />;
    }
  };

  const getNotificationBg = (notification: PipelineNotification) => {
    if (!notification.isRead) {
      switch (notification.priority) {
        case 'high': return 'bg-red-50 border-red-200';
        case 'medium': return 'bg-yellow-50 border-yellow-200';
        default: return 'bg-blue-50 border-blue-200';
      }
    }
    return 'bg-white border-gray-200';
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (compact) {
    return (
      <div className="relative">
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadNotifications.length > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
            </motion.span>
          )}
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    Pipeline Updates ({unreadNotifications.length} new)
                  </h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-80">
                {filteredNotifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${getNotificationBg(notification)}`}
                      onClick={() => markNotificationRead(notification.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.event, notification.priority)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.applicantName}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {notification.serviceName}
                          </p>
                          <p className="text-sm text-gray-800 mt-1">
                            {notification.message}
                          </p>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={clearNotifications}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Clear all notifications
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {showHeader && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Pipeline Notifications
                </h2>
                <p className="text-sm text-gray-600">
                  {unreadNotifications.length} unread of {notifications.length} total
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}
                title={soundEnabled ? 'Disable sound notifications' : 'Enable sound notifications'}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>

              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {enableFiltering && (
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          )}
        </div>
      )}

      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {searchQuery || filterType !== 'all' 
                ? 'No notifications match your current filters.'
                : 'You\'ll see pipeline updates and important notifications here.'
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${getNotificationBg(notification)}`}
              onClick={() => markNotificationRead(notification.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.event, notification.priority)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        {notification.applicantName}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {notification.serviceName}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                        notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notification.priority}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-800 mb-3">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Pipeline Update</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(notification.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {!notification.isRead && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-xs text-blue-600 font-medium">New</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <ArrowRight className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default PipelineNotifications;