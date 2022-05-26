import axios from "axios";

//Get a random battle
export const getARandomBattle = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("/battles/random", config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

//Submit code : single player battle
export const convertCodeToImage = async (code) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ code });

  try {
    const res = await axios.post("/accuracy/convert", body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const compareTargetAndOutput = async (target, output) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/accuracy/compare?target=${target}&output=${output}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

//single player submit
export const getMeBestScore = async (userName, battleID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/singleplayergames/bestScore?userName=${userName}&battleID=${battleID}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateMyGame = async (userName, battleID, score, code) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ userName, battleID, score, code });

  try {
    const res = await axios.post(`/singleplayergames/update`, body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createMyGame = async (userName, battleID, score, code) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ userName, battleID, score, code });

  try {
    const res = await axios.post(`/singleplayergames/create`, body, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const submitMultiPlayerBattle = async (gameID, userName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/multiplayergames/submit?gameID=${gameID}&userName=${userName}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

//Submit friendly battle
export const submitFriendlyBattle = async (gameID, userName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/friend/winner?gameID=${gameID}&userName=${userName}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
