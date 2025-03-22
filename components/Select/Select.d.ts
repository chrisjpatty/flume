import { SelectOption } from "../../types";
interface SelectProps {
    allowMultiple?: boolean;
    data: string | string[];
    onChange: (data: string | string[]) => void;
    options: SelectOption[];
    placeholder?: string;
}
declare const Select: ({ options, placeholder, onChange, data, allowMultiple }: SelectProps) => JSX.Element;
export default Select;
