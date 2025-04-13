import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import DataTable from "./table/DataTable";
import { formatDate } from "../utils/formatters";
import {
  DataSourceOptions,
  USER_BETS_DETAILS_COL,
  USER_MATCH_DETAILS_COL,
  USER_MATCH_DETAILS_GAME_COL,
  USER_MATCH_DETAILS_GAMENAME_COL,
} from "../utils/columns";
import { NavigationTableCompo } from "./Modal/UserMatchDetails/NavigationLink";
import DateRangePicker from "./DateRangePicker";
import { AccountContext } from "../services/account/account.context";
import LoadingSpinner from "./LoadingSpinner";
import { filterData, paginateData } from "../utils/table";

const UserMatchDetails = () => {
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [dataSource, setDataSource] = useState("LIVE DATA");
  const [dataNow, setDataNow] = useState([]);
  const [uniqueBet, setUniqueBet] = useState(null);
  const [allBetDetails, setAllBetDetails] = useState(null);
  const [profitLossGtype, setProfitLossGtype] = useState(null);
  const [profitLossMatchwise, setProfitLossMatchwise] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [isSourceSelected, setIsSourceSelected] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { userData } = location.state || {};
  const {
    onGetBetDetails,
    onGetUniqueBetDetails,
    onGetProfitLossByGtype,
    onGetProfitLossMatchwise,
    loading,
  } = useContext(AccountContext);

  let m = searchParams.get("m");
  let e = searchParams.get("e");
  let ma = searchParams.get("ma");
  let userId = "2";



 

  const fetchPandL = async () => {
    if (!userData) {
      navigate("/list/agent");
      return;
    }
console.log(userData);

    const startDateD = formatDate(new Date(startDate));
    const endDateD = formatDate(new Date(endDate));

    try {
      setDataNow([]);
      if (m && e && ma) {
        const bets = await onGetBetDetails(userData.user_id , m, e, ma);
        setAllBetDetails(bets);
        setDataNow(bets);
        return;
      }

      if (m && e && !ma) {
        const matchID = m === "Casino" ? 0 : e;
        const uniqueBets = await onGetUniqueBetDetails(userData.user_id, startDateD, endDateD, m, matchID);
        const uniqueBetsData = uniqueBets.map((item) => ({
          ...item,
          userId,
          category: m,
          identifier: item.bet_name ?? `${item.game_name}_${item.round_id}`,
          match_id: matchID,
          commission: item.commision ?? 0,
        }));
        setUniqueBet(uniqueBetsData);
        setDataNow(uniqueBetsData);
        return;
      }

      if (m && !e && !ma) {
        const matchwise = await onGetProfitLossMatchwise(userData.user_id, startDateD, endDateD, m);
        const matchWiseData = matchwise.profit_loss.map((item) => ({
          ...item,
          userId,
          category: m,
          commision: item.commision ?? 0,
        }));
        setProfitLossMatchwise(matchWiseData);
        setDataNow(matchWiseData);
        return;
      }

      if (!m && !e && !ma) {
        console.log(userData.user_id, startDateD, endDateD);
        
        const gtype = await onGetProfitLossByGtype(userData.user_id, startDateD, endDateD);
        const gtypeWithUserId = gtype.profit_loss.map((item) => ({
          ...item,
          userId,
          commission: item.commission ?? 0,
        }));
        setProfitLossGtype(gtypeWithUserId);
        setDataNow(gtypeWithUserId);
      }
    } catch (error) {
      console.error("Error fetching user match details:", error);
    }
  };

  useEffect(() => {
    if (dataSource && !isSourceSelected) {
      let end = new Date();
      let start = new Date();
  
      switch (dataSource) {
        case "LIVE DATA":
          start.setDate(end.getDate() - 1); // 24 hours
          break;
        case "BACKUP DATA":
          start.setDate(end.getDate() - 90); // 90 days
          break;
        case "OLD DATA":
          start.setFullYear(end.getFullYear() - 1); // 1 year
          break;
        default:
          break;
      }
  
      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);
      setStartDate(formattedStart);
      setEndDate(formattedEnd);
      setIsSourceSelected(true);
  
      // Auto fetch after setting range
      fetchPandL();
    }
  }, [dataSource]);

  const filteredData = filterData(dataNow, searchTerm);
  const { paginatedData: currentData, totalPages } = paginateData(
    filteredData,
    currentPage,
    entriesPerPage
  );

  return (
    <div className="container m-auto sm:w-full flex flex-col">
      {m && e && ma ? (
        <div className="flex w-full flex-col">
          <div className="w-full flex justify-end mt-6 mb-1">
            <div className="w-fit flex gap-1">
              <div className="p-2 border border-black text-xs text-center bg-blue-400 font-semibold">
                <p>Back</p>
              </div>
              <div className="p-2 text-xs text-center border border-black bg-red-300 font-semibold">
                <p>Lay</p>
              </div>
              <div className="p-2 text-center text-xs border border-black bg-gray-200 font-semibold">
                <p>Void</p>
              </div>
            </div>
          </div>
          <div className="w-full p-2 bg-blue-700 text-white font-bold text-sm">
            <p>Bets History</p>
          </div>
          <DataTable
            columns={USER_BETS_DETAILS_COL}
            data={currentData}
            totalPages={totalPages}
            currentPage={currentPage}
            goToPage={setCurrentPage}
            entriesPerPage={entriesPerPage}
            setEntriesPerPage={setEntriesPerPage}
            searchQuery={searchTerm}
            setSearchQuery={setSearchTerm}
          />
        </div>
      ) : (
        <>
          <NavigationTableCompo />
          {loading && <LoadingSpinner />}
          <DateRangePicker
            isDataSource={true}
            dataSourceOptions={DataSourceOptions}
            setDataSource={setDataSource}
            dataSource={dataSource}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            buttonTitle={"Get P&L"}
            onButtonClick={fetchPandL}
            loading={loading}
            disableInputs={isSourceSelected}
          />
          {!m && !e && !ma && profitLossGtype && (
            <DataTable
              columns={USER_MATCH_DETAILS_COL}
              data={currentData}
              totalPages={totalPages}
              currentPage={currentPage}
              goToPage={setCurrentPage}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
              searchQuery={searchTerm}
              setSearchQuery={setSearchTerm}
            />
          )}
          {m && !e && !ma && profitLossMatchwise && (
            <DataTable
              columns={USER_MATCH_DETAILS_GAME_COL}
              data={currentData}
              totalPages={totalPages}
              currentPage={currentPage}
              goToPage={setCurrentPage}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
              searchQuery={searchTerm}
              setSearchQuery={setSearchTerm}
            />
          )}
          {m && e && !ma && uniqueBet && (
            <DataTable
              columns={USER_MATCH_DETAILS_GAMENAME_COL}
              data={currentData}
              totalPages={totalPages}
              currentPage={currentPage}
              goToPage={setCurrentPage}
              entriesPerPage={entriesPerPage}
              setEntriesPerPage={setEntriesPerPage}
              searchQuery={searchTerm}
              setSearchQuery={setSearchTerm}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserMatchDetails;