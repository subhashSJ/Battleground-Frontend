import axios from "axios";

//If we have token, we will send it with every request
const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common["x-auth-token"] = token;
    }else{
        delete axios.defaults.headers.common["x-auth-token"]
    }
}

export default setAuthToken;