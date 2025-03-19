import { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "https://api.deepseek.com/chat",
        { message: input },
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}` },
        }
      );

      const botMessage = { text: response.data.answer, sender: "bot" };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([...messages, userMessage, { text: "Error fetching response", sender: "bot" }]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">AI Medical Chat</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2 rounded-lg">
        {messages.map((msg, index) => (
          <p key={index} className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}>
            {msg.text}
          </p>
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
