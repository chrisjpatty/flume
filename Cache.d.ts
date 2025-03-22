declare class FlumeCache {
    ports: {
        [portType: string]: Element;
    };
    connections: {
        [id: string]: SVGPathElement;
    };
    constructor();
}
export default FlumeCache;
