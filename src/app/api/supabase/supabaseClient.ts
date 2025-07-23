import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServerKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // 👈 NEXT_PUBLIC 제거
export const supabase = createClient(supabaseURL, supabaseServerKey);
