const Sidebar = ({ items, activeTab, setActiveTab }) => {
    return (
      <div className="w-full p-4 md:w-64">
        <div className="bg-gray-800 text-white px-4 py-2 font-bold">My Account</div>
        <ul className="divide-y bg-white divide-gray-200">
          {items.map(({ key, label }) => (
            <li key={key}>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  activeTab === key ? 'bg-[#d1ddef]' : ''
                }`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Sidebar;