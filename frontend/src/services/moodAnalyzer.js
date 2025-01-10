export const analyzeMood = async (mood) => {
  try {
    console.log("Sending mood to analyze:", mood); // Debug log

    const response = await fetch(
      "http://localhost:5089/api/analyze-and-recommend",
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
      throw new Error(
        `Failed to analyze mood: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Server response:", data); // Debug log

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
