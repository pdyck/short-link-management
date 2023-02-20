import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { Database } from "../../../util/database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const createSupabaseClient = async () => {
    if (SUPABASE_URL === undefined || SUPABASE_KEY === undefined) {
        return null;
    }

    return createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = await createSupabaseClient();

    if (supabase === null) {
        res.status(500).end();
        return;
    }

    const { slug } = req.query;

    const { data, error } = await supabase.from("link").select().limit(1).eq("slug", slug);

    if (error) {
        res.status(500).end();
        return;
    }

    if (data === null) {
        res.status(404).end();
        return;
    }

    const [link] = data;

    if (link === undefined) {
        res.status(404).end();
        return;
    }

    res.redirect(link.target);
}
