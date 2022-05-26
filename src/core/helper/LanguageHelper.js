import axios from "axios";

//Get all battles available
export const getAllBattles = async (categorie) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // const route = "/battles/allBattles?categoryTitle="+;
    const res = await axios.get(`/battles/allBattles?categoryTitle=${categorie}`, config);
    //const res2 = await axios.get("/battles/allBattles?categoryTitle=Pilot Battle", config);
    
    return res
  } catch (err) {
    console.log(err);
  }
};
