class FlumeCache {
  ports: { [portType: string]: Element };
  connections: { [id: string]: SVGPathElement };

  constructor() {
    this.ports = {};
    this.connections = {};
  }
}
export default FlumeCache
