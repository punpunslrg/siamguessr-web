import axios from "axios";

export const gameApi = axios.create({
  baseURL: "http://localhost:8890/api/game",
});

export const getRandomLocation = () => gameApi.get("/random-location");

export const createRoom = async (roomData) => {
  try {
    // You will need to replace this with your actual API endpoint for creating a room
    // For example: const response = await axios.post(`${API_URL}/rooms`, roomData);
    // You'll also need to handle authentication, likely by sending a token in the headers.

    // --- MOCK RESPONSE FOR NOW ---
    console.log("Creating room with data:", roomData);
    const mockRoomId = `room_${Math.random().toString(36).substr(2, 9)}`;
    const mockResponse = { data: { id: mockRoomId, ...roomData } };
    // --- END MOCK RESPONSE ---

    return mockResponse.data; // Return the created room object
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

export const getRoomDetails = async (roomId) => {
  try {
    // --- MOCK RESPONSE FOR NOW ---
    console.log(`Fetching details for room: ${roomId}`);
    const mockResponse = {
      data: {
        id: roomId,
        code: "ABCDE",
        mode: "multi",
        difficulty: "classic",
        maxPlayers: 2,
        hostId: "user_placeholder_id_123",
        players: [
          {
            userId: "user_placeholder_id_123",
            username: "Player 1",
            image: "https://placehold.co/100x100/7e22ce/white?text=P1",
          },
          {
            userId: "user_placeholder_id_456",
            username: "Player 2",
            image: "https://placehold.co/100x100/1e40af/white?text=P2",
          },
        ],
      },
    };
    // --- END MOCK RESPONSE ---

    // Replace with your actual API call:
    // const response = await axios.get(`${API_URL}/rooms/${roomId}`);
    // return response.data;
    return mockResponse.data;
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error;
  }
};
