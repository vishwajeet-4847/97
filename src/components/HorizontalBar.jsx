import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, LogOut } from "lucide-react";
import { AuthContext } from "../services/auth/auth.context";
import { getFilteredMenu } from "../utils/menu-routes";

const HorizontalBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const navigate = useNavigate();
  const { user, onLogout } = useContext(AuthContext);

  const filteredMenu = getFilteredMenu(user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeDropdown !== null &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown].contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const renderMenuItem = (item, index, isLast) => {
    if (item.subRoutes && item.subRoutes.length === 0) {
      return null;
    }

    if (item.route) {
      return (
        <React.Fragment key={index}>
          <div
            className="px-3 py-2 text-black cursor-pointer hover:bg-green-800 font-bold whitespace-nowrap hover:underline"
            onClick={() => handleNavigation(item.route)}
          >
            {item.name}
          </div>
          {!isLast && <div className="w-px h-6 bg-gray-500/50"></div>}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={index}>
        <div
          className="relative"
          ref={(el) => (dropdownRefs.current[index] = el)}
        >
          <div
            className="flex items-center px-3 py-2 text-black cursor-pointer hover:bg-green-800 font-bold whitespace-nowrap hover:underline"
            onClick={() => toggleDropdown(index)}
          >
            {item.name}
            <ChevronDown className="ml-1 w-4 h-4" />
          </div>

          {activeDropdown === index &&
            item.subRoutes &&
            item.subRoutes.length > 0 && (
              <div
                className="fixed shadow-lg z-20"
                style={{
                  top: `${
                    dropdownRefs.current[index]?.getBoundingClientRect()
                      .bottom || 0
                  }px`,
                  left: `${
                    dropdownRefs.current[index]?.getBoundingClientRect().left ||
                    0
                  }px`,
                  background: "linear-gradient(#00a100 0, #005500 100%)",
                }}
              >
                {item.subRoutes.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className="px-4 py-2 text-black cursor-pointer hover:bg-green-800 font-bold whitespace-nowrap hover:underline"
                    onClick={() => {
                      handleNavigation(subItem.route);
                      setActiveDropdown(null);
                    }}
                  >
                    {subItem.name}
                  </div>
                ))}
              </div>
            )}
        </div>
        {!isLast && <div className="w-px h-6 bg-gray-500/50"></div>}
      </React.Fragment>
    );
  };

  return (
    <div
      className="w-full flex justify-between items-center overflow-x-auto shadow-lg"
      style={{
        background: "linear-gradient(#00a100 0, #005500 100%)",
      }}
    >
      <div className="flex flex-nowrap items-center">
        {filteredMenu
          .map((item, index) => {
            const element = renderMenuItem(
              item,
              index,
              index === filteredMenu.length - 1
            );
            return element;
          })
          .filter(Boolean)}
      </div>
      <div
        className="px-3 py-2 text-black cursor-pointer hover:bg-green-800 flex items-center whitespace-nowrap ml-auto font-bold hover:underline"
        onClick={() => onLogout()}
      >
        Logout
        <LogOut className="ml-1 w-4 h-4" />
      </div>
    </div>
  );
};

export default HorizontalBar;
