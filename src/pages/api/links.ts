import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { isValidURL } from "../../util/url";
import { randomUUID } from "crypto";
import { Database } from "../../util/database.types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabase = createServerSupabaseClient<Database>({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        res.status(401).end();
        return;
    }

    if (req.method === "GET") {
        const { data: links } = await supabase.from("link")
            .select("*")
            .order("created_at", { ascending: false });

        res.status(200).json({ links });
        return;
    }
    
    if (req.method === "POST") {
        const { target } = req.body;
        const isValid = isValidURL(target);

        if (!isValid) {
            res.status(400).end();
            return;
        }

        const url = new URL(target);

        const { data, error } = await supabase.from("link").insert({
            description: `${url.hostname} link`,
            target: url.toString(),
            slug: randomUUID(),
            user_id: session.user.id,
        }).select();

        if (error) {
            res.status(500).end();
            return;
        }

        const [link] = data;

        res.status(201).json(link);
        return;
    }

    res.status(404).end();
}
