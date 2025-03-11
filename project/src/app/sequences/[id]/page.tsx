'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/AppLayout';
import { motion } from 'framer-motion';
import { 
  Mail, Clock, Users, Edit, Trash2, Play, Pause, 
  ChevronDown, ChevronUp, Settings, Plus, ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';
import { getSequenceById, updateSequence, Sequence } from '@/services/sequenceService';
import { getEmailsBySequenceId, Email, deleteEmail } from '@/services/emailService';

export default function SequenceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  
  const [sequence, setSequence] = useState<Sequence | null>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [expandedEmails, setExpandedEmails] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const sequenceData = await getSequenceById(id);
        setSequence(sequenceData);
        
        const emailsData = await getEmailsBySequenceId(id);
        setEmails(emailsData);
      } catch (err) {
        setError('Failed to load sequence data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  const toggleEmail = (emailId: number) => {
    if (expandedEmails.includes(emailId)) {
      setExpandedEmails(expandedEmails.filter(id => id !== emailId));
    } else {
      setExpandedEmails([...expandedEmails, emailId]);
    }
  };

  const toggleSequenceStatus = async () => {
    if (!sequence) return;
    
    try {
      const newStatus = sequence.status === 'Active' ? 'Draft' : 'Active';
      const updated = await updateSequence(id, { status: newStatus });
      setSequence({...sequence, status: newStatus});
    } catch (err) {
      console.error('Failed to update sequence status:', err);
    }
  };

  const handleDeleteEmail = async (emailId: number) => {
    try {
      await deleteEmail(emailId);
      setEmails(emails.filter(email => email.id !== emailId));
    } catch (err) {
      console.error('Failed to delete email:', err);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  if (error || !sequence) {
    return (
      <AppLayout>
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
          {error || 'Sequence not found'}
        </div>
        <Link href="/sequences" className="text-blue-600 hover:underline">
          Back to sequences
        </Link>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <Link href="/sequences" className="flex items-center text-gray-600 hover:text-blue-600 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to sequences
        </Link>
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{sequence.name}</h1>
            <p className="text-gray-600 mt-1">{sequence.description}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href={`/sequences/${id}/edit`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <Edit size={16} />
                Edit
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <Settings size={16} />
              Settings
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={toggleSequenceStatus}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                sequence.status === 'Active' 
                  ? 'bg-red-50 text-red-600 border border-red-200' 
                  : 'bg-green-50 text-green-600 border border-green-200'
              }`}
            >
              {sequence.status === 'Active' ? <Pause size={16} /> : <Play size={16} />}
              {sequence.status === 'Active' ? 'Pause' : 'Activate'}
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <Mail className="text-blue-600" />
            <h3 className="font-medium">Total Emails</h3>
          </div>
          <p className="text-3xl font-bold">{emails.length}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-green-600" />
            <h3 className="font-medium">Open Rate</h3>
          </div>
          <p className="text-3xl font-bold">{sequence.open_rate || '0%'}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-purple-600" />
            <h3 className="font-medium">Click Rate</h3>
          </div>
          <p className="text-3xl font-bold">{sequence.click_rate || '0%'}</p>
        </motion.div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Emails in Sequence</h2>
          <Link href={`/sequences/${id}/emails/new`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm"
            >
              <Plus size={16} />
              Add Email
            </motion.button>
          </Link>
        </div>
        
        {emails.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No emails in this sequence yet. Click "Add Email" to create your first email.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {emails.map((email) => (
              <div key={email.id}>
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleEmail(email.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Mail className={`${
                        email.status === 'Active' ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-medium">{email.subject}</h3>
                        <p className="text-sm text-gray-500">Delay: {email.delay} days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        email.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {email.status}
                      </span>
                      {expandedEmails.includes(email.id) ? 
                        <ChevronUp size={18} className="text-gray-400" /> : 
                        <ChevronDown size={18} className="text-gray-400" />}
                    </div>
                  </div>
                </div>
                
                {expandedEmails.includes(email.id) && (
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: email.content}}></div>
                    
                    <div className="flex gap-3 mt-4">
                      <Link href={`/sequences/${id}/emails/${email.id}/edit`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                        >
                          Edit
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleDeleteEmail(email.id)}
                        className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-sm"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
} 