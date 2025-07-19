import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rfdebbwpoxnxitvtbqen.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZGViYndwb3hueGl0dnRicWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MTM0MTgsImV4cCI6MjA2ODQ4OTQxOH0.cdutUv_wJrozdITleNjLtH-lMKcGXZK6gcqNv27q1o8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
