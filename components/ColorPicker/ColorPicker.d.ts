import { Colors as ColorsType } from "../../types";
interface ColorPickerProps {
    x: number;
    y: number;
    onColorPicked: (color: ColorsType) => void;
    onRequestClose: () => void;
}
declare const _default: ({ x, y, onColorPicked, onRequestClose }: ColorPickerProps) => JSX.Element;
export default _default;
