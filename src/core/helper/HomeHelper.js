import axios from "axios";

//Get all languages available
export const getAllLanguages = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/languages", config);
    return res
  } catch (err) {
    console.log(err);
  }
};


export const getSinglePlayerLeaderboard = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const res = await axios.get("/usertrophies/single?languageName=CSS", config);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  

  export const getMultiPlayerLeaderboard = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const res = await axios.get("/usertrophies/multi?languageName=CSS", config);
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  