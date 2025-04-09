import React from "react";

const ViewMore = ({setLiveClkd}) => {
  const data = [
    { username: "SUMAN2511", nation: "Chennai Super Kings", amount: 20000, rate: 1.24, date: "Mar 23, 2025, 9:34:21 PM", matchdate: "Mar 23, 2025, 9:34:45 PM", matchType: "Match_Odds" },
    { username: "SUMAN2511", nation: "Chennai Super Kings", amount: 5000, rate: 1.25, date: "Mar 23, 2025, 9:34:42 PM", matchdate: "Mar 23, 2025, 9:34:45 PM", matchType: "Match_Odds" },
    { username: "SUMAN2511", nation: "Chennai Super Kings", amount: 10000, rate: 1.07, date: "Mar 23, 2025, 10:50:51 PM", matchdate: "Mar 23, 2025, 9:34:45 PM", matchType: "Match_Odds" },
    { username: "SUMAN2511", nation: "Mumbai Indians", amount: 10000, rate: 4.2, date: "Mar 23, 2025, 8:31:16 PM", matchdate: "Mar 23, 2025, 9:34:45 PM", matchType: "Match_Odds" },
    { username: "SUMAN2511", nation: "Chennai Super Kings", amount: 10000, rate: 1.15, date: "Mar 23, 2025, 10:37:55 PM", matchdate: "Mar 23, 2025, 9:34:45 PM", matchType: "Match_Odds" },
    { username: "SHUBHAM2407", nation: "Mumbai Indians", amount: 200, rate: 2.94, date: "Mar 23, 2025, 7:35:10 PM", matchdate: "Mar 23, 2025, 9:34:45 PM", matchType: "Match_Odds" },
    { username: "SHUBHAM2407", nation: "Mumbai Indians", amount: 1000, rate: 2.24, date: "Mar 23, 2025, 7:15:18 PM", matchdate: "Mar 23, 2025, 9:34:45 PM", matchType: "Match_Odds" },
  ];

  return (
    <div className="fixed inset-0 p-2 flex  justify-center top-0 z-20">
      <div className="w-full max-w-lg h-[590px] bg-white shadow-lg rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 text-white px-4 py-3">
          <h2 className="text-lg font-bold">Sports Settings</h2>
          <button onClick={()=>setLiveClkd(false)} className="text-xl font-bold" >&times;</button>
        </div>
    <div className="max-w-md mx-auto mt-5 overflow-x-auto h-130 overflow-y-auto">
      <table className="w-full border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">UserName</th>
            <th className="border p-2">Nation</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">User Rate</th>
            <th className="border p-2">Place Date</th>
            <th className="border p-2">Match Date</th>
            <th className="border p-2">Game Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`${row.nation.includes("Chennai") ? "bg-red-200" : "bg-blue-200"}`}
            >
              <td className="border p-2 text-blue-600 underline cursor-pointer">{row.username}</td>
              <td className="border p-2">{row.nation}</td>
              <td className="border p-2">{row.amount}</td>
              <td className="border p-2">{row.rate}</td>
              <td className="border p-2">{row.date}</td>
              <td className="border p-2">{row.matchdate}</td>
              <td className="border p-2">{row.matchType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div> </div>
  );
};

export default ViewMore;
