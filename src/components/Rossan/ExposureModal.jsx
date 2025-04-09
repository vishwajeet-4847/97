import axios from "axios";
import { Eye } from "lucide-react";
import React, { useState } from "react";

const ExposureModal = ({ onClose, name, curntValue,user_id, setProfile, setExposurePopup }) => {
  // Initial sports data with checked status
  const [eyeClicked, setEyeClicked] = useState(false);
  const [formData, setFormData] = useState({
    exposure: "",
    password: "",
  });
  console.log(user_id);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user_id);
    try{
      const result= await axios.post('https://admin.titan97.live/Apicall/update_users_profile', {
        user_id: user_id,
        min_sports_exp: formData.exposure
    });
    setProfile((prev) => ({ ...prev, min_sports_exp:formData.exposure }))
    console.log(result.data);
    }catch(error){
      console.log(error);
      alert('something went wrong!');
    }finally{
      setExposurePopup(false);
    }
  };

  return (
    <div className={`fixed inset-0 p-2 flex  justify-center top-0 z-20`}>
      <div className="w-full max-w-lg h-fit bg-white shadow-lg rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 text-white px-4 py-3">
          <h2 className="text-lg font-bold">Edit Exposure Limit-{name}</h2>
          <button className="text-xl font-bold" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="overflow-auto px-4 py-6 text-lg">
          <div>
            <h2 className="font-light text-sm">current</h2>
            <p className="text-sm">{curntValue}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2>New</h2>
              <input
                name="exposure"
                type="text"
                onChange={handleChange}
                value={formData.exposure}
                className="px-3 py-2 border border-gray-400 outline-none w-full rounded-md text-lg"
              />
            </div>
            <div className="mb-6 relative">
              <h2>Password</h2>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                className={`px-3 py-2 border border-gray-400 outline-none w-full rounded-md text-lg ${
                  eyeClicked && "hidden"
                }`}
              />
              <input
                type="text"
                name="password"
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

            <div className="flex justify-end items-center gap-3">
              <button
                type="submit"
                className="bg-gray-500 rounded-sm px-4 py-2 text-white font-semibold"
              >
                Submit
              </button>

              <button
                type="button"
                className="bg-gray-500 rounded-sm px-4 py-2 text-white font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExposureModal;
