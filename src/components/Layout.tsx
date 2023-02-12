import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
            <Stack direction="row" spacing={1}>
                <Typography variant="h4" component="h1">Short Link Management</Typography>
                {session ? (
                    <Button variant="text" onClick={handleSignOut}>Sign out</Button>
                ) : null}
            </Stack>
            <Box sx={{ pb: 2 }}>
                {children}
            </Box>
        </Container>
    )
};
