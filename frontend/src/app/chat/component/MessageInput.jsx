export default function MessageInput({
  message,
  setMessage,
  sendMessage,
  handleTyping,
}) {
  return (
    <div className="bg-white p-3 border-t border-gray-200">
      <div className="flex items-center">
        <div className="flex-1 relative">
          <input
            className="w-full p-3 pr-12 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message"
          />
        </div>
        <button
          onClick={sendMessage}
          className="ml-2 h-10 w-10 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={!message.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
