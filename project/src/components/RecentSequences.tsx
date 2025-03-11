'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function RecentSequences() {
  const sequences = [
    { id: 1, name: 'Welcome Series', status: 'Active', emails: 5 },
    { id: 2, name: 'Follow-up Campaign', status: 'Draft', emails: 3 },
    { id: 3, name: 'Product Launch', status: 'Scheduled', emails: 4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">Recent Sequences</h2>
      <div className="space-y-4">
        {sequences.map((sequence) => (
          <Link key={sequence.id} href={`/sequences/${sequence.id}`}>
            <motion.div
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
          </Link>
        ))}
      </div>
    </motion.div>
  );
} 