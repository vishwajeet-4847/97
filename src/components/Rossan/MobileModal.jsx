import axios from "axios";
import { Eye } from "lucide-react";
import React, { useState } from "react";

const MobileModal = ({ onClose, user_id, setProfile, setMobilePopup }) => {
  // Initial sports data with checked status
  const [eyeClicked, setEyeClicked] = useState(false);
  const [formData, setFormData] = useState({
    mobileNum: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const result = await axios.post(
        "https://admin.titan97.live/Apicall/update_users_profile",
        {
          user_id: user_id,
          supplier_mobile: formData.mobileNum,
        }
      );
      console.log(result);
      setProfile((prev) => ({ ...prev, supplier_mobile:formData.mobileNum }))

    } catch (error) {
      console.log(error);
      alert('something went wrong');
    }finally{
      setMobilePopup(false)
    }
  };

  return (
    <div className={`fixed inset-0 p-2 flex  justify-center top-0 z-20`}>
      <div className="w-full max-w-lg h-fit bg-white shadow-lg rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 text-white px-4 py-3">
          <h2 className="text-lg font-bold">Change Mobile Number</h2>
          <button className="text-xl font-bold" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto px-4 py-6 text-lg">
          <div className="mb-6 relative">
            <h2>
              Your Password<span className="text-red-500">*</span>
            </h2>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Your Password.."
              className={`px-3 py-2 border border-gray-400 outline-none w-full rounded-md text-lg ${
                eyeClicked && "hidden"
              }`}
            />
            <input
              type="text"
              name="password"
              placeholder="Your Password.."
              onChange={handleChange}
              value={formData.password}
              className={`px-3 py-2 border border-gray-400 outline-none w-full rounded-md text-lg ${
                !eyeClicked && "hidden"
              }`}
            />
            <Eye
              className="absolute top-1/2 right-2"
              onClick={() => {
                setEyeClicked((prev) => !prev);
              }}
            />
          </div>

          <div className="mb-6">
            <h2>
              Mobile Number<span className="text-red-500">*</span>
            </h2>
            <input
              name="mobileNum"
              type="text"
              onChange={handleChange}
              value={formData.mobileNum}
              placeholder="Mobile Number"
              className="px-3 py-2 border border-gray-400 outline-none w-full rounded-md text-lg"
            />
          </div>

          <div className="flex justify-end items-center gap-3">
            <button
              onClick={handleClick}
              className="bg-gray-500 rounded-sm px-4 py-2 text-white font-semibold"
            >
              Yes
            </button>
            <button className="bg-gray-500 rounded-sm px-4 py-2 text-white font-semibold">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileModal;
