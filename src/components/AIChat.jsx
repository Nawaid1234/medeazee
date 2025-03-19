import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Provide a structured answer in this format:
      - Diagnosis: [Brief explanation]
      - Symptom: [List symptoms]
      - Treatmen: [List treatments]
      - Precaution: [List precautions]
      
      Question: ${input} don't give "*" in the response.`;

      const result = await model.generateContent(prompt);
      const botResponse = { text: result.response.text(), sender: "bot" };
      

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...messages, { text: "Error fetching response", sender: "bot" }]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">AI Medical Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2 rounded-lg flex flex-col gap-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br>") }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your medical query..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
