import React, { useState } from 'react'
import RadioBtn from './RadioBtn'
import ViewMore from './ViewMore'
import BetTable from './BetTable'

const BottomMarket = () => {
    const [LiveClicked, setLiveClkd] = useState(false)
    const [isChecked , setIsChecked] = useState (false)
  return (
    <>
    <div className="w-full max-w-md mx-auto p-2 rounded-md bg-gray-100 mt-2">
        <div className="bg-gray-800 flex text-white px-4 py-2 font-semibold"><p>Live Bet</p> <RadioBtn isChecked={isChecked} setIsChecked={() => setIsChecked(!isChecked)}/> <p>Partnership Book</p> <RadioBtn /> <p onClick={()=>setLiveClkd(true)}>View More</p></div>
    </div>
    {
      isChecked ?  <BetTable /> : null
    }
    
    {
        LiveClicked ? <ViewMore setLiveClkd={setLiveClkd}/> : null
    }
    </>
    
  )
}

export default BottomMarket
