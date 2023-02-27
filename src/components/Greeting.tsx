import { Typography } from "@mui/material";

type GreetingProps = {
    userName: string;
    avatarUrl?: string;
};

export const Greeting = ({
    userName,
}: GreetingProps) => {
    return (
        <Typography variant="h5" textAlign="center" component="h2">Hello, {userName}!</Typography>
    );
};
