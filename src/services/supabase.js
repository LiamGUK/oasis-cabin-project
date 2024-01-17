import { createClient } from "@supabase/supabase-js";

// For intialization of Supabase backend setup to use in project
export const supabaseUrl = "https://ryoixtapuztwaublbuog.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5b2l4dGFwdXp0d2F1YmxidW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MTgxMjQsImV4cCI6MjAxNjM5NDEyNH0.LI4vsvTktlXdvagbHDyG_Mbqq0vVB_CYk0c8YmbSxyY";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
