interface TextInputProps {
    placeholder?: string;
    updateNodeConnections: () => void;
    onChange: (value: string | number) => void;
    data: string | number;
    step?: number;
    type?: "number" | "text";
}
declare const TextInput: ({ placeholder, updateNodeConnections, onChange, data, step, type }: TextInputProps) => JSX.Element;
export default TextInput;
