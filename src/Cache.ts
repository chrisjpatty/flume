import { Connections, PortType } from "./types";

class FlumeCache{
  ports: { [portType: string]: Element };
  connections: {[id: string]: Connections};

  constructor(){
    this.ports = {};
    this.connections = {};
  }
}
export default FlumeCache
