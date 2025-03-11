import { supabase } from '@/lib/supabase';

export interface Email {
  id: number;
  subject: string;
  content: string;
  delay: string;
  status: 'Active' | 'Draft';
  sequence_id: number;
  created_at: string;
}

export async function getEmailsBySequenceId(sequenceId: number) {
  const { data, error } = await supabase
    .from('emails')
    .select('*')
    .eq('sequence_id', sequenceId)
    .order('delay');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createEmail(email: Partial<Email>) {
  const { data, error } = await supabase
    .from('emails')
    .insert([email])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function updateEmail(id: number, email: Partial<Email>) {
  const { data, error } = await supabase
    .from('emails')
    .update(email)
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function deleteEmail(id: number) {
  const { error } = await supabase
    .from('emails')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
} 