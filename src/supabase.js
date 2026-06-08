import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
'https://igwowowneiqzvakjtqvh.supabase.co'

const supabaseKey =
'sb_publishable_avmwkQ-JoudInYNgw8gxmA_7Ez4NWMQ'

export const supabase =
createClient(
  supabaseUrl,
  supabaseKey
)