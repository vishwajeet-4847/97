import { NavLink } from 'react-router';

const Sidebar2 = ({ items }) => {
  return (
    <div className="w-full p-4 md:w-64">
      <div className="bg-gray-800 text-white px-4 py-2 font-bold">My Account</div>
      <ul className="divide-y bg-white divide-gray-200">
        {items.map(({ key, label, path }) => (
          <li key={key}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `w-full block px-4 py-2 text-left hover:bg-gray-100 transition ${
                  isActive ? 'bg-[#d1ddef] font-medium' : ''
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar2;