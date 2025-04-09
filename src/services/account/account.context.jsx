import { createContext, useContext, useEffect, useState } from "react";
import { 
  createChildAccount, 
  getDownLineData, 
  deleteUser, 
  getPartnershipDetails, 
  getProfitLoss, 
  getProfile ,
  insertInWallet,
  getIRP,
  getProfitLossMatchwise,
  getBetDetails,
  getUniqueBetDetails,
  getProfitLossByGtype,
  getAccountsStatementData 
  
} from "./account.service";
import { AuthContext } from "../auth/auth.context";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [createdChildStatus, setCreatedChildStatus] = useState(null);
  const [deletedUserStatus, setDeletedUserStatus] = useState(null);
  const [walletTransactionStatus, setWalletTransactionStatus] = useState(null);
  const [ IRP , setIRP ] = useState(null);
  const [downlineData, setDownlineData] = useState([]);
  const [profile, setProfile] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);
  const [partnershipDetails, setPartnershipDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const { user } = useContext(AuthContext);
  
  // Create Child Account
  const onCreateChild = async (childData) => {
    setLoading(true);
    setError(null);
    setCreatedChildStatus(null);
    
    

    try {
      const response = await createChildAccount(childData);
      if (response.status !== "success") {
        throw new Error(response.message || "Failed to create child");
      }
      setCreatedChildStatus(response.message);
      return response.message;
    } catch (error) {
      console.error("Failed to create child:", error.response?.data || error.message);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Downline Data
  const onGetDownLineData = async (user_id, user_type) => {
    setLoading(true);
    setError(null);
    setDownlineData([]);
    

    try {
      const response = await getDownLineData(user_id, user_type);
      if (response) {
        setDownlineData(response.users || []); 
      } else {
        throw new Error(response.message || "No users found.");
      }
    } catch (error) {
      console.error("Failed to get downline data:", error.message);
      setDownlineData([]);
      setError(error.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const onDeleteUser = async (userId) => {
    setLoading(true);
    setError(null);
    setDeletedUserStatus(null);
  
    try {
      const response = await deleteUser(userId);
      
      if (!response || typeof response !== "object") {
        throw new Error("Invalid server response. Please try again.");
      }
  
      if (response.status !== "success") {
        throw new Error(response.message || "Failed to delete user");
      }
  
      // Remove user from state
      setDownlineData((prevData) => prevData.filter(user => user.user_id !== userId));
  
      // Store success message
      setDeletedUserStatus({ success: true, message: response.message });
      
      
      console.log("User deleted successfully:", response.message);
      
      return response.message;
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "An error occurred";
  
      console.error("Failed to delete user:", errorMessage);
  
      // Store error message
      setDeletedUserStatus({ success: false, message: errorMessage });
      setError(errorMessage);
     
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch User Profile
  const onGetProfile = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getProfile(userId);
      if (!response) {
        throw new Error("Failed to fetch profile.");
      }
      setProfile(response);
    } catch (error) {
      console.error("Failed to fetch profile:", error.response?.data || error.message);
      setProfile(null);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Profit/Loss Data
  const onGetProfitLoss = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getProfitLoss(userId);
      if (!response) {
        throw new Error("Failed to fetch profit/loss data.");
      }
      setProfitLoss(response);
    } catch (error) {
      console.error("Failed to fetch profit/loss data:", error.response?.data || error.message);
      setProfitLoss(null);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Partnership Details
  const onGetPartnershipDetails = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getPartnershipDetails(userId);
      if (!response) {
        throw new Error("Failed to fetch partnership details.");
      }
      setPartnershipDetails(response);
    } catch (error) {
      console.error("Failed to fetch partnership details:", error.response?.data || error.message);
      setPartnershipDetails(null);
      setError(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const onInsertInWallet = async (transactionData) => {
    setLoading(true);
    setError(null);
    setWalletTransactionStatus(null);
    console.log(transactionData);
    
  
    try {
      const response = await insertInWallet(transactionData);
      
      // Debugging log
      // console.log("Wallet Insert Response:", response);
  
      if (!response || typeof response !== "object") {
        throw new Error("Invalid server response. Please try again.");
      }
  
      if (response.status !== "success") {
        throw new Error(response.message || "Transaction failed");
      }
  
      // Store success message
      setWalletTransactionStatus({ success: true, message: response.message });
  
  

      return response.message;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
  
      console.error("Transaction failed:", errorMessage);
  
      // Store error message
      setWalletTransactionStatus({ success: false, message: errorMessage });
      setError(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };


  // to get irp for header

  const onGetIRP = async (user_id) => {
    setLoading(true);
    setError(null);
    try{
    const response = await getIRP(user_id);
    if (!response.status) {
        throw new Error("Couldn't find IRP for " + user_id)
      
    }
   
    
    setIRP(response.data);
    setLoading(false);
    

  }catch (e) {
    console.error("Error fetching IRP:", e.message);
    setError(e.message);

    setLoading(false);
    return null;
  }
  finally{
    setLoading(false);
  }
}

// Get Bet Details
const onGetBetDetails = async (userId, gtype, match_id, identifier) => {
  setLoading(true);
  setError(null);
  try {
    const betDetails = await getBetDetails({ userId, gtype, match_id, identifier });
    return betDetails;
  } catch (error) {
    console.error("Failed to fetch bet details:", error.message);
    setError(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};

// Get Unique Bet Details
const onGetUniqueBetDetails = async (userId, fromdate, todate, gtype, match_id) => {
  setLoading(true);
  setError(null);
  try {
    const uniqueBetDetails = await getUniqueBetDetails({ userId, fromdate, todate, gtype, match_id });
    setLoading(false);
    return uniqueBetDetails;
  } catch (error) {
    console.error("Failed to fetch unique bet details:", error.message);
    setError(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};

// Get Profit/Loss By Gtype
const onGetProfitLossByGtype = async (userId, fromdate, todate) => {
  setLoading(true);
  setError(null);
  try {
    const profitLossData = await getProfitLossByGtype({ userId, fromdate, todate });
    setLoading(false);
    return profitLossData;
  } catch (error) {
    console.error("Failed to fetch profit/loss by gtype:", error.message);
    setError(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};

// Get Profit/Loss Matchwise
const onGetProfitLossMatchwise = async (userId, fromdate, todate, gtype) => {
  setLoading(true);
  setError(null);
  console.log(userId, fromdate, todate, gtype);
  
  try {
    const matchwiseData = await getProfitLossMatchwise({ userId, fromdate, todate, gtype });
    return matchwiseData;
  } catch (error) {
    console.error("Failed to fetch profit/loss matchwise:", error.message);
    setError(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};


const onGetAccountsStatementData = async (userId, fromDate, toDate) => {
  setLoading(true);
  setError(null);

  try {
    const data = await getAccountsStatementData ({userId, fromDate, toDate });
    console.log(data);
    
    return data.wallet_records;
  } catch (error) {
    console.error("Failed to fetch accounts data:", error.message);
    setError(error.message);
    return null;
  } finally {
    setLoading(false);
  }
};

useEffect(()=>{
  if(user){
    
    
    
    onGetIRP(user.user_id);
  }
 
},[user])

  
  return (
    <AccountContext.Provider value={{
      onCreateChild, 
      createdChildStatus, 
      loading, 
      error, 
      setCreatedChildStatus, 
      downlineData, 
      onGetDownLineData, 
      onDeleteUser, 
      deletedUserStatus,
      setDeletedUserStatus,
      profile, 
      onGetProfile, 
      profitLoss, 
      onGetProfitLoss, 
      partnershipDetails, 
      onGetPartnershipDetails,
      onInsertInWallet,  
      walletTransactionStatus,
      setWalletTransactionStatus,
     IRP,
     onGetBetDetails,
     onGetUniqueBetDetails,
     onGetProfitLossByGtype,
     onGetProfitLossMatchwise,
     onGetAccountsStatementData
     
    }}>
      {children}
    </AccountContext.Provider>
  );
};
