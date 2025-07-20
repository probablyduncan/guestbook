import { type Accessor, type Setter } from "solid-js";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            valueSignal: Setter<string>
        }
    }
}

export function useInputValueSignal() {

    const valueSignal = (el: HTMLElement & { value: string }, setter: Accessor<Setter<string>>) => {
        el.addEventListener("change", () => {
            setter()(el.value);
        });
    }

    return {
        valueSignal
    }
}
