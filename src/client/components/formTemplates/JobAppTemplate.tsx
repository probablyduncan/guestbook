export function JobAppTemplate() {

    // type: "job";
    // name: string;
    // fax: string;
    // jobTitle: string;
    // desiredSalary: number;
    // experience: string;
    // gapExplanation: string;
    // cultureFit: string;

    // validation on salary (too high!)



    function blockSalaryKeydown(e: KeyboardEvent) {
        if (e.key.length === 1) {
            e.preventDefault();
            const input = e.target as HTMLInputElement;
            input.setCustomValidity(`Please use the arrows provided if you wish to modify your salary.`);
            input.reportValidity();
            input.setCustomValidity("");
        }
    }

    return (
        <fieldset>
            <legend>Application Portal, DunCo™ Enterprise Solutions</legend>
            <p><i>All fields are required.</i></p>
            <p>
                <input name="name" aria-label="Full name" required placeholder="Full name" type="text" class="half" />
                <input name="fax" aria-label="Fax number" required placeholder="Fax number" type="tel" class="half" />
            </p>
            <p>
                <select name="jobTitle" aria-label="Job Title" required>
                    <option value="">Desired Role</option>
                    <option>Associate Report Manager</option>
                    <option>Senior Client Relations Trainee</option>
                    <option>Spreadsheet Service Manager, East Region</option>
                    <option>Junior Report Sommelier</option>
                    <option>Associate Client Competency Manager</option>
                    <option>Lead Synergy Consultant</option>
                    <option>Fax Mechanic, 3rd degree</option>
                    <option>Associate Reports Trainee</option>
                    <option>Junior Report Manager, Western Hemisphere</option>
                    <option>Rubber Duck Replacer</option>
                    <option>Alabaster Scribe (High Red's Eve)</option>
                    <option>Location Scout, Dept. of Press Conferences</option>
                    <option>Lead Intern, Deliverables</option>
                    <option>HR Associate, Iron Fist Division</option>
                    <option>Senior Report Highlighter</option>
                    <option>High Priestess</option>
                    <option>Junior Pitchdeck Shuffler</option>
                    <option>Product Manager, Torment Nexus Division</option>
                    <option>Inventor, Dept. of Wheels</option>
                    <option>Harriet Truffleback, Duchess of Accounting</option>
                    <option>Associate Base Toucher</option>
                    <option>Circle-Backer (next week)</option>
                    <option>Yes Man</option>
                    <option>Lead Dictation Specialist, Office of the President</option>
                    <option>Low Priestess</option>
                    <option>Shifter, Level 3, Paradigm Division</option>
                    <option>Ceremonial Chime-Caller, 2nd Position</option>
                    <option>Devil Himself</option>
                </select>
            </p>
            <p>
                <textarea name="experience" aria-label="Experience Description" required class="full" style={{ resize: "none" }} placeholder="Describe any relevant experience (150-200 characters)" minLength={150} maxLength={200} />
            </p>
            <p>
                <textarea name="fit" aria-label="Culture Fit Explanation" required class="full" style={{ resize: "none" }} placeholder="List 10 reasons you would be a good fit for DunCo™ Enterprise Solutions (please use 3rd edition page numbers when citing the DunCo™ Family Culture Handbook) (200 characters)" minLength={200} maxLength={200} />
            </p>
            <p>
                <textarea name="gap" aria-label="Resume Gap Explanation" required class="full" style={{ resize: "none" }} placeholder="Kindly provide an explanation of the 3 month gap in your resume (2003, June to August) (min 800 characters)" minLength={800} />
            </p>
            <p>
                <input name="desiredSalary" required placeholder="Desired salary (USD)" type="number" aria-label="Desired Salary" class="half" onKeyDown={blockSalaryKeydown} min={0} max={31495} />
            </p>
        </fieldset>
    );
}