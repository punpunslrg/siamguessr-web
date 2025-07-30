import axios from "axios";

export const actionGetSingleHistory = async (token) => {
  return await axios.get(
    "http://localhost:8890/api/game/game-history/singleplayer",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const actionGetMultiHistory = async () => {
  return await axios.get(
    "http://localhost:8890/api/game/game-history/multiplayer",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
