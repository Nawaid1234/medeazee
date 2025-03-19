const fetchChatResponse = async (userMessage) => {
    try {
      const response = await fetch("https://api.deepseek.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          message: userMessage // Ye user ka input hoga
        })
      });
  
      const data = await response.json();
      console.log("API Response:", data);
      return data; // Isko UI me show karne ke liye use kar sakte ho
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };
  