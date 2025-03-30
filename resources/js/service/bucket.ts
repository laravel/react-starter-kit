import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://rbuqmnhadlqtaxfebjzj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY; // Ganti dengan kunci API dari Supabase

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase ;
