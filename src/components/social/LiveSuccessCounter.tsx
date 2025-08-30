'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, MapPin, Award, Clock, Zap,
  CheckCircle, Globe, Star, ArrowUp 
} from 'lucide-react';

interface SuccessStats {
  totalPlacements: number;
  thisMonth: number;
  thisWeek: number;
  today: number;
  activeApplications: number;
  averageTimeToPlacement: number;
  successRate: number;
  countriesServed: number;
}

interface RecentPlacement {
  id: string;
  name: string;
  profession: string;
  fromCountry: string;
  toCountry: string;
  timestamp: Date;
  salaryIncrease: string;
  service: string;
}

// Simulated real-time data
const mockRecentPlacements: RecentPlacement[] = [
  {
    id: '1',
    name: 'Sarah M.',
    profession: 'RN',
    fromCountry: 'India',
    toCountry: 'USA',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    salaryIncrease: '320%',
    service: 'NCLEX'
  },
  {
    id: '2',
    name: 'Ahmed K.',
    profession: 'Pharmacist',
    fromCountry: 'Egypt',
    toCountry: 'UAE',
    timestamp: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
    salaryIncrease: '280%',
    service: 'DataFlow'
  },
  {
    id: '3',
    name: 'Maria L.',
    profession: 'PT',
    fromCountry: 'Philippines',
    toCountry: 'Australia',
    timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
    salaryIncrease: '260%',
    service: 'AHPRA'
  },
  {
    id: '4',
    name: 'Dr. James O.',
    profession: 'Physician',
    fromCountry: 'Nigeria',
    toCountry: 'Canada',
    timestamp: new Date(Date.now() - 52 * 60 * 1000), // 52 minutes ago
    salaryIncrease: '390%',
    service: 'Licensing'
  }
];

export function LiveSuccessCounter() {
  const [stats, setStats] = useState<SuccessStats>({
    totalPlacements: 15247,
    thisMonth: 423,
    thisWeek: 89,
    today: 12,
    activeApplications: 2156,
    averageTimeToPlacement: 8.5,
    successRate: 96,
    countriesServed: 28
  });

  const [recentPlacements, setRecentPlacements] = useState<RecentPlacement[]>(mockRecentPlacements);
  const [currentPlacement, setCurrentPlacement] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats occasionally
      setStats(prev => ({
        ...prev,
        totalPlacements: prev.totalPlacements + Math.floor(Math.random() * 3),
        today: prev.today + Math.floor(Math.random() * 2),
        activeApplications: prev.activeApplications + Math.floor(Math.random() * 5) - 2
      }));

      // Occasionally add new placements
      if (Math.random() > 0.7) {
        const newPlacements = [
          {
            id: Date.now().toString(),
            name: ['Alex R.', 'Sophie T.', 'Michael C.', 'Linda P.', 'David W.'][Math.floor(Math.random() * 5)],
            profession: ['RN', 'Pharmacist', 'PT', 'Physician', 'RT'][Math.floor(Math.random() * 5)],
            fromCountry: ['India', 'Philippines', 'Pakistan', 'Nigeria', 'Egypt'][Math.floor(Math.random() * 5)],
            toCountry: ['USA', 'UK', 'Australia', 'UAE', 'Canada'][Math.floor(Math.random() * 5)],
            timestamp: new Date(),
            salaryIncrease: `${200 + Math.floor(Math.random() * 200)}%`,
            service: ['NCLEX', 'DataFlow', 'AHPRA', 'NMC', 'Licensing'][Math.floor(Math.random() * 5)]
          }
        ];
        
        setRecentPlacements(prev => [newPlacements[0], ...prev.slice(0, 9)]);
      }
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Cycle through recent placements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlacement(prev => (prev + 1) % Math.min(recentPlacements.length, 4));
    }, 4000);

    return () => clearInterval(interval);
  }, [recentPlacements.length]);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium">Live Success Tracking</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Real-Time Career Success Stories
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Watch as healthcare professionals achieve their international career dreams every day
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold mb-2">
              {stats.totalPlacements.toLocaleString()}
            </div>
            <div className="text-sm text-blue-200 flex items-center justify-center">
              <Users className="h-4 w-4 mr-1" />
              Total Placements
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold mb-2 text-green-400">
              {stats.successRate}%
            </div>
            <div className="text-sm text-blue-200 flex items-center justify-center">
              <Award className="h-4 w-4 mr-1" />
              Success Rate
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold mb-2 text-yellow-400">
              {stats.averageTimeToPlacement}
            </div>
            <div className="text-sm text-blue-200 flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1" />
              Avg. Months
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold mb-2 text-purple-400">
              {stats.countriesServed}
            </div>
            <div className="text-sm text-blue-200 flex items-center justify-center">
              <Globe className="h-4 w-4 mr-1" />
              Countries
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full w-4 h-4 mr-3 animate-pulse"></div>
                <h3 className="text-2xl font-bold">Recent Success Stories</h3>
              </div>
              <div className="text-sm text-blue-200">
                Updated {formatTimeAgo(new Date())}
              </div>
            </div>

            {/* Main Featured Placement */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPlacement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                {recentPlacements[currentPlacement] && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold">
                            {recentPlacements[currentPlacement].name} • {recentPlacements[currentPlacement].profession}
                          </div>
                          <div className="text-blue-200 text-sm flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {recentPlacements[currentPlacement].fromCountry} → {recentPlacements[currentPlacement].toCountry}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg">
                          +{recentPlacements[currentPlacement].salaryIncrease}
                        </div>
                        <div className="text-xs text-blue-300">
                          {formatTimeAgo(recentPlacements[currentPlacement].timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        {recentPlacements[currentPlacement].service} Success
                      </div>
                      <div className="flex items-center text-green-400 text-sm">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        Career Upgraded
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Recent Placements List */}
            <div className="grid md:grid-cols-2 gap-4">
              {recentPlacements.slice(1, 5).map((placement, index) => (
                <motion.div
                  key={placement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-sm">
                      {placement.name} • {placement.profession}
                    </div>
                    <div className="text-green-400 text-sm font-bold">
                      +{placement.salaryIncrease}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-blue-300">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {placement.fromCountry} → {placement.toCountry}
                    </div>
                    <div>{formatTimeAgo(placement.timestamp)}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Counter */}
            <div className="mt-8 text-center">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {stats.thisMonth}
                  </div>
                  <div className="text-sm text-blue-200">This Month</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {stats.thisWeek}
                  </div>
                  <div className="text-sm text-blue-200">This Week</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {stats.today}
                  </div>
                  <div className="text-sm text-blue-200">Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-blue-500 rounded-full px-6 py-3 mb-6">
            <Zap className="h-5 w-5 mr-2" />
            <span className="font-semibold">Join the success stories happening right now!</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-colors">
              Start My Application
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-medium py-4 px-8 rounded-full transition-colors">
              See More Success Stories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}