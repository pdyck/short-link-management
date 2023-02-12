import { Box, Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { isValidURL } from "src/util/url";

type CreateLinkProps = {
    onSubmit: (link: string) => void;
};

export const CreateLink = ({
    onSubmit,
}: CreateLinkProps) => {
    const [link, setLink] = useState("");
    const [hasError, setError] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (hasError) {
            setError(false);
        }

        setLink(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
        const isValid = isValidURL(link);

        if (isValid) {
            onSubmit(link);
            setLink("");
            setError(false);
        } else {
            setError(true);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack direction="row" spacing={1}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={link}
                    onChange={handleChange}
                    error={hasError}
                    helperText={hasError && "Please enter a valid link."}
                />
                <Button type="submit" variant="contained">+</Button>
            </Stack>
        </Box>
    );
};
