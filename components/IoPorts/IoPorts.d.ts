import { Connections, InputData, PortType, TransputBuilder } from "../../types";
interface IoPortsProps {
    nodeId: string;
    inputs: PortType[] | TransputBuilder;
    outputs: PortType[] | TransputBuilder;
    connections: Connections;
    inputData: InputData;
    updateNodeConnections: () => void;
}
declare const IoPorts: ({ nodeId, inputs, outputs, connections, inputData, updateNodeConnections }: IoPortsProps) => JSX.Element | null;
export default IoPorts;
