import React from 'react';

const BetTable = () => {
  return (
    <div className="flex flex-col w-full">
      {[
        { time: 'Mar 25, 2025, 13 56:31 PM', color: 'bg-red-100', type: 'LAY', odds: 1.03, stake: 1000, username: 'rg2502' },
        { time: 'Mar 22, 2025, 13:50:57 PM', color: 'bg-blue-100', type: 'BACK', odds: 1.07, stake: 10000, username: 'aman2511' },
        { time: 'Mar 22, 2025, 13:40:06 PM', color: 'bg-blue-100', type: 'BACK', odds: 1.16, stake: 3000, username: 'karu2479' },
        { time: 'Mar 22, 2025, 13:33:05 PM', color: 'bg-red-100', type: 'LAY', odds: 1.15, stake: 10000, username: 'sunnen2511' },
        { time: 'Mar 22, 2025, 13:37:55 PM', color: 'bg-blue-100', type: 'BACK', odds: 1.14, stake: 1000, username: 'rg2502' },
        { time: 'Mar 22, 2025, 13:28:45 PM', color: 'bg-blue-100', type: 'BACK', odds: 1.05, stake: 5360, username: 'akhi2463' },
        { time: 'Mar 22, 2025, 13:15:20 PM', color: 'bg-red-100', type: 'LAY', odds: 1.02, stake: 2000, username: 'mishra2402' }
      ].map((row, index) => (
        <div 
          key={index} 
          className={`flex w-full ${row.color} p-1 text-xs border-b border-gray-200`}
        >
          <div className="w-1/3 pl-1">{row.time}</div>
          <div className="w-1/6 text-center">
            <span className={`
              px-1 
              ${row.type === 'LAY' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}
            `}>
              {row.type}
            </span>
          </div>
          <div className="w-1/6 text-center">Chennai Super Kings</div>
          <div className="w-1/12 text-right">{row.odds}</div>
          <div className="w-1/6 text-right">{row.stake}</div>
          <div className="w-1/6 text-right pr-1">{row.username}</div>
        </div>
      ))}
    </div>
  );
};

export default BetTable;

