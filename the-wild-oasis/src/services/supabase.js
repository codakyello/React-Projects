import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://uoaeihtsdojoaqtavnal.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvYWVpaHRzZG9qb2FxdGF2bmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2NDI3NzEsImV4cCI6MjAwOTIxODc3MX0.gF0dbnQ2C2hrPHWhs1oV8_C9qUTsPbKnxpDXP32mUlY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
