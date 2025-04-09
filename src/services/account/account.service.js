import axios from "axios";

export const createChildAccount = async ({ userType , parent_id ,username, trade_name="Test Trade", password, commission = "5", partner = "10", partnershipCasino = "15", partnershipLiveTennPatti = "20", scom_man = "3" }) => {
  console.log(userType , parent_id , username , password , commission , partner ,partnershipCasino , partnershipLiveTennPatti,scom_man);
  
    
  try {
        const userData = {
          user_type:userType,
            parent_id,
            username,
            trade_name,
            password,
            commission,
            partner,
            partnershipCasino,
            partnershipLiveTennPatti,
            scom_man
        };
        console.log(userData);
        

      
        

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://admin.titan97.live/Apicall/createChild',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'ci_session=hdr235c62fiigo74mtm8s6f3cbqctqj0'
            },
            data: JSON.stringify(userData)
        };
        
        const response = await axios.request(config);
        
        return response.data;
    } catch (error) {
        console.error('Error creating child account:', error);
        throw error;
    }
}





export const getDownLineData = async (user_id, user_type) => {
   
    try {
        const response = await axios.post("https://admin.titan97.live/Apicall/get_user_downline",{user_id:user_id, user_type:user_type});
       

        if (response.data.status !== "success") {
            throw new Error(response.data.message || "Failed to get downline data");
        }
      

        return response.data; // Ensure it returns an array
    } catch (error) {
        console.error("Error getting downline data:", error.response?.data || error.message);
        throw error;
    }
};


export const deleteUser = async (userId) => {
    try {
      const response = await axios.post("https://admin.titan97.live/Apicall/deleteUser", {
        user_id: userId, 
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  console.log(response);
  
      return response.data
    } catch (error) {
      console.error("Error deleting user:", error.response ? error.response.data : error.message);
    }
  };


export  const getProfile = async (userId) => {
    try {
      const response = await axios.post("https://admin.titan97.live/Apicall/myprofile", {
        user_id: userId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log("Profile Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
    }
  };

export  const getProfitLoss = async (userId) => {
    try {
      const response = await axios.post("https://admin.titan97.live/Apicall/profitloss", {
        user_id: userId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log("Profit/Loss Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching profit/loss data:", error.response?.data || error.message);
    }
  };

export  const getPartnershipDetails = async (userId) => {
    try {
      const response = await axios.post("https://admin.titan97.live/Apicall/getPartnershipDetails", {
        user_id: userId
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log("Partnership Details:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching partnership details:", error.response?.data || error.message);
    }
  };

  export const insertInWallet = async (transactionData) => {

    console.log(transactionData);
    
    try {
      const response = await axios.post("https://admin.titan97.live/Apicall/insertinWalletAPI", 
       transactionData
      );
  
      if (response.data.status === "success") {
        console.log("Transaction successful:", response.data);
        return response.data;
        
      } else {
        throw new Error(response.data.message || "Transaction failed");
      }
    } catch (error) {
      console.error("Transaction error:", error.response?.data || error.message);
      throw error;
    }
  };


export const getIRP = async (user_id)=>{

    try {
      const response = await axios.post("https://admin.titan97.live/Apicall/getallbal", {
        userId: user_id
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

     
      return response.data;
    } catch (error) {
        console.error("Error fetching IRP data:", error.response?.data || error.message);
    
        throw error;
    }
}


export const getBetDetails = async ({ userId, gtype, match_id, identifier }) => {
  try {
    const response = await axios.post('https://admin.titan97.live/Apicall/allbetsdetails', {
      userId,
      gtype,
      match_id,
      identifier
    });

    const betDetails = response.data.bet_details;
    console.log('Bet Details:', betDetails);
    return betDetails;

  } catch (error) {
    console.error('Error fetching bet details:', error);
    return null;
  }
};


export const getUniqueBetDetails = async ({ userId, fromdate, todate, gtype, match_id }) => {
  try {
    const response = await axios.post('https://admin.titan97.live/Apicall/uniquebetdetails', {
      userId,
      fromdate,
      todate,
      gtype,
      match_id
    });
console.log(response);

    const betDetails = response.data.bet_details;
    console.log('Unique Bet Details:', betDetails);
    return betDetails;

  } catch (error) {
    console.error('Error fetching unique bet details:', error);
    return null;
  }
};


export const getProfitLossByGtype = async ({ userId, fromdate, todate }) => {
  try {
    const response = await axios.post('https://admin.titan97.live/Apicall/profitlossgtype', {
      userId,
      fromdate,
      todate
    });

    console.log('Profit/Loss Response:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching profit/loss by gtype:', error);
    return null;
  }
};

export const getProfitLossMatchwise = async ({ userId, fromdate, todate, gtype }) => {
  try {
    const response = await axios.post('https://admin.titan97.live/Apicall/profitlossmatchwise', {
      userId,
      fromdate,
      todate,
      gtype
    });

    console.log('Profit/Loss Matchwise Response:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching profit/loss matchwise:', error);
    return null;
  }
};

// paswword chnage api 

export const getAccountsStatementData = async ({ userId, fromDate, toDate }) => {
  try {
    const response = await axios.post("https://admin.titan97.live/Apicall/accounts", {
      userId,
      fromDate,
      toDate,
    });

    console.log("Accounts Data Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts data:", error);
    return null;
  }
};