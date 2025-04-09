import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function ListMarket() {
    const [data, setData] = useState([])
    const fetchLiveGame = async() =>{
        try {
            const response = await axios.get("https://titan97.live/get-matchlist/4")
            console.log(response.data.data);
            setData(response?.data?.data)
        } catch (error) {
          console.log(error);
            
        }
    }
    useEffect(()=>{
      fetchLiveGame()
    },[])
    return (
      <div className="w-full max-w-md mx-auto p-2 rounded-md bg-gray-100 mt-2">
        <div className="bg-gray-800 text-white px-4 py-2 font-semibold">Cricket</div>
        {
            data?.t1?.map((value)=>(
                <div key={value.cid} className="flex justify-between  items-center p-4">
                <Link to={`/MarketDetail/${value.gmid}`} className="text-blue-600 hover:underline font-medium">
                  {value.ename}
                </Link>
                <span className="text-gray-700 font-semibold">Total Bets 26</span>
              </div>
            ))
        }
        {
            data?.t2?.map((value)=>(
                <div key={value.cid} className="flex justify-between  items-center p-4">
                <Link to={`/MarketDetail/${value.gmid}`} className="text-blue-600 hover:underline font-medium">
                  {value.ename}
                </Link>
                <span className="text-gray-700 font-semibold">Total Bets 26</span>
              </div>
            ))
        }
        
      </div>
    );
  }