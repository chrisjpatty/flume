interface CheckboxProps {
    label: string;
    data: boolean;
    onChange: (data: boolean) => void;
}
declare const Checkbox: ({ label, data, onChange }: CheckboxProps) => JSX.Element;
export default Checkbox;
