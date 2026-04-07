import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Send, X } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: string;
}

export function TelemedicineView({ onEndCall }: { onEndCall?: () => void }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to WebSocket server
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('Connected to chat server');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages((prev) => [...prev, message]);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from chat server');
    };

    wsRef.current = ws;

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatOpen]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'patient', // In a real app, this would be based on authenticated user
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    wsRef.current.send(JSON.stringify(message));
    setNewMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Live Consultation</h1>
        <p className="text-slate-500 mt-1">Dr. Sarah Jenkins • Cardiologist</p>
      </header>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Video Area */}
        <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden relative shadow-xl border border-slate-800 flex flex-col">
          {/* Main Video Area (Doctor) */}
          <div className="flex-1 relative">
            <img 
              src="https://picsum.photos/seed/dr1/1200/800" 
              alt="Doctor Video Feed" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6">
              <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                Dr. Sarah Jenkins
              </span>
            </div>
          </div>

          {/* Self View (Patient) */}
          <div className="absolute top-6 right-6 w-48 h-64 bg-slate-800 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-lg">
            {isVideoOff ? (
              <div className="w-full h-full flex items-center justify-center bg-slate-800">
                <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                  <span className="text-2xl text-slate-400">A</span>
                </div>
              </div>
            ) : (
              <img 
                src="https://picsum.photos/seed/patient/400/600" 
                alt="Self Video Feed" 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-3 left-3">
              <span className="bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded text-xs font-medium">
                You
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="h-24 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 flex items-center justify-center gap-6 px-8">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isMuted ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            
            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isVideoOff ? 'bg-red-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
            </button>

            <button 
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isChatOpen ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              <MessageSquare size={24} />
            </button>

            <button 
              onClick={onEndCall}
              className="w-16 h-16 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center transition-colors shadow-lg shadow-red-600/20 ml-4">
              <PhoneOff size={28} />
            </button>
          </div>
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <div className="w-80 bg-white rounded-3xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900">Chat</h3>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
                  <MessageSquare size={32} className="opacity-50" />
                  <p className="text-sm text-center">No messages yet.<br/>Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                        msg.sender === 'patient' 
                          ? 'bg-blue-600 text-white rounded-br-sm' 
                          : 'bg-slate-100 text-slate-900 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-slate-200 bg-white">
              <form onSubmit={sendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-2 text-sm transition-all outline-none"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shrink-0"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
