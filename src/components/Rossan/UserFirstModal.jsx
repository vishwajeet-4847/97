import { useState } from "react";
import UserBookModal from "./UserBookModal";

export default function UserFirtsModal({openUserBook}) {
    const [show, setShow] = useState (false)
    return (
        <>
        <div className="fixed inset-0 p-2 flex  justify-center top-0 z-20">
      <div className="w-full max-w-lg h-[230px] bg-white shadow-lg rounded-sm overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-900 text-white px-4 py-3">
          <h2 className="text-lg font-bold">User Book</h2>
          <button onClick={()=>openUserBook(false)} className="text-xl font-bold" >&times;</button>
        </div>
      <div className=" mt-3 max-w-xs mx-auto border rounded-md overflow-hidden">
        <ul className="divide-y divide-gray-300">
          <li className="p-3">Match Odds</li>
          <li onClick={()=>setShow(true)} className="p-3">Bookmaker</li>
          <li className="p-3">Lunch Favourite</li>
        </ul>
      </div>
      </div></div>
      {
        show ? <UserBookModal setShow= {setShow}/> : null
      }
       </>
    );
  }
  