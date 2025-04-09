import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBarMenu';
import AccountStatement from './AccountStatement';
import ActivityLog from './ActivityLog';
import AccountDetails from './AccountDetails';
import { useLocation } from 'react-router';

const AccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const location = useLocation();
  useEffect(()=>{
    setActiveTab("accountStatement")
  },[location])
  // Sample activity log data
  const activityLogData = [
    { date: '18-3-2025 10:38 PM', status: 'Login Successful', ip: '104.28.223.239', isp: 'Cloudflare, Inc.', location: 'Varanasi/Uttar Pradesh/India' },
    { date: '18-3-2025 10:37 PM', status: 'Login Failed', ip: '104.28.223.239', isp: 'Cloudflare, Inc.', location: 'Varanasi/Uttar Pradesh/India' },
    { date: '18-3-2025 02:24 PM', status: 'Login Successful', ip: '104.28.255.238', isp: 'Cloudflare, Inc.', location: 'Varanasi/Uttar Pradesh/India' },
    { date: '18-3-2025 01:05 PM', status: 'Login Successful', ip: '104.28.255.239', isp: 'Cloudflare, Inc.', location: 'Varanasi/Uttar Pradesh/India' },
    { date: '18-3-2025 11:19 AM', status: 'Login Successful', ip: '104.28.255.239', isp: 'Cloudflare, Inc.', location: 'Varanasi/Uttar Pradesh/India' },
  ];

  const items = [
    { key: 'profile', label: 'My Profile' },
    { key: 'accountStatement', label: 'Account Statement' },
    { key: 'activityLog', label: 'Activity Log' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <AccountDetails />;
      case 'accountStatement':
        return <AccountStatement />;
      case 'activityLog':
        return <ActivityLog />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-1  mx-auto my-2 max-w-6xl rounded-lg">
      {/* Sidebar - takes full width on small screens, fixed width on medium+ */}
      <div className="w-full md:w-1/4">
        <Sidebar items={items} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Content Area - takes full width on small screens, remaining space on medium+ */}
      <div className="w-full md:w-3/4 p-4  rounded-lg shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountDashboard;
