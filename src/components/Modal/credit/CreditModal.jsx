import React, { useContext } from 'react'
import ModalWrapper from '../ModalWrapper'
import CreditMasterForm from './CreditMasterForm'
import { AuthContext } from '../../../services/auth/auth.context'
import { AccountContext } from '../../../services/account/account.context'
import { getUserType } from '../../../utils/user_type_converter'

const CreditModal = ({ isOpen, onClose , selectedUserId ,userTypeCode  }) => {
  
  
  const { user } = useContext(AuthContext);
   const { onInsertInWallet ,onGetDownLineData } = useContext(AccountContext);
   const onSubmit = async (data) => {
    const payload = {
      ...data,
      user_id: user.user_id, 
      c_id:selectedUserId.fs_id,
    };
  
    await onInsertInWallet(payload); // Use the correctly structured payload
    await onGetDownLineData(user.user_id, userTypeCode);
    onClose();
  };
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={"Banking master balanace"} >
      <div className="flex w-full justify-around items-center">
      <div  className="flex items-center gap-2 text-blue-500" >
      
          <span className={`px-2 py-1 text-xs font-bold rounded bg-green-500 text-white `}  >
            {getUserType(userTypeCode)}
          </span>
    
        <span className="text-blue-500">{selectedUserId && selectedUserId.user_id}</span>

        
      </div>
      <div>
       RS. {
        selectedUserId &&  selectedUserId.balance
        }
      </div>

      </div>
      <CreditMasterForm   onSubmit={onSubmit}/>
    </ModalWrapper>
  )
}

export default CreditModal