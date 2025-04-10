import { useLocation } from "react-router";
import UserMatchDetails from "./UserMatchDetails";


const UserMatchDetailsWrapper = () => {
    const location = useLocation();
    return <UserMatchDetails key={location.search} />;
  };

export default UserMatchDetailsWrapper