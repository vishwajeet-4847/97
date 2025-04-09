import { useEffect, useState } from "react";
import React from "react";
import { BsLock } from "react-icons/bs";

export const SportBookComponents = ({
  data,
  handleBackClick,
  handleLayClick,
  betAmount,
  setBetAmount,
  isModalOpen,
  selectedBet,
  betAmounts,
  closeModal,
  betLoading,
  handleBetAmountChange,
  placeBat,
}) => {
  const [activeSections, setActiveSections] = useState(0);
  const [activeGameFSections, setActiveGameFSections] = useState("all");
  const [activeGameSSections, setActiveGameSSections] = useState("all");
  const [displayDataOptions, setDisplayDataOptions] = useState([
    "meter",
    "oddeven",
    "khado",
    "fancy1",
    "fancy",
    "cricketcasino",
  ]);

  useEffect(() => {
    if (activeSections === 0) {
      if (activeGameFSections === "all") {
        setDisplayDataOptions([
          // "meter",
          // "oddeven",
          // "khado",
          // "fancy1",
          "normal",
          // "fancy",
          // "cricketcasino",
        ]);
      } else {
        setDisplayDataOptions([activeGameFSections]);
      }
    } else {
      if (activeGameSSections === "all") {
        setDisplayDataOptions([
          "meter",
          "oddeven",
          "khado",
          "fancy1",
          "fancy",
          "cricketcasino",
        ]);
      } else {
        setDisplayDataOptions([activeGameSSections]);
      }
    }
  }, [activeGameFSections, activeGameSSections, activeSections]);

  const fancyNData = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Fancy",
      value: "fancy",
    },
    {
      label: "Line Market",
      value: "lineMarket",
    },
    {
      label: "Ball by Ball",
      value: "ballByBall",
    },
    {
      label: "Meter",
      value: "meter",
    },
    {
      label: "Khado",
      value: "khado",
    },
  ];

  const sportsBookNData = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Fancy",
      value: "fancy",
    },
    {
      label: "Line Market",
      value: "lineMarket",
    },
    {
      label: "Ball by Ball",
      value: "ballByBall",
    },
    {
      label: "Meter",
      value: "meter",
    },
    {
      label: "Khado",
      value: "khado",
    },
  ];

  return (
    <div>
      <div className=" flex w-full mt-2 ">
        <div
          onClick={() => setActiveSections(0)}
          className=" flex text-white font-bold text-sm  cursor-pointer"
        >
          <div className=" p-1 pl-2 pr-2 bg-gradient-to-b from-[#098a9b] to-[#243a48]">
            Fancy Bet
          </div>
          <span className=" flex items-center justify-center w-8 rounded-tr-3xl bg-sky-400">
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01"
              />
            </svg>
          </span>
        </div>
        <div
          onClick={() => setActiveSections(1)}
          className=" flex  text-white font-bold text-sm cursor-pointer "
        >
          <div className=" p-1 pl-2 rounded-tl-md bg-gradient-to-b from-[#f26d1c] to-[#d44603] ">
            Sportsbook
          </div>
          <span className=" flex items-center justify-center w-8 rounded-tr-3xl bg-orange-400">
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01"
              />
            </svg>
          </span>
        </div>
      </div>

      {activeSections === 0 ? (
        <div className=" w-full  bg-gradient-to-b from-[#098a9b] to-[#243a48] flex items-center justify-center p-1">
          <div className=" flex items-center w-fit justify-center bg-[#84bfc7] rounded-lg">
            {fancyNData.map((item, index) => (
              <div
              key={index}
                onClick={() => setActiveGameFSections(item.value)}
                className={` text-black p-1 cursor-pointer pl-2 pr-2 text-xs font-bold rounded-md ${
                  item.value === activeGameFSections ? "bg-white" : ""
                } `}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className=" w-full  bg-gradient-to-b from-[#f26d1c] to-[#d44603] flex items-center justify-center p-1">
          <div className=" flex items-center w-fit justify-center bg-[#f2ae88] rounded-lg">
            {sportsBookNData.map((item, index) => (
              <div
                onClick={() => setActiveGameSSections(item.value)}
                className={` text-black p-1 cursor-pointer pl-2 pr-2 text-xs font-bold rounded-md ${
                  item.value === activeGameSSections ? "bg-white" : ""
                } `}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* heading div */}

      {/* data div */}
      <div className=" flex flex-col w-full ">
        {data.map((data, dataIndex) => (
          <div key={dataIndex} className="bg-white relative">
            {/* Winner Section */}
            <div className={``}>
              {[...displayDataOptions].includes(
                data.mname.toString().toLowerCase()
              ) ? (
                <>
                  <div className="flex justify-between items-center bg-white text-white">
                    <div className="flex w-fit items-center p-2 rounded-tr-xl bg-gray-800">
                      <span className="font-bold text-xs">
                        {" "}
                        {[
                          "meter",
                          "oddeven",
                          "khado",
                          "fancy1",
                          "fancy",
                          "cricketcasino",
                        ].some(
                          (type) => data.gtype.toString().toLowerCase() === type
                        )
                          ? data.gtype
                          : data.gtype}{" "}
                      </span>
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01"
                        />
                      </svg>
                    </div>
                    <div className="text-xs text-black mr-2 font-semibold">
                      Matched € 9.6K
                    </div>
                  </div>
                  <div className="border-b text-[5px] border-gray-300">
                    {dataIndex === 0 && (
                      <div className="flex font-bold text-sm">
                        <div className="w-1/2 p-2"></div>
                        <div className="w-1/4 p-2 text-center bg-[#72bbef] border-l border-gray-300">
                          Back
                        </div>
                        <div className="w-1/4 p-2 text-center bg-[#faa9ba] border-l border-gray-300">
                          Lay
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      {data.section.map((item, sectionIndex) => (
                        <React.Fragment key={item.sid}>
                          <div className="flex border-t border-gray-400 relative text-[12px] text-sm">
                            <div className="w-1/2 p-2 font-bold text-[12px]">
                              {item?.nat}
                            </div>

                            {item.gstatus !== "" &&
                            item.gstatus !== "ACTIVE" &&
                            item.gstatus !== "OPEN" ? (
                              <div className="text-black font-semibold flex items-center justify-center w-1/2 bg-red-500/30">
                                {item.gstatus}
                              </div>
                            ) : (
                              <div className="w-1/2 flex ">
                                <button
                                  onClick={() =>
                                    item.odds && item.odds.length > 0
                                      ? handleLayClick(
                                          dataIndex,
                                          sectionIndex,
                                          item,
                                          item.odds[item.odds.length / 2 - 1]
                                            ?.odds,
                                          data.mname,
                                          data.gmid,
                                          data.mid,
                                          item.odds[item.odds.length / 2]?.size
                                        )
                                      : null
                                  }
                                  className="w-full bg-pink-300 "
                                  disabled={
                                    !item.odds || item.odds.length === 0
                                  }
                                >
                                  <div className=" text-center font-bold">
                                    {item.odds && item.odds.length > 0
                                      ? item.odds[
                                          Math.floor(item.odds.length / 2)
                                        ]?.odds
                                      : "-"}
                                  </div>
                                  <div className="bg-pink-300 text-center">
                                    {item.odds && item.odds.length > 0
                                      ? item.odds[
                                          Math.floor(item.odds.length / 2)
                                        ]?.size
                                      : "-"}
                                  </div>
                                </button>
                                <button
                                  onClick={() =>
                                    item.odds && item.odds.length > 0
                                      ? handleBackClick(
                                          dataIndex,
                                          sectionIndex,
                                          item,
                                          item.odds[item.odds.length / 2 - 1]
                                            ?.odds,
                                          data.mname,
                                          data.gmid,
                                          data.mid,
                                          item.odds[item.odds.length / 2]?.size
                                        )
                                      : null
                                  }
                                  className="w-full bg-blue-300 "
                                  disabled={
                                    !item.odds || item.odds.length === 0
                                  }
                                >
                                  <div className=" text-center font-bold">
                                    {item.odds && item.odds.length > 0
                                      ? item.odds[
                                          Math.floor(item.odds.length / 2) - 1
                                        ]?.odds
                                      : "-"}
                                  </div>
                                  <div className=" text-center">
                                    {item.odds && item.odds.length > 0
                                      ? item.odds[
                                          Math.floor(item.odds.length / 2) - 1
                                        ]?.size
                                      : "-"}
                                  </div>
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Inline Betting Modal */}
                          {isModalOpen(dataIndex, sectionIndex) &&
                            selectedBet && (
                              <div className="w-full bg-[#d3edd0] text-lg text-black rounded-md shadow-lg border border-[#beddf4] p-1">
                                <div className="flex justify-between gap-1 items-center mb-2">
                                  <div
                                    className="flex w-1/2 border-1 border-[#aaaaaa] items-center rounded-md"
                                    style={{ backgroundColor: "#fcfcfc" }}
                                  >
                                    <button className="p-2 text-blue-800">
                                      <span className="text-xl font-bold">
                                        −
                                      </span>
                                    </button>
                                    <input
                                      type="text"
                                      value={selectedBet.odds}
                                      className="p-2 text-center w-full border-r border-l border-[#aaaaaa] bg-gray-100"
                                      readOnly
                                    />
                                    <button className="p-2 text-blue-800">
                                      <span className="text-xl font-bold">
                                        +
                                      </span>
                                    </button>
                                  </div>
                                  <div
                                    className="flex border-1 border-[#aaaaaa] items-center w-1/2 rounded-md"
                                    style={{ backgroundColor: "#fcfcfc" }}
                                  >
                                    <button
                                      onClick={() =>
                                        setBetAmount(
                                          Math.max(0, betAmount - 100)
                                        )
                                      }
                                      className="p-2 text-blue-800"
                                    >
                                      <span className="text-sm font-bold">
                                        −
                                      </span>
                                    </button>
                                    <input
                                      type="text"
                                      value={betAmount}
                                      onChange={(e) =>
                                        setBetAmount(Number(e.target.value))
                                      }
                                      className="p-2 text-center border-l border-[#aaaaaa] w-full border-r bg-gray-100"
                                    />
                                    <button
                                      onClick={() =>
                                        setBetAmount(betAmount + 100)
                                      }
                                      className="p-2 text-blue-800 rounded-xl"
                                    >
                                      <span className="text-xl font-bold">
                                        +
                                      </span>
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-4 mt-2 gap-2 mb-2">
                                  {betAmounts.map((amount) => (
                                    <button
                                      key={amount}
                                      onClick={() =>
                                        handleBetAmountChange(amount)
                                      }
                                      className="bg-white border-1 border-black py-1 text-center rounded hover:bg-gray-100 text-sm"
                                    >
                                      {amount}
                                    </button>
                                  ))}
                                </div>

                                <div className="flex space-x-2 mt-4">
                                  <button
                                    onClick={closeModal}
                                    className="w-1/2 py-2 text-center rounded border border-green-300 text-sm bg-white hover:bg-gray-100"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    disabled={betLoading}
                                    onClick={() => placeBat()}
                                    className="w-1/2 py-2 text-center text-sm text-white rounded font-medium"
                                    style={{ backgroundColor: "#4a6da7" }}
                                  >
                                    {betLoading ? "loading" : "Place Bet"}
                                  </button>
                                </div>
                              </div>
                            )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
