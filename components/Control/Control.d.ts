import { ControlData, ControlRenderCallback, InputData, SelectOption, ValueSetter } from "../../types";
interface CommonProps {
    name: string;
    nodeId: string;
    portName: string;
    label: string;
    inputLabel: string;
    allData: ControlData;
    inputData: InputData;
    triggerRecalculation: () => void;
    updateNodeConnections: () => void;
    setValue?: ValueSetter;
    isMonoControl?: boolean;
}
interface TextInputProps extends CommonProps {
    type: "text";
    data: string;
    defaultValue?: string;
    placeholder?: string;
}
interface NumberInputProps extends CommonProps {
    type: "number";
    data: number;
    defaultValue?: number;
    step?: number;
    placeholder?: string;
}
interface CheckboxProps extends CommonProps {
    type: "checkbox";
    data: boolean;
    defaultValue?: boolean;
}
interface SelectProps extends CommonProps {
    type: "select";
    data: string;
    options: SelectOption[];
    defaultValue?: string;
    placeholder?: string;
    getOptions?: (inputData: InputData, executionContext: any) => SelectOption[];
}
interface MultiSelectProps extends CommonProps {
    type: "multiselect";
    data: string[];
    options: SelectOption[];
    defaultValue?: string[];
    placeholder?: string;
    getOptions?: (inputData: InputData, executionContext: any) => SelectOption[];
}
interface CustomProps extends CommonProps {
    type: "custom";
    data: any;
    defaultValue?: any;
    render?: ControlRenderCallback;
}
declare type ControlProps = TextInputProps | NumberInputProps | CheckboxProps | SelectProps | MultiSelectProps | CustomProps;
declare const Control: (props: ControlProps) => JSX.Element;
export default Control;
