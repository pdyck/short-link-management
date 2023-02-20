import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { parse as parseUserAgent } from "useragent";
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
        res.redirect(`http://${req.headers.host}/404`);
        return;
    }

    if (data === null) {
        res.redirect(`http://${req.headers.host}/404`);
        return;
    }

    const [link] = data;

    if (link === undefined) {
        res.redirect(`http://${req.headers.host}/404`);
        return;
    }

    setImmediate(async () => {
        const { family, os } = parseUserAgent(req.headers["user-agent"]);
        const referrer = req.headers["referer"];
        const ip = req.socket.remoteAddress;

        await supabase.from("visit").insert({
            link_id: link.id,
            browser: family,
            os: os.family,
            referrer,
            ip,
        });
    });

    res.redirect(link.target);
}
