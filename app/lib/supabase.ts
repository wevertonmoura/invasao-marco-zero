import { createClient } from '@supabase/supabase-js';

// 1. Cole a URL do Projeto aqui dentro das aspas
const supabaseUrl = 'https://cnzbuqgkbkbehvtsgvvi.supabase.co';

// 2. Cole a Chave Gigante (anon public) aqui dentro das aspas
const supabaseKey = 'sb_publishable_LIG38x-w78Cj6V-gHasTPQ_wa7qovqw';

export const supabase = createClient(supabaseUrl, supabaseKey);