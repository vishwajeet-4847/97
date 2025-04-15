import { Outlet, useLocation } from 'react-router';
import Sidebar2 from '../components/sidebar2';
import { useEffect, useState } from 'react';

const items = [
  { key: 'profile', label: 'Profile', path: '/my-account/profile' },
  { key: 'betHistory', label: 'Bet History', path: '/my-account/bet-history' },
  { key: 'profitLoss', label: 'Profit & Loss', path: '/my-account/profit-loss' },
  { key: 'activityLog', label: 'Activity Log', path: '/my-account/activitylog' },
  { key: 'accountStatement', label: 'Account Statement', path: '/my-account/accountstatement' },
];

const AccountLayout = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (location.state?.userData) {
      setUserData(location.state.userData);
    }
  }, [location]);

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto py-4">
      <Sidebar2 items={items} />

      <div className="flex-1 bg-white shadow rounded p-4 ml-0 md:ml-4 mt-4 md:mt-0">
        {/* You can also wrap Outlet with context to provide userData */}
        <Outlet context={{ userData }} />
      </div>
    </div>
  );
};

export default AccountLayout;