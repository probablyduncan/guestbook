import { createSignal, Show } from "solid-js"
import { useGuestbookValidation } from "../../lib/useFormValidation";
import { useInputValueSignal } from "../../lib/useInputValue";

export function HomestayTemplate() {

    const [placeName, setPlaceName] = createSignal<string>("");
    const { valueSignal } = useInputValueSignal();
    const { validation } = useGuestbookValidation();

    return (
        <fieldset>
            <legend>AirBreakfastInBed Reservation Confirmation</legend>
            <select name="stay" required use:valueSignal={setPlaceName}>
                <option value="">Select Your Getaway</option>
                <option>3-bed entire home in Lickwhisker</option>
                <option>Treasonoaks Guesthouse (single room)</option>
                <option>Apartment on Pillwillow Lane</option>
                <option>Roomy Walk-in Closet at Treaclewood Villas</option>
                <option>7-bed Country Estate (romantic)</option>
                <option>Tip on the Tongue, above the Trucklucky Steakhouse</option>
                <option>Behind the Bowl (at the De-lux) (luxury stay) (free bowling)</option>
                <option>Windsor Suites, Tickalittle, New Jersey</option>
                <option>@ The Hotbed (Rotterdam)</option>
                <option>Highlife Casino and Bauble Market (ensuite)</option>
                <option>Sneeble's House</option>
            </select>
            <Show when={placeName()}>
                <p style={{ hyphens: "auto" }}>Thank you for your interest in <b>{placeName()}</b>. Before we can accept your reservation, we need you to answer the following questions:</p>
                <p>
                    <textarea name="reason" aria-label="What brings you here, stranger? Business or pleasure?" required class="full" style={{ resize: "none" }} placeholder="What brings you here, stranger? Business or pleasure?" />
                </p>
                <p>
                    <textarea name="guests" aria-label="Please list the ages and occupations of all guests who will be occupying the property. Provide a rating of each on a scale of 1 to 10." required class="full" style={{ resize: "none" }} placeholder="Please list the ages and occupations of all guests who will be occupying the property. Provide a rating of each on a scale of 1 to 10." />
                </p>
                <p>
                    <textarea name="plans" aria-label="Any plans while you're in town?" class="full" style={{ resize: "none" }} placeholder="Any plans while you're in town?" />
                </p>
                <p>
                    <select name="cats" use:validation={{ block: "yes", msg: "Well, that's a problem for me." }} aria-label="Do you have a problem with cats?" required>
                        <option value="">Do you have a problem with cats?</option>
                        <option>No</option>
                        {/* HOW TO ADD VALIDATION??? */}
                        <option>Yes</option>
                    </select>
                </p>
                <p>
                    <input name="hours" aria-label="What are your normal walking hours?" required class="full" placeholder="What are your normal walking hours?" />
                </p>
                <p>
                    <select name="bedtimeStory" aria-label="Do you require a bedtime story?" required>
                        <option value="">Do you require a bedtime story?</option>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Well, if you have one in mind...</option>
                    </select>
                </p>
                <p>
                    <select name="snore" aria-label="Do you snore?" required>
                        <option value="">Do you snore?</option>
                        <option>Yes</option>
                        <option>No</option>
                        <option>No (in denial)</option>
                    </select>
                </p>
                <p>
                    <select name="lasagna" aria-label="Will you have some of my famous lasagna?" required use:validation={{ block: "no", msg: "Oh, c'mon. You've gotta. It's so good." }}>
                        <option value="">Will you have some of my famous lasagna?</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </p>
            </Show>
        </fieldset>
    )
}