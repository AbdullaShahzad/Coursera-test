import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Clock,
  BarChart3,
  Shield,
  Menu,
  X,
  Home,
  Settings,
  LogOut,
  User,
  MessageSquare,
  Zap,
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 72 },
  { name: 'Wed', value: 85 },
  { name: 'Thu', value: 78 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 87 },
  { name: 'Sun', value: 92 },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-xl">EmailFlow</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {['dashboard', 'sequences', 'templates', 'analytics'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg capitalize ${
                    activeTab === tab ? 'text-blue-600 font-semibold' : 'text-gray-600'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <User className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40"
          >
            <div className="p-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold"
              >
                <PlusCircle className="w-5 h-5" />
                New Sequence
              </motion.button>

              <div className="mt-6 space-y-2">
                {[
                  { icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
                  { icon: <Mail className="w-5 h-5" />, label: 'Sequences' },
                  { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
                  { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
                ].map((item) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ x: 5 }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-blue-600 rounded-lg"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`pt-16 ${isSidebarOpen ? 'md:pl-64' : ''} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Total Sequences', value: '24', trend: '+12%' },
              { title: 'Open Rate', value: '68%', trend: '+5%' },
              { title: 'Response Rate', value: '42%', trend: '+8%' },
            ].map((stat) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="text-green-500 text-sm">{stat.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4">Email Performance</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ fill: '#2563eb' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4">Recent Sequences</h2>
              <div className="space-y-4">
                {[
                  { name: 'Welcome Series', status: 'Active', emails: 5 },
                  { name: 'Follow-up Campaign', status: 'Draft', emails: 3 },
                  { name: 'Product Launch', status: 'Scheduled', emails: 4 },
                ].map((sequence) => (
                  <motion.div
                    key={sequence.name}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{sequence.name}</h3>
                      <p className="text-sm text-gray-500">{sequence.emails} emails</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        sequence.status === 'Active' ? 'bg-green-100 text-green-700' :
                        sequence.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {sequence.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* AI Chatbot */}
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
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;