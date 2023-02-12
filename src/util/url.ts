export const isValidURL = (link: string) => {
    try {
        new URL(link);
        return true;
    } catch (error) {
        return false;
    }
};
