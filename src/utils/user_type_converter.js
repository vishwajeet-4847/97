const userTypes = {
    0: "Main Admin",
    1: "User",
    2: "Agent",
    3: "Master",
    4: "Super Master",
    5: "Mini Admin",
  };
  
  const titles = [
    { route: "user", title: "User", userTypeCode: 1 },
    { route: "agent", title: "Agent", userTypeCode: 2 },
    { route: "master", title: "Master", userTypeCode: 3 },
    { route: "super-master", title: "Super Master", userTypeCode: 4 },
    { route: "mini-admin", title: "Mini Admin", userTypeCode: 5 },
  ];

export const getButtonTitle = (route) =>
    titles.find((item) => item.route === route)?.title || "Unknown";
  
export const getUserTypeCode = (route) =>
    titles.find((item) => item.route === route)?.userTypeCode || 0;

export const getUserType = (userTypeCode) =>userTypes[userTypeCode];
