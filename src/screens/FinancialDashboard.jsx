import React, { useContext, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import DataTable from "../components/table/DataTable";
import FinancialSummary from "../components/FinancialSUmmary";
import { AuthContext } from "../services/auth/auth.context";
import { Navigate, useLocation, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddMasterModal from "../components/Modal/create-user/AddMasterModal";
import ToggleSwitch from "../components/ToggleSwipeSwitch";
import { AccountContext } from "../services/account/account.context";
import { sortData, paginateData, filterData } from "../utils/table";
import { getFinancialCol } from "../utils/columns";
import CreditModal from "../components/Modal/credit/CreditModal";

import { getDownLineData } from "../services/account/account.service";

import {
  getButtonTitle,
  getUserType,
  getUserTypeCode,
} from "../utils/user_type_converter";
import UserStatusManagement from "../components/Rossan/UserStatusManagement";
import axios from "axios";
import { useRef } from "react";


const FinancialDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isSummaryChecked, setIsSummaryChecked] = useState(false);

  const [isNested, setIsNested] = useState(false);

  const location = useLocation();
  const previousKeyRef = useRef(location.key);
  const userRoute = location.pathname.split("/").pop();

  // for display the data of that user type
  const buttonTitle = getButtonTitle(userRoute);
  const userTypeCode = getUserTypeCode(userRoute);

  // financial summary data
  const [data, setData] = useState({
    totalBalance: 0,
    totalExposure: 0,
    availableBalance: 0,
    balance: 0,
    totalAvailableBalance: 0,
    uplinePL: 0,
  });

  const { user } = useContext(AuthContext);
  const {
    onCreateChild,
    error,
    downlineData,
    onGetDownLineData,
    setDeletedUserStatus,
    deletedUserStatus,
    onDeleteUser,
  } = useContext(AccountContext);

  const handleSubmit = async (formData) => {
    try {
      const responseData = await onCreateChild({
        ...formData,
        parent_id: user.user_id,
      });

      if (responseData) {
        setIsModalOpen(false);
        toast.success("Child account created successfully!");
      } else {
        toast.error(error || "Failed to create child account");
      }
    } catch (err) {
      toast.error("Failed to create child account", err);
    }
  };

  useEffect(() => {
    const getIprData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const result = await axios.post(
          "https://admin.titan97.live/Apicall/myprofile",
          { user_id: user.user_id }
        );
        setData({
          totalBalance: result.data.balance,
          totalExposure: result.data.bet_balance,
          availableBalance: result.data.balance-result.data.bet_balance,
          balance: 0,
          totalAvailableBalance: 0,
          uplinePL: 0,
        })
      } catch (error) {
        console.log(error);
      }
    };

    getIprData();
  }, []);

  useEffect(() => {
    if (deletedUserStatus) {
      if (deletedUserStatus.success) {
        toast.success(deletedUserStatus.message);
      } else {
        toast.error(deletedUserStatus.message);
      }
      setTimeout(setDeletedUserStatus(null), 1000);
    }
  }, [deletedUserStatus, setDeletedUserStatus]);

  useEffect(() => {
    const fetchDownLineData = async () => {
  
      if (user?.user_id && !isNested) {
        try {
          await onGetDownLineData(user.user_id, userTypeCode);

        } catch (error) {
          console.error("Error fetching downline data:", error);
        }
      }
    };

    fetchDownLineData();
  }, [user?.user_id, userTypeCode, isNested]);
  useEffect(() => {
    if (location.key !== previousKeyRef.current) {
      // user navigated back or to a different page
      setIsNested(false);
      previousKeyRef.current = location.key;
    }
  }, [location.key]);
  useEffect(() => {
    if (downlineData) {
      setUsers(downlineData);
    }
  }, [downlineData]);

  const userNow = getUserType(user?.user_type);

  // Table State
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [gr, setGr] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("username");
  const [sortDirection, setSortDirection] = useState("asc");

  // testing
  const [selectedUserId, setSelectedUserId] = useState(null);
  let actionsConfig;

  if (!isNested) {
    actionsConfig = {
      payment: {
        icon: "DollarSign",
        onClick: (row) => handlePayment(row),
        color: "gray",
      },
      swap: {
        icon: "ArrowUpDown",
        onClick: (row) => gotoarrow(row),
        color: "gray",
      },
      profile: {
        icon: "User",
        onClick: (row) => console.log("Profile:", row),
        color: "gray",
      },
      something: {
        icon: "GrSchedulePlay",
        onClick: (row) => handlePlay(row),
        color: "gray",
      },
      settings: {
        icon: "Settings",
        onClick: (row) => handleGrStatus(row.fs_id),
        color: "gray",
      },
      // lock: { icon: "Lock", onClick: (row) => console.log("Lock:", row), color: "gray" },
      delete: {
        icon: "Trash2",
        onClick: (row) => handleDeleteUser(row.fs_id),
        color: "red",
      },
      vpnlock: {
        icon: "MdOutlineVpnLock",
        onClick: (row) => console.log("Lock:", row),
        color: "gray",
      },
    };
  } else {
    actionsConfig = {
      swap: {
        icon: "ArrowUpDown",
        onClick: (row) => console.log("Profile:", row),
        color: "gray",
      },
      profile: {
        icon: "User",
        onClick: (row) => console.log("Profile:", row),
        color: "gray",
      },
      something: {
        icon: "GrSchedulePlay",
        onClick: (row) => console.log("Lock:", row),
        color: "gray",
      },
    };
  }

  // Function to handle user deletion
  const handleDeleteUser = async (user_id) => {
    await onDeleteUser(user_id);
    await getDownLineData(user.user_id, userTypeCode);
  };

  const handlePayment = (row) => {
    setSelectedUserId(row);
    setIsCreditModalOpen(true);
  };
  const handleGrStatus = (row) => {
    setSelectedUserId(row);
    setGr(true);
  };
  const FINANCIAL_DASHBOARD_COL = getFinancialCol(actionsConfig);

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // **Apply Filtering, Sorting, and Pagination in Sequence**
  const filteredUsers = filterData(users, searchTerm);
  const sortedUsers = sortData(filteredUsers, sortField, sortDirection);
  const { paginatedData: currentUsers, totalPages } = paginateData(
    sortedUsers,
    currentPage,
    entriesPerPage
  );
  const handlePlay = (row) => {
    navigate(`/account/${row.fs_id}`, { state: { value: "accountStatement" } });
  };
  const gotoarrow = (row) => {
    navigate('/my-account', {
      state: {
        userData: row,
      },
    });
  };
  return (
    <>

      {/* <div className="bg-gray-100 p-1 min-h-screen">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="light"
          bodyClassName="text-sm sm:text-base"
        />
        <div className="bg-white rounded-lg shadow-md p-6"> */}
          {/* Top Action Buttons */}
          {/* <div className="flex justify-end mb-4">
            {userNow !== "User" && (
              <>
                <div className="flex justify-center items-center mr-4">
                  <span>Chips Summary</span>
                  <ToggleSwitch
                    isChecked={isSummaryChecked}
                    setIsChecked={() => setIsSummaryChecked(!isSummaryChecked)}
                  />
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 flex items-center"
                >
                  <FaUser className="mr-2" /> Add {buttonTitle}
                </button>
              </>
            )}
            <button
              onClick={() => setUsers([...downlineData])}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded"
              title="Refresh"
            >
              <FiRefreshCw />
            </button>
          </div> */}

          {/* Summary Cards */}
          {/* <FinancialSummary data={data} /> */}
          
            
    <div className="bg-gray-100 min-h-screen">
     
     <ToastContainer position="top-center" autoClose={5000} theme="light"  bodyClassName="text-sm sm:text-base"/>
     <div className=" rounded-lg shadow-md p-6">
       <div className="flex justify-end mb-4">
         {userNow !== "User" && (
           <>
             <div className="flex justify-center items-center mr-4">
               <span style={{fontSize: "10px", fontWeight: "bold"}}>Chips Summary &nbsp;</span>
               <ToggleSwitch
                 
                 isChecked={isSummaryChecked}
                 setIsChecked={() => setIsSummaryChecked(!isSummaryChecked)}
               />
             </div>
             <button
               style={{fontWeight: "bold", fontSize: "12px", padding: "8px"}}
               onClick={() => setIsModalOpen(true)}
               className="bg-gray-400 hover:bg-gray-300 text-black-700 rounded mr-2 flex items-center"
             >
               <FaUser className="mr-2" /> Add {buttonTitle}
             </button>
           </>
         )}
         <button
           onClick={() => setUsers([...downlineData])}
           className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded"
           title="Refresh"
         >
           <FiRefreshCw />
         </button>
       </div>
       <FinancialSummary data={data} />
      

          {/* Table */}
          <DataTable
            columns={FINANCIAL_DASHBOARD_COL}
          
            data={currentUsers}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            searchQuery={searchTerm}
            setSearchQuery={setSearchTerm}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={setCurrentPage}
            userTypeCode={userTypeCode}
            setIsNested={setIsNested}
            isNested={isNested}
          />
        </div>
        <AddMasterModal
          title={buttonTitle}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />

        <CreditModal
          isOpen={isCreditModalOpen}
          onClose={() => setIsCreditModalOpen(false)}
          selectedUserId={selectedUserId}
          userTypeCode={userTypeCode}
        />
      </div>
      {gr ? <UserStatusManagement setGr={setGr} /> : null}
    </>
  );
};

export default FinancialDashboard;
