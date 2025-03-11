import { supabase } from '@/lib/supabase';

export interface Sequence {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Draft' | 'Scheduled';
  type: string;
  created_at: string;
  user_id: string;
  emails_count?: number;
  open_rate?: string;
  click_rate?: string;
}

export async function getSequences() {
  const { data, error } = await supabase
    .from('sequences')
    .select('*, emails(count)')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(sequence => ({
    ...sequence,
    emails: sequence.emails[0].count
  }));
}

export async function getSequenceById(id: number) {
  const { data, error } = await supabase
    .from('sequences')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createSequence(sequence: Partial<Sequence>) {
  const { data, error } = await supabase
    .from('sequences')
    .insert([sequence])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function updateSequence(id: number, sequence: Partial<Sequence>) {
  const { data, error } = await supabase
    .from('sequences')
    .update(sequence)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function deleteSequence(id: number) {
  const { error } = await supabase
    .from('sequences')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
} 