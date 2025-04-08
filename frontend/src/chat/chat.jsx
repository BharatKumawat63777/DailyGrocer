import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import ReactMarkdown from "react-markdown";
import "./chat.css";

const chat = () => {
  const { url } = useContext(StoreContext);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  const handleSend = async () => {
    const res = await axios.post(url + "/api/chat", { prompt });

    setReply(res.data.completion.choices[0].message.content);
  };

  return (
    <div className="chat-container">
      <div className="input-area">
        <textarea
          placeholder="Ask something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="chat-input"
        ></textarea>
        <button onClick={handleSend} className="send-button">
          Send
        </button>
      </div>

      <div className="reply-section">
        <strong>AI Reply:</strong>
        <div className="ai-reply">
          <div className="ai-reply-text">
            <ReactMarkdown>{reply}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chat;
