import { useContext } from "react";
import ActionButtons from "../ActionButtons";
import { AccountContext } from "../../services/account/account.context";
import { useNavigate } from "react-router";
// import { useNavigate } from "react-router";

const formatValue = (
  value,
  format,
  row,
  rowKey = "",
  userTypeCode,
  onGetDownLineData,
  setIsNested,
  isNested,
  navigate
) => {

  if (typeof format === "function") {
    return format(row);
  }
  if (format === "username") {
    return (
      <div
        className={`flex flex-row items-center gap-2 ${
          isNested ? "text-black" : "text-blue-500"
        }`}
        style={{fontSize: "12px"}}
        onClick={async () => {
          if (userTypeCode && !isNested) {
            console.log(row.fs_id, userTypeCode);

            await onGetDownLineData(row.fs_id, userTypeCode);
            setIsNested(true);
          }
        }}
      >
        {rowKey.length > 0 && rowKey && (
          <span
          style={{fontSize: "8px", minWidth: "80px"}}
            className={`px-1 py-1 font-bold rounded bg-green-500 text-white 
       `}
          >
            <center style={{}}>{rowKey}</center>
            
          </span>
        )}
        <span
          className={`text-blue-500 ${
            userTypeCode ? "cursor-pointer font-semibold hover:underline" : ""
          }`}
        >
          {value}
        </span>
      </div>
    );
  }

  if (format === "currency") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  }

  if (format === "category") {
    return (
      <span
        onClick={() =>  navigate(`?m=${row?.gtype_category}`, {
          state: { userData: row },
        })}
        className={`px-2 py-1 text-xs cursor-pointer rounded text-blue-500 `}
      >
        {value}
      </span>
    );
  }
  if (format === "eventname") {
    console.log(row);

    return (
      <span
        onClick={() =>
          {
            console.log(row , "i am not here");
            navigate(`?m=${row?.category}&e=${row?.match_id}`, {
              state: { userData: row },
            })}}
        className={`px-2 py-1 text-xs cursor-pointer rounded text-blue-500 `}
      >
        {value}
      </span>
    );
  }
  if (format === "marketname") {
    return (
      <span
        onClick={() =>
          navigate(
           ` ?m=${row?.m}&e=${row?.category}&ma=${row.marketname}`,{
            state: { userData: row },
           }
          )
        }
        className={`px-2 py-1 text-xs cursor-pointer rounded text-blue-500 `}
      >
        {value}
      </span>
    );
  }
  if (format === "bettype") {
    return (
      <span
        className={`px-2 py-1 ${
          value < 0 ? " text-red-500" : ""
        }  text-black font-semibold  text-xs  rounded  `}
      >
        {value}
      </span>
    );
  }

  if (format === "status") {
    return (
      <span
        className={`px-2 py-1 text-xs font-bold rounded ${
          value === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {value === 1 ? "Online" : "Offline"}
      </span>
    );
  }

  return value;
};

const TableBody = ({
  data,
  columns,
  rowKey,
  userTypeCode,
  setIsNested,
  isNested,
}) => {
    const navigate = useNavigate()
  const { onGetDownLineData } = useContext(AccountContext);
  return (
    <tbody>
      {data.length > 0 ? (
        data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`${rowIndex % 2 === 0 ? "bg-gray-50" : ""}  ${
              columns && columns[rowIndex]?.format === "bettype"
                ? row.bettype === "Back"
                  ? "bg-red-300"
                  : "bg-blue-300 "
                : ""
            }`}
          >
            {columns.map(
              ({ key, format, dataKey, actionsConfig }, colIndex) => {
                const cellValue = row[dataKey || key];

                return (
                  <td
                    key={`${key}-${colIndex}`}
                    className="border border-gray-300 p-2 text-right"
                  >
                    {actionsConfig ? (
                      <ActionButtons actions={actionsConfig(row)} fs_id={row.fs_id} data={row}/>
                    ) : format ? (
                      formatValue(
                        cellValue,
                        format,
                        row,
                        rowKey,
                        userTypeCode,
                        onGetDownLineData,
                        setIsNested,
                        isNested,
                        navigate
                      )
                    ) : (
                      cellValue
                    )}
                  </td>
                );
              }
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columns.length}
            className="border border-gray-300 p-4 text-center"
          >
            No data!
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
