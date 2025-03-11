'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

export default function AiChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
              <h3 className="font-semibold">AI Assistant</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(false)}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                👋 Hi! I'm your AI assistant. How can I help you with your email sequences today?
              </div>
              
              {/* Chat input */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <input 
                    type="text" 
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 focus:outline-none"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 