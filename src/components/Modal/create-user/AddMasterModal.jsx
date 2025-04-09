

import "react-toastify/dist/ReactToastify.css"; 

import ModalWrapper from "../ModalWrapper";
import AddMasterForm from "./AddMasterForm";


const AddMasterModal = ({ isOpen, onClose , onSubmit , title }) => {

  
  

 
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title={"Add "+title}>
      <AddMasterForm onSubmit={onSubmit} />
    
    </ModalWrapper>
  );
};

export default AddMasterModal;
