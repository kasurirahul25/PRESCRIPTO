import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50">
            <div className="bg-blue-100 p-2 rounded-lg self-start w-fit">
              👋 Hello! How can I help you today?
            </div>
            <div className="bg-gray-200 p-2 rounded-lg self-end w-fit">
              Hi, I need some help!
            </div>
          </div>

          {/* Input Area */}
          <div className="p-2 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-500 text-white px-3 rounded-lg hover:bg-blue-600">
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Button */}
      <img
        src="/src/assets/chatbot.png"
        alt="chatbot"
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 fixed bottom-5 right-5 cursor-pointer rounded-full shadow-lg hover:scale-105 transition-transform duration-200 bg-blue-50 p-2"
      />
    </div>
  );
}
