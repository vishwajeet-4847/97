import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import CommissionModal from "../components/Rossan/CommissionModal";
import PasswordModal from "../components/Rossan/PasswordModal";
import MobileModal from "../components/Rossan/MobileModal";
import ExposureModal from "../components/Rossan/ExposureModal";
import { useSearchParams } from "react-router";
import axios from "axios";
import RollingCommissionModal from "../components/Rossan/RollingCommissionModal";

const AccountDetails = ({ profileData }) => {
  const formatLabel = (label) => {
    return label
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const [searchParams]= useSearchParams();
  const _id= searchParams.get('fs_id');

  useEffect(() => {
    const getData= async() => {
      const user= JSON.parse(localStorage.getItem('user'));
      console.log('user',user);
      const result= await axios.post('https://admin.titan97.live/Apicall/myprofile', { user_id: (_id || user.user_id) })
      console.log(result.data);
      setProfile(result.data.profile_info);
    }
    getData();
  }, [])

  const [profile, setProfile]= useState(null);

  const [commissionPopup, setCommissionPopup] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [mobilePopup, setMobilePopup] = useState(false);
  const [exposurePopup, setExposurePopup] = useState(false)
  const [rollingCommissionPopup, setRollingCommissionPopup] = useState(false);

  profileData = [
    {
      key: "name",
      value: profile?.user_id || "demo8956",
    },
    {
      key: "commission",
      value: profile?.match_commission || "0",
      icon: "editCommission",
    },
    {
      key: "rollingCommission",
      value: profile?.session_commission || "0",
      icon: "editRollingCommission",
    },
    {
      key: "currency",
      value: "IRP",
    },
    {
      key: "exposure",
      value: profile?.min_sports_exp,
      icon: "editExposure",
    },
    {
      key: "mobileNumber",
      value: profile?.supplier_mobile || "Not found",
      icon: "editMobileNumber",
    },
    {
      key: "password",
      value: "**********",
      icon: "editPassword",
    },
  ];

  const handleClick = (clickContent) => {
    switch (clickContent) {
      case "editCommission": setCommissionPopup(true);
        return;
      case "editRollingCommission": setRollingCommissionPopup(true);
        return;
      case "editExposure": setExposurePopup(true);
        return;
      case "editMobileNumber": setMobilePopup(true);
        return;
      case "editPassword": setPasswordPopup(true);
        return;
    }
  };

  const onClose = () => {
    setCommissionPopup(false);
    setPasswordPopup(false);
    setMobilePopup(false)
    setExposurePopup(false);
  };

  return (
    <div className="bg-white w-full">
      <div className="bg-gray-800 text-white p-4 font-bold">
        Account Details
      </div>
      <div className="divide-y">
        {profileData.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row p-4 border-b">
            <div className="font-semibold w-full sm:w-1/4 mb-2 sm:mb-0">
              {formatLabel(item.key)}
            </div>
            <div className="w-full sm:w-3/4 flex items-center gap-2">
              <span>{item.value}</span>
              {item.icon && (
                <div className="flex items-center space-x-2">
                  <FaRegEdit onClick={() => handleClick(item.icon)} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
     

      {commissionPopup && <CommissionModal onClose={onClose} user_id={_id} setProfile={setProfile} setCommissionPopup={setCommissionPopup}/>}

      {rollingCommissionPopup && <RollingCommissionModal onClose={onClose} user_id={_id} setProfile={setProfile} setRollingCommissionPopup={setRollingCommissionPopup}/>}
      
      {passwordPopup &&  <PasswordModal onClose={onClose} user_id={_id} setProfile={setProfile} setPasswordPopup={setPasswordPopup}/>}

      {mobilePopup && <MobileModal onClose={onClose} user_id={_id} setProfile={setProfile} setMobilePopup={setMobilePopup}/>}

      {exposurePopup && <ExposureModal name={profile?.user_id } curntValue={profile?.min_sports_exp} onClose={onClose} user_id={_id} setProfile={setProfile} setExposurePopup={setExposurePopup}/>}
    </div>
  );
};

export default AccountDetails;