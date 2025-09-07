import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Optional: you can make a tiny Supabase request here
  // Example: fetch current timestamp from Supabase
  /*
  import { createClient } from "@supabase/supabase-js";
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  await supabase.from("some_table").select("id").limit(1);
  */

  res.status(200).json({ status: "alive" });
}