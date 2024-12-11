"use client"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client";

let socket:any = null;
const Chat = () => {

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([]);
    useEffect(() => {
        const socketInitializer = async () => {
          await fetch('/api/socket');
          socket = io();
    
          socket.on('receiveMessage', (message:any) => {
            setMessages((prevMessages) => [...prevMessages, message]);
          });
        };
    
        socketInitializer();
    
        return () => {
          if (socket) {
            socket.disconnect();
          }
        };
      }, []);
    const sendMessage = () => {
        if(message) {
            socket.emit('sendMessage', message);
            setMessage('');
        }
    }
    return(
        <>
      {/* Message List */}
      <div className="max-w-lg mx-auto p-4 space-y-4 bg-gray-100 rounded-lg shadow-lg h-[400px] overflow-y-auto">
        {messages.map((msg, index) => (
          <section key={index} className="flex items-start">
                <p className="ml-2 w-12 h-12 bg-green-500 text-white border-2 border-white rounded-full flex items-center justify-center shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                {/* Placeholder for User's Avatar */}
                U
                </p>
                <p className="ml-3 p-2 max-w-xs bg-green-100 text-black rounded-lg">
                {msg}
                </p>
          </section>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex justify-between items-center mt-4 max-w-lg mx-auto">
        <input
          type="text"
          value={message}
          className="w-11/12 p-2 border-2 border-green-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green bg-white text-black"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter text here"
        />

        {/* Send Button */}
        <button
          onClick={sendMessage}
          className="ml-2 w-12 h-12 bg-green-500 text-white border-2 border-white rounded-full flex items-center justify-center shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          <span className="text-xl">➤</span>
        </button>
      </div>
    </>
    )
}

export default Chat;