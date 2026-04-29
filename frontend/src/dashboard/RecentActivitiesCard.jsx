import React, { useState, useEffect, useContext, useMemo } from "react";
import { getActivityIcon } from "../icons/activityIcons";
import { UserContext } from "../pages/UserContext";

const formatExerciseType = (type) => {
  if (!type) return 'Exercise';
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatDuration = (seconds) => {
  if (!seconds) return '0s';
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

const RecentActivitiesCard = React.memo(() => {
  const { token } = useContext(UserContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseLogs = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/logs/exercise', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const result = await response.json();
        
        if (result.success) {
          const transformed = result.data.map((log) => ({
            name: formatExerciseType(log.exerciseType),
            time: formatRelativeTime(log.date),
            duration: formatDuration(log.duration),
            reps: log.reps,
            rawDate: log.date,
          }));
          setActivities(transformed);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to load activities');
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseLogs();
  }, [token]);

  const displayActivities = useMemo(() => 
    activities.length > 0 ? activities : [{ name: 'No recent exercises', time: '', duration: '--' }],
    [activities]
  );

  return (
    <div className="bg-[#161B22] p-5 rounded-xl border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Activities</h2>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-400 text-sm py-4 text-center">{error}</div>
      ) : (
        <div className="space-y-4">
          {displayActivities.slice(0, 6).map((activity, index) => {
            const activityMeta = getActivityIcon(activity.name) || {};
            const Icon = activityMeta.icon || (() => null);
            const color = activityMeta.color || "text-gray-400";

            return (
              <div key={activity.rawDate ? `${activity.name}-${activity.rawDate}` : index} className="flex items-center justify-between">
                  <div className="flex items-center">
                      <div className="p-2 rounded-full mr-3 bg-gray-800">
                          <Icon size={20} className={color} />
                      </div>
                      <div>
                          <p className="font-medium text-white">{activity.name}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                      {activity.duration}
                  </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default RecentActivitiesCard;