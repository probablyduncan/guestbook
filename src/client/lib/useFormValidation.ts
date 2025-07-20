import { type Accessor } from "solid-js";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            validateForm: (el: HTMLFormElement) => void;
            validation: ValidationDirectiveArgs<{ value: string }>;
        }
    }
}

type ValidationDirectiveArgs<T> = {

    /**
     * only these values will be accepted
     */
    require?: string[] | string,

    /**
     * all these values will be blocked
     */
    block?: string[] | string,

    /**
     * error message
     */
    msg: string,

    /**
     * defaults to false
     */
    caseSensitive?: boolean
} | ((el: T) => string | undefined)

type HTMLValidatableElement = HTMLElement & { setCustomValidity: HTMLInputElement["setCustomValidity"], value: string };
const validatorMap = new Map<string, { el: HTMLValidatableElement, validator: () => string | undefined }[]>();

export const useGuestbookValidation = () => useFormValidation("guestbook");

function useFormValidation(key: string) {

    const validation = <T extends HTMLValidatableElement>(el: T, accessor: Accessor<ValidationDirectiveArgs<T>>) => {

        // this is just resolving the type of accessor
        // it can either be an array of matches and a message on match,
        // or it can be a custom validator function that returns a message

        const validatorProps = accessor();
        let validator;
        if (typeof validatorProps === 'function') {
            validator = () => validatorProps(el);
        }
        else {
            const resolveArgs = (args: string[] | string | undefined) => args ? Array.isArray(args) ? args : [args] : undefined;
            const required = resolveArgs(validatorProps.require);
            const blocked = resolveArgs(validatorProps.block);
            validator = () => {
                const val = (validatorProps.caseSensitive ? el.value : el.value?.toLowerCase()) ?? "";
                if (required && !required.includes(val) || blocked && blocked.includes(val)) {
                    return validatorProps.msg;
                }
            }
        }
        if (Array.isArray(validatorProps)) {
            if (Array.isArray(validatorProps[0])) {
                validator = () => !validatorProps[0].includes(el.value) ? validatorProps[1] : undefined;
            }
            else {
                validator = () => validatorProps[0] === el.value ? validatorProps[1] : undefined;
            }
        }
        else {
        }

        // now add validator to map

        const existing = validatorMap.get(key) ?? [];
        validatorMap.set(key, [...existing, { el, validator }]);
    }

    const validateForm = (form: HTMLFormElement, submitHandler: Accessor<() => void>) => {

        // we're calling reportValidity manually
        form.noValidate = true;

        form.onsubmit = async (e) => {
            e.preventDefault();

            const validators = (validatorMap.get(key) ?? []);
            for (let i = 0; i < validators.length; i++) {
                const { validator, el } = validators[i];
                
                // setting validity to "" means the input is valid
                el.setCustomValidity(validator() ?? "");
            }

            // this triggers built-in validity warnings
            // as well as custom ones we set above,
            // and returns true if no issues
            if (form.reportValidity()) {
                submitHandler()();
            }
        }
    }

    return {
        validation,
        validateForm,
    }
}
