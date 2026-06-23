import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice.js";

export const getCurrentUser = async (dispatch) => {
    try{
        const result = await axios.get(serverUrl + "/api/user/currentuser", {
            withCredentials: true
        });
        dispatch(setUserData(result.data.user));    
    }catch(error){
        console.error(`getCurrentUser API error: ${error.message}`);
    }
}
