import { Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { useUser } from "@supabase/auth-helpers-react";
import { CreateLink } from "../components/CreateLink";
import { Layout } from "../components/Layout";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useLinks } from "src/hooks/useLinks";

export default function Home() {
    const user = useUser();
    const { links, createLink } = useLinks();

    return (
        <Layout>
            <Stack spacing={2}>
                <Typography variant="h5" textAlign="center" component="h2">Hello, {user?.email}</Typography>
                <CreateLink onSubmit={createLink} />
                <Stack spacing={1}>
                    {links.map((link) => (
                        <Card key={link.id}>
                            <CardContent>
                                <Typography variant="h6">{link.description}</Typography>
                                <Link href={`/s/${link.slug}`}>{link.slug}</Link>
                                <br />
                                <Link>{link.target}</Link>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Stack>
        </Layout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const supabase = await createServerSupabaseClient(ctx);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return {
            props: {},
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
