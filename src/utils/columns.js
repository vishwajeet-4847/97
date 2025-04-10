// COLUMN NAME REPRESENTS COMPONENT IN WHICH IT IS USED

// data={
//     "sportName": "Cricket",
//     "uplineProfit": "100",
//     "downlineProfit": "200",
//     "commission": "300"
//   }
// key----> sportName
//  label ----> Cricket
// sortable ---> columns supports sorting

// use datakey for duplicate values

export const PLREPORTS_COL = [
  { key: "sportName", label: "Sport Name", align: "left", sortable: true },
  {
    key: "uplineProfit",
    label: "Upline Profit/Loss",
    align: "center",
    sortable: true,
  },
  {
    key: "downlineProfit",
    label: "Downline Profit/Loss",
    align: "center",
    sortable: true,
  },
  { key: "commission", label: "Commission", align: "center", sortable: true },
];

export const RESTORE_USER_COL = [
  { key: "username", label: "User Name", sortable: true },
  { key: "name", label: "Name", sortable: false },
  { key: "date", label: "Date & Time", sortable: true },
  { key: "action", label: "Action", sortable: false , actionsConfig: ()=>{
    return [
      {
        button: "Restore",
        onClick: () => alert("Restore User"),
        color: "blue",
      },
    ];
  }},
];

export const PASSWORD_HISTORY_COL = [
  { key: "username", label: "Username", sortable: true },
  { key: "remarks", label: "Remarks" },
  { key: "date", label: "Date & Time", sortable: true },
];

export const getFinancialCol = (actionsConfig = {}) => {
  return [
    { label: "Username", key: "user_id", sortable: true, format: "username" },
    {
      label: "Credit Ref.",
      key: "credit_ref",
      dataKey: "ref_sd_id",
      sortable: true,
    },
    { label: "Partnership", key: "partnership", sortable: true },
    {
      label: "Balance",
      key: "balance",
      dataKey: "balance",
      sortable: true,
      format: "currency",
    },
    {
      label: "Exposure",
      key: "bet_balance",
      dataKey: "bet_balance",
      sortable: true,
      format: "currency",
    },
    {
      label: "Avail. Bal.",
      key: "available_balance",
      dataKey: "balance",
      sortable: true,
      format: (row) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(row.balance - row.bet_balance),
    },
    { label: "Ref. P/L", key: "ref_pl", dataKey: "ref_sd_id", sortable: true },
    { label: "Status", key: "status", sortable: true, format: "status" },
    {
      label: "Actions",
      key: "actions",
      sortable: false,
      actionsConfig: (row) =>{
       let a= Object.keys(actionsConfig).map((actionKey) => ({
          icon: actionsConfig[actionKey].icon,
          onClick: () => actionsConfig[actionKey].onClick(row),
          color: actionsConfig[actionKey].color || "gray",
        }))
        console.log(a);
        
        return a;
      
      }
    },
  ];
};

// render: (row) => (
//   <div className="flex gap-2">
//     <button onClick={() => handlePayment(row)} className="p-1 bg-gray-200 rounded">
//       <DollarSign size={18} className="text-gray-600" />
//     </button>
//     <button onClick={() => handleSettings(row)} className="p-1 bg-gray-200 rounded">
//       <Settings size={18} className="text-gray-600" />
//     </button>
//     <button onClick={() => handleProfile(row)} className="p-1 bg-gray-200 rounded">
//       <User size={18} className="text-gray-600" />
//     </button>
//     <button onClick={() => handleLock(row)} className="p-1 bg-gray-200 rounded">
//       <Lock size={18} className="text-gray-600" />
//     </button>
//     <button onClick={() => handleDelete(row)} className="p-1 bg-gray-200 rounded">
//       <Trash2 size={18} className="text-red-500" />
//     </button>
//   </div>
// ),

export const DOWNLINE_PROFIT_COL = [
  { key: "sportName", label: "Sport Name", align: "left", sortable: true },
  {
    key: "uplineProfit",
    label: "Upline Profit/Loss",
    align: "center",
    sortable: true,
  },
  {
    key: "downlineProfit",
    label: "Downline Profit/Loss",
    align: "center",
    sortable: true,
  },
  { key: "commission", label: "Commission", align: "center", sortable: true },
];

export const COMMISSION_COL = [
  { key: "agent", label: "Agent Name", sortable: true },
  { key: "turnover", label: "Turn Over", sortable: true },
  { key: "commission", label: "Commission", sortable: true },
  { key: "action", label: "Action" },
];

export const BETTING_HISTORY_COL = [
  { key: "userName", label: "User Name", sortable: true },
  { key: "sportName", label: "Sport Name", sortable: true },
  { key: "event", label: "Event", sortable: true },
  { key: "market", label: "Market", sortable: true },
  { key: "selection", label: "Selection", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "oddsReq", label: "Odds Req.", sortable: true },
  { key: "stack", label: "Stack", sortable: true },
  { key: "placeTime", label: "Place Time", sortable: true },
  { key: "settleTime", label: "Settle Time", sortable: true },
];

export const BANKING_COL = [
  { field: "UID", label: "UID", sortable: true, key: "uid" },
  {
    field: "Balance",
    label: "Balance",
    sortable: true,
    format: "currency",
    key: "balance",
  },
  {
    field: "Available D / W",
    label: "Available D / W",
    sortable: true,
    key: "availabledw",
  },
  { field: "Exposure", label: "Exposure", key: "exposure" },
  {
    field: "Credit Reference",
    label: "Credit Reference",
    sortable: true,
    key: "creditreference",
  },
  { field: "Reference P/L", label: "Reference P/L", key: "referenceP/L" },
  { field: "Deposit/Withdraw", label: "Deposit/Withdraw", key: "deposit" },
  { field: "Remark", label: "Remark", key: "remark" },
];

export const ACTIVITY_LOG_COL = [
  { key: "date", label: "Login Date & Time", sortable: false },
  { key: "status", label: "Login Status", sortable: false },
  { key: "ip", label: "IP Address", sortable: false },
  { key: "isp", label: "ISP", sortable: false },
  { key: "location", label: "City/State/Country", sortable: false },
];


export const USER_MATCH_DETAILS_COL = [
  {
    key: "gtype_category",
    label: "Sport Name",
    format: "category",
  },
  {
    key: "net_profit_loss",
    label: " Profit/Loss",
    format: "profit",
  },
  {
    key: "commission",
    label: "Commission",
    sortable : true
  },
  {
    key: "total_profit_loss",
    dataKey: "net_profit_loss",
    label: "Total Profit/Loss",
    format: "profit",
  },
  
];

export const USER_MATCH_DETAILS_GAME_COL = [
  {
    label:"Sport Name",
    key: "category",
  

  },
  {
    key: "match_name",
    label: "Match Name",
    format: "makelink",
  },
  {
    key: "match_id",
    label: "Match Id",
    format:"eventname"

  },

  {
    key: "commision",
    label: "Commission",
    sortable : true
  },
  {
    key: "net_profit_loss",
    label: "Net Profit/Loss",
    format: "profit",
  }
];

export const USER_MATCH_DETAILS_GAMENAME_COL = [
  {
    label: "Sport Name",
    key: "category",
  },
  {
    key: "identifier",
    label: "Identifier",
    format: "marketname",
  },
  {
    key: "game_name",
    label: "Game Name",
    format: "gameName",
  },
  {
    key: "round_id",
    label: "Round Id",
    format: "roundId",
    sortable: true,
  },
  {
    key: "commission",
    label: "Commission",
    sortable : true
  },
  {
    key: "net_profit_loss",
    label: "Net Profit Loss",
    format: "profit",
    sortable: true,
  },
];

export const USER_BETS_DETAILS_COL = [
  {
    key: "bet_type",
    // vback
    label: "Bet Type",
    format: "bettype",
  },
  {
    key: "bet_rate",
    label: "User Price",
    format: "bettype",
  },
  {
    key: "win_amount",
    label: "Amount",
    format: "bettype",
  },
  {
    key: "loss_amount",
    label: "PL",
    format: "bettype",
  },
  {
    key: "created_at",
    label: "Place Date",
    format: "bettype",
  },
  {
    key: "matchdate",
    dataKey:"created_at",
    label: "Match Date",
    format: "bettype",
  },
  {
    key: "bet_name",
    label: "Details",
    format: "bettype",
  },
];

export const ACCOUNT_STATEMENT_COLS = [
  {
    key: "transaction_id",
    label: "Txn ID",
    format: "text",
  },
  {
    key: "transaction_datetime",
    label: "Date/Time",
    format: "datetime",
    sortable:true
  },
  {
    key: "transaction_details",
    label: "Details",
    format: "text",
  },
  {
    key: "transaction_amount",
    label: "Amount",
    format: "currency",
  },
  {
    key: "transaction_type",
    label: "Type",
    format: "text",
  },
  {
    key: "closing_balance",
    label: "Closing Balance",
    format: "currency",
  },
  {
    key: "wlt",
    label: "W/L/T",
    format: "text",
  },
];
