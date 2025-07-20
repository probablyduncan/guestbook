import { createSignal, Show } from "solid-js"
import { useInputValueSignal } from "../../lib/useInputValue";

export function CollegeAppTemplate() {

    const { valueSignal } = useInputValueSignal();
    const [school, setSchool] = createSignal("");
    
    return (
        <fieldset>
            <legend>~Invest in your Future~</legend>
            <p>
                <select name="school" aria-label="School" required use:valueSignal={setSchool}>
                    <option value="">Choose Your School</option>
                    <option>Ganglewood (est. 1841)</option>
                    <option>London School of Business</option>
                    <option>London School of Academics</option>
                    <option>Springfield Elementary</option>
                    <option>The School for Liberal Arts</option>
                    <option>Hard Knocks</option>
                    <option>University of the Prime Meridian</option>
                    <option>The Prince-Widow School</option>
                    <option>The School of Thought</option>
                    <option>The School of Fish</option>
                    <option>Reed College</option>
                    <option>Other . . .</option>
                </select>
            </p>
            <p>
                {school()}
            </p>
            <Show when={() => school() === "Other . . ."}>
                <p>
                    <input />
                </p>
            </Show>
        </fieldset>
    );
}