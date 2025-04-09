import React, { useState } from 'react'
import BottomMarket from './BottomMarket'
import BetTable from './BetTable'
import UserBookModal from './UserBookModal'
import UserFirtsModal from './UserFirstModal'
const LiveStreaming = ({gmid}) => {
    const [userbook, openUserBook] = useState (false)
    
  return (
    <>
    <div className="w-full max-w-md mx-auto p-2 rounded-md bg-gray-100 mt-2">
        <div className="bg-gray-800 text-white px-4 py-2 font-semibold">Live Streaming</div>
       <iframe src={`https://titan97.live/get-livesports?gmid=${gmid}&sid=4`} frameBorder="0"></iframe>
    </div>
    <div className="w-full max-w-md mx-auto p-2 rounded-md bg-gray-100 mt-2">
        <div className="bg-gray-800 text-white px-4 py-2 font-semibold">Book</div>
       <div className='flex justify-between p-4'>
        <div>
        <div className="bg-gray-800 text-white px-4 py-1 font-semibold">Master Book</div>
        </div>
        <div>
        <div onClick={()=>openUserBook(!userbook)} className="bg-gray-800 text-white px-4 py-1 font-semibold">User Book</div>
        </div>
       </div>
    </div>
    <BottomMarket  />
    {/* <BetTable /> */}
    {
        userbook ? <UserFirtsModal openUserBook={openUserBook} /> : null
    }
    </>
  )
}

export default LiveStreaming
