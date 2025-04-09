import { useState } from "react";
import { DollarSign, Settings, User, Lock, Trash2, ArrowUpDown } from "lucide-react";
import { GrSchedulePlay } from "react-icons/gr";
import { MdOutlineVpnLock } from "react-icons/md";
import SportsSettingsModal from "./Rossan/SportsSettingsModal";
import { useNavigate } from "react-router";
import UserStatusManagement from "./Rossan/UserStatusManagement";
import React, { memo } from "react";

const ICONS = {
  DollarSign,
  Settings,
  User,
  Lock,
  Trash2,
  ArrowUpDown,
  GrSchedulePlay,
  MdOutlineVpnLock,
};
  
const ActionButtons = memo(({ actions,fs_id }) => {
  const navigate= useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGr, setGr] = useState(null);
  const handleIconClick = (icon, onClick) => {
    console.log("Clicked icon:", icon);
  
    if (icon === "MdOutlineVpnLock") {
      setIsModalOpen(true);
    }else if(icon === 'User'){
      navigate(`/account?fs_id=${fs_id}`)
    } if (onClick) {
      onClick();
    }
  };

  return (
    <>
    <div className="flex gap-2">
      {actions.map(({ icon, onClick, color , button }, index) => {
        const IconComponent = ICONS[icon];
  
        if (IconComponent) {
          return (
            <button
              key={index}
              onClick={() => handleIconClick(icon, onClick)}
              className={`p-2 rounded transition duration-200 ease-in-out 
                ${color === "red" ? "text-red-500" : "text-gray-700"} 
                bg-gray-200 hover:bg-gray-300`}
            >
              <IconComponent size={18} />
            </button>
          );
        } else {
          return (
            <button
              key={index}
              onClick={() => handleIconClick(icon, onClick)}
              className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              {button}
            </button>
          );
        }
      })}
    </div>
 

      {/* Modal */}
      {isModalOpen && (
        <SportsSettingsModal onClose={() => setIsModalOpen(false)}/>
      )}

    {isGr && (
        <UserStatusManagement setGr={setGr}/>
      )}
    </>
  );
});

export default ActionButtons;