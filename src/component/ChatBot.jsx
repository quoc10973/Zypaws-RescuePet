import { useState } from "react";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn về Zypaws Rescue Home?" }
    ]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]); // Cập nhật tin nhắn mà không bị mất dữ liệu cũ
        setInput("");

        setTimeout(() => {
            const botResponse = { sender: "bot", text: getBotResponse(input) };
            setMessages(prev => [...prev, botResponse]); // Giữ nguyên danh sách tin nhắn
        }, 1000);
    };

    const getBotResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes("adopt")) return "You can view the list of pets available for adoption on our website.";
        if (lowerMessage.includes("donate")) return "You can donate through the 'Donation' page to support us.";
        if (lowerMessage.includes("contact")) return "You can reach us via email at support@zypaws.com or call us at 0123-456-789.";
        return "Sorry, I don't understand your question. Please try asking again!";

    };

    return (
        <div className="fixed bottom-5 z-50 right-5  ">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 text-white p-3 rounded-full shadow-lg animate-heartbeat hover:bg-blue-600 transition"
                >
                    <AiOutlineMessage size={24} />
                </button>
            )}

            {isOpen && (
                <div className="w-80 bg-white p-4 rounded-2xl shadow-2xl border border-gray-200 relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                    >
                        <AiOutlineClose size={20} />
                    </button>

                    <div className="h-64 overflow-y-auto mb-2 border-b pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg mb-2 text-sm max-w-[80%] ${msg.sender === "bot"
                                    ? "bg-blue-100 text-blue-800 self-start"
                                    : "bg-gray-200 text-gray-800 self-end"
                                    }`}
                            >
                                <strong>{msg.sender === "bot" ? "Bot" : "Bạn"}:</strong> {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nhập tin nhắn..."
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
