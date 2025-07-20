import type { JSX } from "solid-js/jsx-runtime"

interface Props {
    name: string;
    placeholder: string;
    style?: JSX.CSSProperties;
}

export function Input(props: Props) {
    return (
        <label>
            {}
            <input
                {...props}
                style={Object.assign({}, props.style)}
            />
        </label>
    );
}