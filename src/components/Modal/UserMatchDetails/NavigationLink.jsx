import React from "react";

export const NavigationTableCompo = () => {
  const navigationData = [
    { title: "Bet History" },
    { title: "Profit & Loss" },
    { title: "Account Statement" },
    { title: "Activity Log" },
  ];

  return (
    <div className="container sm:w-full flex flex-col">
      <div className="bg-gray-800 text-white font-bold p-2">My Account</div>

      {navigationData &&
        navigationData.length > 0 &&
        navigationData.map((data, index) => (
          <div
            key={index}
            className="w-full cursor-pointer font-semibold border border-gray-300 text-xs text-black/70 bg-white text-center p-2"
          >
            <p>{data.title}</p>
          </div>
        ))}
    </div>
  );
};
