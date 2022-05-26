import axios from "axios";

//Mutliplayer game
export const checkConnectionPool = async (userName, languageName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/multiplayerconnection/check?userName=${userName}&languageName=${languageName}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const createConnection = async (userName, languageName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/multiplayerconnection/create?userName=${userName}&languageName=${languageName}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const startBattle = async (connectionID, userName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `/multiplayergames/start?connectionID=${connectionID}&userName=${userName}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getBattle = async (gameID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `multiplayergames/data?gameID=${gameID}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const hasBattleStarted = async (connectionID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `multiplayergames/check?connectionID=${connectionID}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteConnection = async (connectionID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.get(
      `multiplayergames/delete?connectionID=${connectionID}`,
      config
    );
  } catch (err) {
    console.log(err);
  }
};

//Friendly battle
export const getInviteCode = async (userName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/friend/generate?userName=${userName}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const hasFriendlyBattleStarted = async (gameID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/friend/check?gameID=${gameID}`, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getFriendlyBattleData = async (gameID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/friend/battleData?gameID=${gameID}`, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const findMutualGame = async (inviteCode) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(`/friend/find?code=${inviteCode}`, config);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const shouldIstartMutualGame = async (gameID, userName) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `/friend/start?gameID=${gameID}&userName=${userName}`,
      config
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFriendlyBattle = async (gameID) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.get(`/friend/delete?gameID=${gameID}`, config);
  } catch (err) {
    console.log(err);
  }
};
