import { checkForCircularNodes } from '../utilities';

describe('checkForCircularNodes', () => {
  test('returns false for no circular dependencies', () => {
    const nodes = {
      'node1': {
        id: 'node1',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node2', portName: 'input1' }]
          }
        }
      },
      'node2': {
        id: 'node2',
        connections: {
          outputs: {}
        }
      }
    };

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(false);
  });

  test('detects direct circular dependency', () => {
    const nodes = {
      'node1': {
        id: 'node1',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node2', portName: 'input1' }]
          }
        }
      },
      'node2': {
        id: 'node2',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node1', portName: 'input1' }]
          }
        }
      }
    };

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(true);
  });

  test('detects indirect circular dependency through multiple nodes', () => {
    const nodes = {
      'node1': {
        id: 'node1',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node2', portName: 'input1' }]
          }
        }
      },
      'node2': {
        id: 'node2',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node3', portName: 'input1' }]
          }
        }
      },
      'node3': {
        id: 'node3',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node1', portName: 'input1' }]
          }
        }
      }
    };

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(true);
  });

  test('detects self-referencing node', () => {
    const nodes = {
      'node1': {
        id: 'node1',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node1', portName: 'input1' }]
          }
        }
      }
    };

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(true);
  });

  test('handles nodes with multiple outputs', () => {
    const nodes = {
      'node1': {
        id: 'node1',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node2', portName: 'input1' }],
            output2: [{ nodeId: 'node3', portName: 'input1' }]
          }
        }
      },
      'node2': {
        id: 'node2',
        connections: {
          outputs: {}
        }
      },
      'node3': {
        id: 'node3',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node1', portName: 'input1' }]
          }
        }
      }
    };

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(true);
  });

  test('handles nodes with multiple connections per output', () => {
    const nodes = {
      'node1': {
        id: 'node1',
        connections: {
          outputs: {
            output1: [
              { nodeId: 'node2', portName: 'input1' },
              { nodeId: 'node3', portName: 'input1' }
            ]
          }
        }
      },
      'node2': {
        id: 'node2',
        connections: {
          outputs: {}
        }
      },
      'node3': {
        id: 'node3',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node1', portName: 'input1' }]
          }
        }
      }
    };

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(true);
  });

  test('handles complex non-circular graph', () => {
    const nodes = {
      'node1': {
        id: 'node1',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node2', portName: 'input1' }],
            output2: [{ nodeId: 'node3', portName: 'input1' }]
          }
        }
      },
      'node2': {
        id: 'node2',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node4', portName: 'input1' }]
          }
        }
      },
      'node3': {
        id: 'node3',
        connections: {
          outputs: {
            output1: [{ nodeId: 'node4', portName: 'input2' }]
          }
        }
      },
      'node4': {
        id: 'node4',
        connections: {
          outputs: {}
        }
      }
    };

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(false);
  });

  test('handles empty connections gracefully', () => {
    const nodes = {
      'node1': {
        id: 'node1',
        connections: {
          outputs: {}
        }
      }
    };

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(false);
  });

  test('handles deep circular chain', () => {
    const nodes = {};
    const chainLength = 10;
    
    // Create a chain of nodes that loops back
    for (let i = 1; i <= chainLength; i++) {
      const nextNode = i === chainLength ? 'node1' : `node${i + 1}`;
      nodes[`node${i}`] = {
        id: `node${i}`,
        connections: {
          outputs: {
            output1: [{ nodeId: nextNode, portName: 'input1' }]
          }
        }
      };
    }

    const result = checkForCircularNodes(nodes, 'node1');
    expect(result).toBe(true);
  });
});