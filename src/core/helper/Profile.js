import axios from "axios";

export const getAUser = async (userName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/users?userName=${userName}`, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

// export const getAllBattles = async () => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const res = await axios.get("/users/battle", config);
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getAllPosition = async (userID, languageName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/users/position?userID=${userID}&languageName=${languageName}`,
      config
    );
    console.log("REs from positions", res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTotalBattles = async (userID, languageName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/users/total?userID=${userID}&languageName=${languageName}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getIsCompleted = async (userID, battleID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/users/battle?userID=${userID}&battleID=${battleID}`,
      config
    );
    console.log("res scompleted", res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (body) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/users/update`, body, config);
    console.log("res for update", res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
