import { createClient } from '@supabase/supabase-js';

// Essas variáveis vão pegar as chaves secretas que vamos colocar lá na Vercel depois
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);