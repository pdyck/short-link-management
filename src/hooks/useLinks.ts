import { useEffect, useState } from "react";
import { Link } from "../util/table.types";

const fetchLinks = async (): Promise<{ links: Link[] }> => {
    const response = await fetch("/api/links");
    return response.json();
};

const postLink = async (target: string): Promise<Link> => {
    const response = await fetch("/api/links", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json"}),
        body: JSON.stringify({ target }),
    });
    return response.json();
}

export const useLinks = () => {
    const [links, setLinks] = useState<Link[]>([]);

    useEffect(() => {
        fetchLinks().then((data) => setLinks(data.links));
    }, []);

    const createLink = async (target: string) => {
        const link = await postLink(target);
        setLinks([link, ...links]);
    };

    return {
        links,
        createLink,
    };
};
