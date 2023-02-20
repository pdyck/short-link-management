import { Alert, AlertTitle } from "@mui/material";
import { Layout } from "../components/Layout";

export default function Custom404() {
    return (
        <Layout>
            <Alert severity="info">
                <AlertTitle>Page not found!</AlertTitle>
                The requested page was not found.
            </Alert>
        </Layout>
    );
}