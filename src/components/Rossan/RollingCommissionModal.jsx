import axios from "axios";
import { Eye } from "lucide-react";
import React, { useState } from "react";

const RollingCommissionModal = ({ onClose, user_id, setProfile, setRollingCommissionPopup }) => {
  // Initial sports data with checked status
  const [eyeClicked2, setEyeClicked2] = useState(false);

  const [formData, setFormData] = useState({
    fancy:"",
    matka:"",
    casino:"",
    sportBook:"",
    bookMaker: "",
    virtualSports: "",
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
          match_commission: formData.fancy
        }
      );
      console.log(result);
      setProfile((prev) => ({ ...prev, session_commission:formData.fancy }))
    } catch (error) {
      console.log(error);
      alert('something went wrong');
    }finally{
        setRollingCommissionPopup(false)
    }
  };

  return (
    <div
      className={`fixed inset-0 p-2 flex  justify-center top-0 z-20}`}
    >
      <div className="w-full max-w-lg h-fit bg-white shadow-lg rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 text-white px-4 py-3">
          <h2 className="text-lg font-bold">Change Password</h2>
          <button className="text-xl font-bold" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto px-4 py-6 text-lg">
          <div className="mb-4 relative">
            <h2>
              Fancy<span className="text-red-500">*</span>
            </h2>
            <input
              name="fancy"
              type="text"
              onChange={handleChange}
              value={formData.fancy}
              placeholder="0"
              className={`px-3 py-1 border border-gray-400 outline-none w-full rounded-md text-lg`}
            />
            
          </div>

          <div className="mb-4 relative">
            <h2>
              Matka<span className="text-red-500">*</span>
            </h2>
            <input
              name="matka"
              type="text"
              onChange={handleChange}
              value={formData.matka}
              placeholder="0"
              className={`px-3 py-1 border border-gray-400 outline-none w-full rounded-md text-lg`}
            />
          </div>

          <div className="mb-4 relative">
            <h2>
              Casino<span className="text-red-500">*</span>
            </h2>
            <input
              name="casino"
              type="text"
              onChange={handleChange}
              value={formData.casino}
              placeholder="0"
              className={`px-3 py-1 border border-gray-400 outline-none w-full rounded-md text-lg`}
            />
          </div>

          <div className="mb-4 relative">
            <h2>
              Sportbook<span className="text-red-500">*</span>
            </h2>
            <input
              name="sportBook"
              type="text"
              onChange={handleChange}
              value={formData.sportBook}
              placeholder="0"
              className={`px-3 py-1 border border-gray-400 outline-none w-full rounded-md text-lg`}
            />
          </div>

          <div className="mb-4 relative">
            <h2>
              Bookmaker<span className="text-red-500">*</span>
            </h2>
            <input
              name="bookMaker"
              type="text"
              onChange={handleChange}
              value={formData.bookMaker}
              placeholder="0"
              className={`px-3 py-1 border border-gray-400 outline-none w-full rounded-md text-lg`}
            />
          </div>

          <div className="mb-4 relative">
            <h2>
              Virtual Sports<span className="text-red-500">*</span>
            </h2>
            <input
              name="virtualSports"
              type="text"
              onChange={handleChange}
              value={formData.virtualSports}
              placeholder="0"
              className={`px-3 py-1 border border-gray-400 outline-none w-full rounded-md text-lg`}
            />
          </div>


          <div className="mb-4 relative">
            <h2>
            Password<span className="text-red-500">*</span>
            </h2>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="New Password.."
              className={`px-3 py-1 border border-gray-400 outline-none w-full rounded-md text-lg ${
                eyeClicked2 && "hidden"
              }`}
            />
            <input
              type="text"
              name="password"
              placeholder="0"
              onChange={handleChange}
              value={formData.password}
              className={`px-3 py-1 border border-gray-400 outline-none w-full rounded-md text-lg ${
                !eyeClicked2 && "hidden"
              }`}
            />
            <Eye
              className="absolute top-1/2 right-2"
              onClick={() => {
                setEyeClicked2((prev) => !prev);
              }}
            />
          </div>

          <div className="flex justify-end items-center gap-3">
            <button onClick={handleClick} className="bg-gray-500 rounded-sm px-4 py-1.5 text-white font-semibold">
              Submit
            </button>
            <button className="bg-gray-500 rounded-sm px-4 py-1.5 text-white font-semibold">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollingCommissionModal;