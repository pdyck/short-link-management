import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
    const session = useSession();
    const supabase = useSupabaseClient();

    const handleSignOut = () => {
        supabase.auth.signOut();
    };

    return (
        <div className="container mx-auto max-w-md py-4">
            <div className="flex justify-between pb-4">
                <h1 className="text-2xl">Short Link Management</h1>
                {session ? (
                    <button onClick={handleSignOut}>Sign out</button>
                ) : null}
            </div>
            {children}
        </div>
    )
};
