import React, { useState } from 'react';

import RadioBtn from './RadioBtn';

const SportsSettingsModal = ({onClose}) => {
  // Initial sports data with checked status
  const [sports, setSports] = useState([
    { id: 1, name: 'Cricket', checked: true },
    { id: 2, name: 'Casino', checked: true },
    { id: 3, name: 'Tennis', checked: true },
    { id: 4, name: 'Soccer', checked: false },
    { id: 5, name: 'Horse Racing', checked: false },
    { id: 6, name: 'Greyhound Racing', checked: false },
    { id: 7, name: 'Basketball', checked: false },
    { id: 8, name: 'Lottery', checked: false },
  ]);


  // Toggle sport selection
  const toggleSport = (id) => {
    setSports((prevSports) =>
      prevSports.map((sport) =>
        sport.id === id ? { ...sport, checked: !sport.checked } : sport
      )
    );
  };

  return (
    <div className="fixed inset-0 p-2 flex  justify-center top-0 z-20">

      <div className="w-full max-w-lg h-[430px] bg-white shadow-lg rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 text-white px-4 py-3">
          <h2 className="text-lg font-bold">Sports Settings</h2>
          <button className="text-xl font-bold" onClick={onClose}>&times;</button>
        </div>
        
        {/* Table */}
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left w-16">SrNo.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Sport Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left w-24">Action</th>
              </tr>
            </thead>
            <tbody>
              {sports.map((sport) => (
                <tr key={sport.id}>
                  <td className="border border-gray-300 px-4 py-2">{sport.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{sport.name}</td>
                  <td className="border border-gray-300 px-4 py-2">

                   { /* <div 

                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                        sport.checked ? 'bg-blue-900' : 'bg-gray-300'
                      }`}
                      onClick={() => toggleSport(sport.id)}
                    >
                      <div
                        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
                          sport.checked ? 'translate-x-6' : ''
                        }`}
                      ></div>

                    </div>

                    </div> */}

                    <RadioBtn 
                    isChecked={sport.checked}
                    setIsChecked={() => toggleSport(sport.id)}
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SportsSettingsModal;