'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PerformanceChart() {
  const data = [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 72 },
    { name: 'Wed', value: 85 },
    { name: 'Thu', value: 78 },
    { name: 'Fri', value: 90 },
    { name: 'Sat', value: 87 },
    { name: 'Sun', value: 92 },
  ];

  return (
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
  );
} 