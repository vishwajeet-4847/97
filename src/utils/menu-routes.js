const DummyMenu = [
    { route: "/dashboard", name: "Dashboard" },
    {
      name: "Downline List",
      subRoutes: [
        { route: "/list/user", name: "User Downline List", allowedUserTypes: [] },
        { route: "/list/agent", name: "Agent Downline List", allowedUserTypes: [1, 2] },
        { route: "/list/super-master", name: "Super Master Downline List", allowedUserTypes: [1, 2, 3] },
        { route: "/list/master", name: "Master Downline List", allowedUserTypes: [1, 2, 3, 4] },
        { route: "/list/mini-admin", name: "Mini Admin Downline List", allowedUserTypes: [1, 2, 3, 4, 5] },
      ],
    },
    { route: "/account", name: "My Account" },
    {
      name: "My Report",
      subRoutes: [
        { route: "/profit-loss", name: "Event profit/loss" },
        { route: "/downline-pl", name: "Downline profit/loss" },
      ],
    },
    { route: "/betting", name: "BetList" },
    { route: "/market-analysis", name: "Market Analysis" },
    {
      name: "Banking",
      subRoutes: [
        { route: "/user-banking", name: "User Banking" },
        { route: "/master-banking", name: "Master Banking" },
      ],
    },
    { route: "/commission", name: "Commission" },
    { route: "/password-history", name: "Password History" },
    { route: "/restore-user", name: "Restore User" },
  ];


 export const getFilteredMenu = (user) => {
    if (!user) return DummyMenu;
    
    
    
    return DummyMenu.map((item) => {
      if (item.subRoutes) {
        if (item.name === "Downline List") {
          if (user.user_type == 0) {
           
            return item;
          } else {
            const filteredSubRoutes = item.subRoutes.filter(subItem => {
              const isAvailableToAll = subItem.allowedUserTypes.length === 0;
              const isExplicitlyAllowed = subItem.allowedUserTypes.includes(user.user_type);
              return isAvailableToAll || isExplicitlyAllowed;
            });
            
           
            
            return {
              ...item,
              subRoutes: filteredSubRoutes
            };
          }
        }
        return item;
      }
      return item;
    });
  };
  