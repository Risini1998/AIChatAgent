"use client";
import { useEffect, useRef, useState } from "react";

type IMessage = {
  role: "user" | "bot";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: IMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setInput("");

    // const res = await fetch("http://localhost:8000/chat", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ question: input }),
    // });

    // const data = await res.json();
    const botMessage: IMessage = {
      role: "bot",
      content: input,
    };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen p-8 bg-gray-100 justify-center items-center">
      {messages.length === 0 && (
        <span className=" text-2xl text-gray-700 font-bold p-4">
          How can I help you, today?
        </span>
      )}
      {messages.length > 0 && (
        <div className="w-full flex-1 overflow-auto p-4 bg-white rounded-md shadow">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-5 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg text-gray-600 max-w-[80%] shadow ${
                  msg.role === "user" ? "bg-gray-100" : "bg-gray-300"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500 italic">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>
      )}
      <div className="w-full mt-4 flex gap-2 justify-center">
        <div className="w-full flex max-h-[300px]">
          <textarea
            // rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="w-full flex p-2 border rounded-lg border-gray-400 bg-gray-200 text-black items-center h-12"
            placeholder="Ask me anything..."
          />
        </div>
        <button
          onClick={handleSend}
          className="bg-gray-700 rounded-lg text-white px-4 py-3 h-fit"
        >
          <img src="/send.svg" alt="send-icon" className="w-8 h-6" />
        </button>
      </div>
    </div>
  );
}

