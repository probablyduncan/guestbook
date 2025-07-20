import { useGuestbookValidation } from "../../lib/useFormValidation";

export function GuestbookTemplate() {

    const { validation } = useGuestbookValidation();

    return (
        <fieldset>
            <legend>Guestbook</legend>
            <p>
                <input use:validation={({ value }) => value.toLowerCase().includes("duncan") ? "Duncan is my name! Pick another!" : undefined} name="name" aria-label="Name (required, but can be anything)" placeholder="name*" required class="half" />
                <input name="location" aria-label="Location (optional)" placeholder="location" class="half" />
            </p>
            <p>
                <input name="url" aria-label="Website or url (optional)" placeholder="website" class="full" />
            </p>
            <p>
                <textarea name="message" aria-label="Guestbook Message (required)" required class="full" style={{ resize: "none" }} placeholder="message*" />
            </p>
        </fieldset>
    );
}