import React, { useEffect, useState } from "react";

export const TossSportsConponents = ({
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
  const [teamOne, setTeamOne] = useState(null);
  const [secondne, setTeamTwo] = useState(null);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [openModelIndex, setOpenModelIndex] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const firstMatch = data && data?.length ? data[0]?.section[0] : null;
    const secondMatch = data && data?.length ? data[0].section[1] : null;
    setTeamOne(firstMatch);
    setTeamTwo(secondMatch);

    const teamname = firstMatch?.nat?.match(/\((\w{2,4}) vs (\w{2,4})\)/);
    if (teamname) {
      const teams = [teamname[1], teamname[2]];
      //(teams);
      setTeam(teams);
    }
  }, [data]);

  //(data);

  return (
    <>
      {data && data.length ? (
        <div className=" flex w-full flex-col">
          <div className="flex justify-between items-center bg-white text-white">
            <div className="flex w-fit items-center p-2 rounded-tr-xl bg-gray-800">
              <span className="font-bold text-xs mr-2">
                Which Team Win The Toss
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

          <div className=" bg-[#a3e6be] flex justify-around p-2 ">
            <TeamCard
              data={teamOne}
              handleBackClick={handleBackClick}
              mainData={data}
              index={0}
              teamname={team[0]}
            />
            <TeamCard
              data={secondne}
              handleBackClick={handleBackClick}
              mainData={data}
              index={1}
              teamname={team[1]}
            />
          </div>

          {isModalOpen(0, "toss") && selectedBet && (
            <div className="w-full bg-[#d3edd0] text-lg text-black rounded-md shadow-lg border border-[#beddf4] p-1">
              <div className="flex justify-between gap-1 items-center mb-2">
                <div
                  className="flex w-1/2 border-1 border-[#aaaaaa] items-center rounded-md"
                  style={{ backgroundColor: "#fcfcfc" }}
                >
                  <button className="p-2 text-blue-800">
                    <span className="text-xl font-bold">−</span>
                  </button>
                  <input
                    type="text"
                    value={selectedBet.odds}
                    className="p-2 text-center w-full border-r border-l border-[#aaaaaa] bg-gray-100"
                    readOnly
                  />
                  <button className="p-2 text-blue-800">
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
                <div
                  className="flex border-1 border-[#aaaaaa] items-center w-1/2 rounded-md"
                  style={{ backgroundColor: "#fcfcfc" }}
                >
                  <button
                    onClick={() => setBetAmount(Math.max(0, betAmount - 100))}
                    className="p-2 text-blue-800"
                  >
                    <span className="text-sm font-bold">−</span>
                  </button>
                  <input
                    type="text"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    className="p-2 text-center border-l border-[#aaaaaa] w-full border-r bg-gray-100"
                  />
                  <button
                    onClick={() => setBetAmount(betAmount + 100)}
                    className="p-2 text-blue-800 rounded-xl"
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 mt-2 gap-2 mb-2">
                {betAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleBetAmountChange(amount)}
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
        </div>
      ) : null}
    </>
  );
};

const TeamCard = ({ data, mainData, handleBackClick, index, teamname }) => {
  //(data, "assssssssssssssssssssssssssssssss");
  if (!data) return null;
  return (
    <div className=" flex flex-col">
      <div className=" text-sm font-bold text-black w-full text-center ">
        {teamname}
      </div>
      <div
        onClick={() =>
          handleBackClick(
            0,
            "toss",
            data,
            data.odds[0]?.odds,
            mainData[0].mname,
            mainData[0].gmid,
            mainData[0].mid,
            data.odds[0]?.size
          )
        }
        className=" flex items-center border border-gray-300 flex-col bg-[#72e3a0] justify-center pr-10 pl-10 "
      >
        <p className=" font-bold text-black text-sm "> {data.odds[0]?.odds} </p>
        <p className=" text-black  text-sm">{data.odds[0]?.size} </p>
      </div>
    </div>
  );
};
