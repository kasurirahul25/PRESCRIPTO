import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaComments, FaUserClock } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Setup SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + " " + transcript);
      };

      recognition.onerror = (err) => {
        console.error("Speech recognition error:", err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, activeTab]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const timestamp = new Date();
    const newMessages = [
      ...messages,
      { sender: "user", text: input, time: timestamp },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: data.answer || "Sorry, I couldn't understand that.",
          time: new Date(),
        },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Error connecting to AI server", time: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Start / Stop recording
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // Filter last 7 days history
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentMessages = messages.filter((msg) => new Date(msg.time) >= oneWeekAgo);

  return (
    <div>
      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-96 h-[520px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50">
          {/* Header */}
          <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/chatbot.png"
                alt="Agent"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div>
                <div className="font-semibold text-sm">George, AI Agent</div>
                <div className="text-xs text-green-300">🟢 24/7 Online</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl">
              ✕
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(activeTab === "chat"
                ? messages
                : activeTab === "history"
                ? recentMessages
                : messages
              ).map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] px-4 py-2 text-sm rounded-xl break-words ${
                    msg.sender === "user"
                      ? "bg-blue-100 text-right ml-auto"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  {msg.text}
                  {activeTab === "history" && (
                    <div className="text-[10px] text-gray-500 mt-1">
                      {new Date(msg.time).toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
              {loading && activeTab !== "history" && (
                <div className="text-gray-400 text-sm">George is typing...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {(activeTab === "chat" || activeTab === "voice") && (
              <div className="p-3 border-t flex gap-2 items-end bg-white">
                <textarea
                  ref={textareaRef}
                  placeholder={
                    activeTab === "voice" ? "Speak or type here..." : "Type here"
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  className="flex-1 bg-[#f0f4ff] text-sm px-4 py-2 rounded-lg resize-none focus:outline-none overflow-y-auto max-h-[120px]"
                />
                {activeTab === "voice" && (
                  <button
                    onClick={toggleRecording}
                    className={`${
                      isRecording ? "bg-red-500" : "bg-blue-500"
                    } py-2 px-3 hover:opacity-80 text-white rounded-full self-end`}
                  >
                    <FaMicrophone size={18} />
                  </button>
                )}
                <button
                  onClick={handleSend}
                  className="bg-green-500 py-2 pl-3 pr-3 hover:bg-green-600 text-white p-2 rounded-full self-end"
                >
                  ➤
                </button>
              </div>
            )}

            {/* Bottom Navigation */}
            <div className="border-t bg-white flex justify-around items-center text-center py-2">
              <div
                onClick={() => setActiveTab("chat")}
                className={`flex flex-col items-center cursor-pointer ${
                  activeTab === "chat"
                    ? "text-blue-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                <FaComments size={18} />
                <span className="text-xs mt-1">Chat</span>
              </div>
              <div
                onClick={() => setActiveTab("voice")}
                className={`flex flex-col items-center cursor-pointer ${
                  activeTab === "voice"
                    ? "text-blue-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                <FaMicrophone size={18} />
                <span className="text-xs mt-1">Voice Chat</span>
              </div>
              <div
                onClick={() => setActiveTab("history")}
                className={`flex flex-col items-center cursor-pointer ${
                  activeTab === "history"
                    ? "text-blue-900 font-semibold"
                    : "text-gray-500"
                }`}
              >
                <FaUserClock size={18} />
                <span className="text-xs mt-1">History</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <img
        src="/src/assets/chatbot.png"
        alt="Chatbot"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 fixed bottom-5 right-5 cursor-pointer rounded-full shadow-lg hover:scale-110 transition-transform duration-200 bg-white border p-2"
      />
    </div>
  );
};

export default Chatbot;
