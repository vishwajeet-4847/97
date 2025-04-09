import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router";
import DataTable from "./table/DataTable";
import { formatDate } from "../utils/formatters";
import { USER_BETS_DETAILS_COL, USER_MATCH_DETAILS_COL, USER_MATCH_DETAILS_GAME_COL, USER_MATCH_DETAILS_GAMENAME_COL } from "../utils/columns";

import { NavigationTableCompo } from "./Modal/UserMatchDetails/NavigationLink";
import DateRangePicker from "./DateRangePicker";
import { AccountContext } from "../services/account/account.context";
import LoadingSpinner from "./LoadingSpinner";


const UserMatchDetails = () => {
  // const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [startDate, setStartDate] = useState("2025-04-01");
// const [endDate, setEndDate] = useState(formatDate(new Date()));
const [endDate, setEndDate] = useState("2025-04-02");
const [entriesPerPage , setEntriesPerPage] = useState(10);
const [ uniqueBet , setUniqueBet ] = useState(null);
const [allBetDetails , setallBetDetails] = useState(null);
const [profitLossGtype , setProfitLossGtype ] = useState(null);
const [profitLossMatchwise , setProfitLossMatchwise] = useState(null);
const navigate = useNavigate();
const location = useLocation();
  const [searchParams] = useSearchParams();
  console.log(searchParams.toString());
  const  { userData , value } = location.state || {};
  const  {
    onGetBetDetails,
    onGetUniqueBetDetails,
    onGetProfitLossByGtype,
    onGetProfitLossMatchwise,
    loading
    
  } = useContext(AccountContext);

  
  // Get values from query parameters
  const m = searchParams.get("m");
  const e = searchParams.get("e");
  const ma = searchParams.get("ma");

  console.log(m, e, ma, "sakdalfknas");

  // useEffect(() => {
  //   if (!userData) {
  //     navigate("/list/agent"); // Go back to the previous page if userData is not available
  //   }
  //   // userData.user_id replace it with true one on finction

  //   if (m) {
  //     const profitLossMatchwise = onGetProfitLossMatchwise("2", startDate, endDate , m);
  //     console.log(profitLossMatchwise, "profitLossMatchwise");
  //     setProfitLossMatchwise(profitLossMatchwise);
      
  //   }
  //   const fetchData = async () => {
  //     const  profitLossGtype = await onGetProfitLossByGtype("2", startDate, endDate);
  //     console.log(profitLossGtype, "profitLossGtype");
  //     const profitLossMatchwise = await onGetProfitLossMatchwise("2", startDate, endDate);
  //     console.log(profitLossMatchwise, "profitLossMatchwise");
      
  //     setProfitLossGtype(profitLossGtype);
  //   };
  //   fetchData();
  // }, []);
 // const userId = userData?.user_id;
 const userId = "2"; // Replace with the actual user ID from userData
 const fetchPandL = async () => {
  if (!userData) {
    navigate("/list/agent");
    return;
  }

  const startDateD = formatDate(new Date(startDate));
  const endDateD = formatDate(new Date(endDate));

  try {
    if (m && e && ma) {
      const bets = await onGetBetDetails(userId, m, e, ma);
      setallBetDetails(bets);
      return;
    }

    if (m && e && !ma) {
      const matchID = m === "Casino" ? 0 : e;
      const uniqueBets = await onGetUniqueBetDetails(userId, startDateD, endDateD, m, matchID);
      const uniqueBetsData = uniqueBets.map(item => ({
        ...item,
        userId,
        category: m,
        match_id: matchID
      }));
      setUniqueBet(uniqueBetsData);
      return;
    }

    if (m && !e && !ma) {
      const matchwise = await onGetProfitLossMatchwise(userId, startDateD, endDateD, m);
      const matchWiseData = matchwise.profit_loss.map(item => ({
        ...item,
        userId,
        category: m,
      }));
      console.log(matchWiseData, "matchWiseData");
      
      setProfitLossMatchwise(matchWiseData);
      return;
    }

    if (!m && !e && !ma) {
      const gtype = await onGetProfitLossByGtype(userId, startDateD, endDateD);
      const gtypeWithUserId = gtype.profit_loss.map(item => ({
        ...item,
        userId,
        commision: item.commision ?? 0 // If commision is undefined or null, set to 0
      }));
      console.log(gtypeWithUserId, "gtypeWithUserId");
      
      setProfitLossGtype(gtypeWithUserId);
    }
  } catch (error) {
    console.error("Error fetching user match details:", error);
  }
};

useEffect(() => {
  fetchPandL();
}, []);

  const Data = [
    { sportname: "Cricket", profitloss: 5000, commision: 300, totalpsl: 4700 },
    {
      sportname: "Football",
      profitloss: -2000,
      commision: 150,
      totalpsl: -2150,
    },
    { sportname: "Tennis", profitloss: 3500, commision: 200, totalpsl: 3300 },
    { sportname: "Basketball", profitloss: 1000, commision: 50, totalpsl: 950 },
    { sportname: "Hockey", profitloss: -500, commision: 30, totalpsl: -530 },
  ];

  const gameData = [
    {
      sportname: "cricket",
      eventname: "India vs England",
      profitloss: 1000,
      commision: 0,
      totalpsl: 5000,
    },
    {
      sportname: "cricket",
      eventname: "Australia vs Pakistan",
      profitloss: -500,
      commision: 50,
      totalpsl: 3000,
    },
    {
      sportname: "cricket",
      eventname: "South Africa vs New Zealand",
      profitloss: 2000,
      commision: 100,
      totalpsl: 7000,
    },
    {
      sportname: "cricket",
      eventname: "West Indies vs Sri Lanka",
      profitloss: -1200,
      commision: 80,
      totalpsl: 4500,
    },
    {
      sportname: "cricket",
      eventname: "Bangladesh vs Afghanistan",
      profitloss: 750,
      commision: 30,
      totalpsl: 2500,
    },
  ];

  const gameDetailsData = [
    {
      sportname: "cricket",
      eventname: "India vs England",
      marketname: "PAK 6 Over run",
      result: 79,
      profitloss: 1000,
      commision: 0,
      settletime: "Mar 23, 2025, 12:16:35 PM",
    },
    {
      sportname: "cricket",
      eventname: "India vs England",
      marketname: "Total Match Runs",
      result: 320,
      profitloss: -500,
      commision: 50,
      settletime: "Mar 23, 2025, 3:45:20 PM",
    },
    {
      sportname: "cricket",
      eventname: "India vs England",
      marketname: "First Wicket Method",
      result: 80,
      profitloss: 200,
      commision: 10,
      settletime: "Mar 23, 2025, 1:10:50 PM",
    },
    {
      sportname: "cricket",
      eventname: "India vs England",
      marketname: "Highest Individual Score",
      result: 105,
      profitloss: 1500,
      commision: 75,
      settletime: "Mar 23, 2025, 4:30:15 PM",
    },
    {
      sportname: "cricket",
      eventname: "India vs England",
      marketname: "Total Sixes",
      result: 12,
      profitloss: -700,
      commision: 40,
      settletime: "Mar 23, 2025, 5:00:00 PM",
    },
  ];
  const betsData = [
    {
      bettype: "Back",
      userprice: 2.5,
      amount: 5000,
      pl: "+1200",
      placedate: "2025-03-20",
      matchdate: "2025-03-22",
      details: "India vs England - India to win",
    },
    {
      bettype: "Lay",
      userprice: 1.8,
      amount: 2000,
      pl: "-800",
      placedate: "2025-03-19",
      matchdate: "2025-03-21",
      details: "Australia vs South Africa - Australia to win",
    },
    {
      bettype: "Back",
      userprice: 3.2,
      amount: 10000,
      pl: "+3000",
      placedate: "2025-03-21",
      matchdate: "2025-03-23",
      details: "Pakistan vs New Zealand - Pakistan to win",
    },
    {
      bettype: "Lay",
      userprice: 2.1,
      amount: 3500,
      pl: "-1500",
      placedate: "2025-03-18",
      matchdate: "2025-03-20",
      details: "England vs Sri Lanka - England to win",
    },
    {
      bettype: "Back",
      userprice: 2.9,
      amount: 1500,
      pl: "+600",
      placedate: "2025-03-17",
      matchdate: "2025-03-19",
      details: "West Indies vs Bangladesh - West Indies to win",
    },
  ];

  const fetchPanfL = ()=>{

  }

  return (
    <div className="container m-auto sm:w-full flex flex-col">
      {m && e && ma ? (
        <div className=" flex w-full flex-col ">
          <div className=" w-full flex justify-end mt-6 mb-1 ">
            <div className=" w-fit flex gap-1 ">
              <div className=" p-2 border border-black text-xs text-center bg-blue-400 font-semibold">
                {" "}
                <p>Back</p>
              </div>
              <div className=" p-2 text-xs text-center border border-black bg-red-300 font-semibold">
                {" "}
                <p>Lay</p>
              </div>
              <div className=" p-2 text-center text-xs border border-black bg-gray-200 font-semibold">
                {" "}
                <p>Void</p>
              </div>
            </div>
          </div>
          <div className=" w-full p-2 bg-blue-700 text-white font-bold text-sm ">
            <p> Bets History</p>
          </div>
          <DataTable
            columns={USER_BETS_DETAILS_COL}
            data={betsData}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
          />
        </div>
      ) : (
        <>
          <NavigationTableCompo />
          {/* <CalendarCompo /> */}
          {loading && <LoadingSpinner />}
          <DateRangePicker  startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} buttonTitle={"Get P&L"} onButtonClick={fetchPandL} loading={loading}/>
          {!m && !e && !ma &&  profitLossGtype &&(
            <DataTable
              columns={USER_MATCH_DETAILS_COL}
              data={profitLossGtype}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
            />
          )}
          {m && !e && !ma &&  profitLossMatchwise && (
            <DataTable
              columns={USER_MATCH_DETAILS_GAME_COL}
              data={profitLossMatchwise}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
            />
          )}
          {m && e && !ma && uniqueBet && (
            <DataTable
              columns={USER_MATCH_DETAILS_GAMENAME_COL}
              data={uniqueBet}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
            />
          )}
          {m && e && !ma && allBetDetails && (
            <DataTable
              columns={USER_MATCH_DETAILS_GAMENAME_COL}
              data={allBetDetails}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserMatchDetails;