import axios from "axios";

export const postLeaderboard = async () =>{
  return await axios.post("http://localhost:8890/api/leaderboard/generate")
}

export const getLeaderboard = async (mode = "single", difficulty = "classic") => {
  return await axios.get("http://localhost:8890/api/leaderboard", {
    params: { mode, difficulty },
  });
};
