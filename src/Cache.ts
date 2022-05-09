import { Connections, PortType } from "./types";

class Cache{
  ports: { [portType: string]: PortType };
  connections: {[id: string]: Connections};

  constructor(){
    this.ports = {};
    this.connections = {};
  }
}
export default Cache
