import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateLink } from "./CreateLink";

describe("CreateLink", () => {
    it("should submit the link when it is valid", async () => {
        const onSubmit = jest.fn();
        const link = "https://google.com";

        render(<CreateLink onSubmit={onSubmit} />);

        const form = await screen.findByRole("form");
        const input = within(form).getByRole("textbox");
        await userEvent.type(input, link);

        fireEvent.submit(form);

        expect(input).not.toBeInvalid();
        expect(onSubmit).toHaveBeenCalledWith(link);
    });
    
    it("should not submit the link when it is invalid", async () => {
        const onSubmit = jest.fn();
        render(<CreateLink onSubmit={onSubmit} />);

        const form = await screen.findByRole("form");
        const input = within(form).getByRole("textbox");
        await userEvent.type(input, "blabla");

        fireEvent.submit(form);

        expect(input).toBeInvalid();
        expect(onSubmit).not.toHaveBeenCalled();
    });
});
