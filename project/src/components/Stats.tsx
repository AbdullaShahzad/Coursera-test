'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
}

export default function Stats() {
  const stats = [
    { title: 'Total Sequences', value: '24', trend: '+12%' },
    { title: 'Open Rate', value: '68%', trend: '+5%' },
    { title: 'Response Rate', value: '42%', trend: '+8%' },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
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
  );
} 