import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeMinimal } from "@supabase/auth-ui-react";
import { Layout } from "src/components/Layout";

export default function Home() {
    const session = useSession();
    const supabase = useSupabaseClient();

    const user = useUser();

    return (
        <Layout>
            {!session ? (
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeMinimal }} />
            ) : (
                <>
                    <h2>Hello, {user?.email}</h2>
                </>
            )}
        </Layout>
    );
}
