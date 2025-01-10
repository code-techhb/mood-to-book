export const analyzeMood = async (mood) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/analyze-and-recommend`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Server response error:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      });
      throw new Error(`Error 💔: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.mood) {
      console.error("No mood in response:", data);
      throw new Error("Invalid response format");
    }
    return data.mood;
  } catch (error) {
    console.error("Error in analyzeMood:", error);
    throw error;
  }
};
