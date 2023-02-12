import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Auth, ThemeMinimal } from "@supabase/auth-ui-react";

export default function Home() {
    const session = useSession();
    const supabase = useSupabaseClient();

    const user = useUser();

    return (
        <>
            {!session ? (
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeMinimal }} />
            ) : (
                <>
                    <h1>Short Link Management</h1>
                    <h2>Hello, {user?.email}</h2>
                    <button onClick={() => supabase.auth.signOut()}>Sign out</button>
                </>
            )}
        </>
    );
}
