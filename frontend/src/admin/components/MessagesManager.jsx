import { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, Clock, User } from 'lucide-react';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      // Get messages from localStorage for now
      const localMessages = localStorage.getItem('contactMessages');
      if (localMessages) {
        setMessages(JSON.parse(localMessages));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = (id) => {
    if (confirm('Delete this message?')) {
      const updatedMessages = messages.filter(msg => msg.id !== id);
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      setSelectedMessage(null);
    }
  };

  const markAsRead = (id) => {
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-4 w-1/3"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Messages</h2>
          <p className="text-gray-400 mt-1">View and manage contact form submissions</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {messages.filter(m => !m.read).length} unread messages
          </span>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">No Messages Yet</h3>
          <p className="text-gray-500">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Inbox ({messages.length})</h3>
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  if (!message.read) markAsRead(message.id);
                }}
                className={`glass-card p-4 cursor-pointer hover:-translate-y-1 transition-transform ${
                  !message.read ? 'border-[var(--color-neon-green)]/30' : 'border-gray-700'
                } ${selectedMessage?.id === message.id ? 'ring-2 ring-[var(--color-neon-blue)]' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--color-neon-blue)]" />
                    <span className="font-bold text-white">{message.name}</span>
                    {!message.read && (
                      <span className="w-2 h-2 bg-[var(--color-neon-green)] rounded-full"></span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {formatDate(message.timestamp)}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">{message.email}</p>
                <p className="text-sm text-gray-300 line-clamp-2">{message.message}</p>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div>
            {selectedMessage ? (
              <div className="glass-card p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold">Message Details</h3>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">From</label>
                    <div className="bg-[var(--color-cyber-dark)] p-3 rounded border border-gray-700">
                      <p className="text-white font-bold">{selectedMessage.name}</p>
                      <p className="text-[var(--color-neon-blue)] text-sm">{selectedMessage.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Received</label>
                    <div className="bg-[var(--color-cyber-dark)] p-3 rounded border border-gray-700">
                      <p className="text-gray-300">{formatDate(selectedMessage.timestamp)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <div className="bg-[var(--color-cyber-dark)] p-4 rounded border border-gray-700 min-h-[120px]">
                      <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: Your message&body=Hi ${selectedMessage.name},%0D%0A%0D%0A`}
                      className="flex-1 px-4 py-2 bg-[var(--color-neon-green)] text-black rounded hover:bg-[#00e63a] transition-colors text-center font-medium"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">Select a Message</h3>
                <p className="text-gray-500">Click on a message to view details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManager;