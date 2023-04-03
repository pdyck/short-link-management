import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "../util/table.types";

type LinkCardProps = {
    link: Link;
};

export const LinkCard = ({ link }: LinkCardProps) => {
    const handleClick = () => {
        window.open(link.target, "_blank")?.focus();
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{link.description}</Typography>
                <Typography variant="subtitle2" color={(theme) => theme.palette.text.disabled}>{link.target}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleClick}>Visit</Button>
            </CardActions>
        </Card>
    );
};
