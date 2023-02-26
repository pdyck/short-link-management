import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeMinimal } from "@supabase/auth-ui-react";
import { Layout } from "../components/Layout";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const supabase = useSupabaseClient();
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    return (
        <Layout>
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeMinimal }}  />
        </Layout>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const supabase = await createServerSupabaseClient(ctx);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        return {
            props: {},
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return { props: {} };
};
