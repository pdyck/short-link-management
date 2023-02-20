import { Card, CardContent, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "../util/table.types";

type LinkCardProps = {
    link: Link;
};

export const LinkCard = ({ link }: LinkCardProps) => {
    return (
        <Card key={link.id}>
            <CardContent>
                <Typography variant="h6">{link.description}</Typography>
                <MuiLink href={`/s/${link.slug}`}>{link.slug}</MuiLink>
                <br />
                <MuiLink>{link.target}</MuiLink>
            </CardContent>
        </Card>
    );
};
