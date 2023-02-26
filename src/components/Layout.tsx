import { Button, Container, Stack, Typography } from "@mui/material";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
    const session = useSession();
    const supabase = useSupabaseClient();

    const handleSignOut = () => {
        supabase.auth.signOut();
    };

    return (
        <Container maxWidth="sm" sx={{ py: 2 }}>
            <Stack direction="row" alignItems="space-between" spacing={1}>
                <Typography variant="h4" component="h1" pb={2}>Short Link Management</Typography>
                {session ? (
                    <Button variant="text" onClick={handleSignOut}>Sign out</Button>
                ) : null}
            </Stack>
            {children}
        </Container>
    )
};
