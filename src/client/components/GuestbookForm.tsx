import { createSignal, type JSX } from "solid-js";
import { GuestbookTemplate } from "./formTemplates/GuestbookTemplate";
import { JobAppTemplate } from "./formTemplates/JobAppTemplate";
import { HomestayTemplate } from "./formTemplates/HomestayTemplate";
import { useGuestbookValidation } from "../lib/useFormValidation";
import { CollegeAppTemplate } from "./formTemplates/CollegeAppTemplate";

const templates: Record<GuestbookEntryTemplateType, {
    name: string;
    snippet: () => JSX.Element;
}> = {
    guestbook: {
        name: "Guestbook Entry",
        snippet: GuestbookTemplate,
    },
    job: {
        name: "Job Application",
        snippet: JobAppTemplate,
    },
    college: {
        name: "College Application",
        snippet: CollegeAppTemplate,
    },
    homestay: {
        name: "Homestay Application",
        snippet: HomestayTemplate,
    },
    review: {
        name: "Restraunt Review",
        snippet: () => "Restaurant",
    },
    security: {
        name: "Security Questions",
        snippet: () => "",
    },
    dating: {
        name: "Dating App Profile",
        snippet: () => "",
    },
    snail: {
        name: "Snail Mail",
        snippet: () => "",
    },
    alt: {
        name: "Alt Text Selfie",
        snippet: () => "",
    },
    doodle: {
        name: "Doodle in the Margins",
        snippet: () => "",
    },
} as const;

export function GuestbookForm() {

    const [template, setTemplate] = createSignal<GuestbookEntryTemplateType | undefined>("guestbook");

    function submit(e: SubmitEvent) {
        e.preventDefault();
        // const formData = new FormData(e.target as HTMLFormElement);

    }

    const { validateForm, validation } = useGuestbookValidation();

    function submitForm(el: HTMLFormElement) {
        console.log("passed validation! submitting");
        // el.requestSubmit();
    }

    const robotInts = [Math.floor(Math.random() * 19 + 1), Math.floor(Math.random() * 4 + 1)];
    const robotSum = robotInts[0] + robotInts[1];

    return (
        <form use:validateForm={submitForm} class="form pastels" style={{ "--hue": Math.floor(Math.random() * 255) }}>
            <p>
                <label>
                    <select name='template' onchange={(e) => setTemplate(e.target.value as GuestbookEntryTemplateType)}>
                        {Object.entries(templates).map(([k, v]) => <option value={k}>{v.name}</option>)}
                    </select>
                </label>
            </p>
            <br />
            {template()! in templates && <>
                {templates[template()!].snippet()}
                <br />
                <br />
                <fieldset>
                    <legend>Anti-Robot Question</legend>
                    <p>
                        <input aria-label={`Anti-robot question: what's ${robotInts.join(" plus ")}?`} placeholder={`What's ${robotInts.join(" plus ")}?`} use:validation={{ require: robotSum.toString(), msg: "Extremely loud incorrect buzzer*" }} required type="number" />
                    </p>
                </fieldset>
                <br />
                <br />
                <fieldset>
                    {/* <legend>Submit</legend> */}
                    <p style={{ "font-size": "0.875em", "text-align": "justify", "text-align-last": "justify", "line-height": 1.4, "max-width": "360px" }}>
                        All submissions will be reviewed!
                        &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
                        If you write
                        <br />
                        something vile,
                        &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;
                        I'm gonna delete it! I mean it!
                    </p>
                    <p>
                        <button type="submit">Submit</button>
                    </p>
                </fieldset>
            </>}
        </form>
    )
}