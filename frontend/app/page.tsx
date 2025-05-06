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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      content: "hi jddfjdfjjg jsjdjdf jdhjksdjdfj jdfjdfjdfjdf",
    };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-auto p-4 bg-white rounded shadow">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex mb-5 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded text-gray-600 max-w-[80%] ${
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
      <div className="w-full mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-2 border rounded-l border-gray-400 bg-gray-300 text-black w-[60%]"
          placeholder="Ask me anything..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}

