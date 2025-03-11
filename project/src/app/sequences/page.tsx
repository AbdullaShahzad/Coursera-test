'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import { ChevronRight, PlusCircle, Mail } from 'lucide-react';
import { getSequences, Sequence } from '@/services/sequenceService';

export default function SequencesPage() {
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSequences() {
      try {
        const data = await getSequences();
        setSequences(data);
      } catch (err) {
        setError('Failed to load sequences');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSequences();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
          {error}
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Email Sequences</h1>
        <Link href="/sequences/new">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <PlusCircle size={18} />
            New Sequence
          </motion.button>
        </Link>
      </div>

      {sequences.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500 mb-4">You don't have any sequences yet.</p>
          <Link href="/sequences/new">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Create your first sequence
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-500">
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Emails</div>
            <div className="col-span-1"></div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {sequences.map((sequence) => (
              <Link key={sequence.id} href={`/sequences/${sequence.id}`}>
                <motion.div
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  className="grid grid-cols-12 gap-4 p-4 items-center"
                >
                  <div className="col-span-5">
                    <div className="font-medium">{sequence.name}</div>
                    <div className="text-sm text-gray-500">{sequence.description}</div>
                  </div>
                  <div className="col-span-2 text-gray-600">{sequence.type}</div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sequence.status === 'Active' ? 'bg-green-100 text-green-700' :
                      sequence.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {sequence.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1">
                    <Mail size={16} className="text-gray-400" />
                    <span>{sequence.emails_count || 0}</span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
} 