import { Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeMinimal } from "@supabase/auth-ui-react";
import { useEffect, useState } from "react";
import { CreateLink } from "../components/CreateLink";
import { Layout } from "../components/Layout";

export default function Home() {
    const session = useSession();
    const supabase = useSupabaseClient();

    const user = useUser();

    const [links, setLinks] = useState<any[]>([]);

    useEffect(() => {
        if (session) {
            fetch("/api/links")
                .then((result) => result.json())
                .then((result) => setLinks(result.links));
        }
    }, [session]);

    const handleSubmit = (link: string) => {
        if (session) {
            fetch("/api/links", {
                method: "POST",
                headers: new Headers({ "Content-Type": "application/json"}),
                body: JSON.stringify({ target: link }),
            })
                .then((result) => result.json())
                .then((result) => setLinks([result, ...links]));
        }
    };

    return (
        <Layout>
            {!session ? (
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeMinimal }} />
            ) : (
                <Stack spacing={2}>
                    <Typography variant="h5" textAlign="center" component="h2">Hello, {user?.email}</Typography>
                    <CreateLink onSubmit={handleSubmit} />
                    <Stack spacing={1}>
                        {links.map((link) => (
                            <Card key={link.id}>
                                <CardContent>
                                    <Typography variant="h6">{link.description}</Typography>
                                    <Typography>{link.slug}</Typography>
                                    <Link>{link.target}</Link>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Stack>
            )}
        </Layout>
    );
}