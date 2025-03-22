import { SelectOption } from "../../types";
interface ContextMenuProps {
    x: number;
    y: number;
    options: SelectOption[];
    onRequestClose: () => void;
    onOptionSelected: (option: SelectOption) => void;
    label?: string;
    hideHeader?: boolean;
    hideFilter?: boolean;
    emptyText?: string;
}
declare const ContextMenu: ({ x, y, options, onRequestClose, onOptionSelected, label, hideHeader, hideFilter, emptyText }: ContextMenuProps) => JSX.Element;
export default ContextMenu;
