import { RootEngine } from '../RootEngine';
import { FlumeConfig } from '../typeBuilders';

describe('RootEngine', () => {
  let config;
  let engine;
  let mockResolveInputControls;
  let mockFireNodeFunction;

  beforeEach(() => {
    config = new FlumeConfig();
    mockResolveInputControls = jest.fn((type, data) => data.value || 0);
    mockFireNodeFunction = jest.fn((node, inputs) => ({ result: inputs.num1 + inputs.num2 }));
    
    engine = new RootEngine(config, mockResolveInputControls, mockFireNodeFunction);
  });

  describe('loop detection', () => {
    test('throws error when max loops exceeded', () => {
      const nodes = {
        'root': {
          id: 'root',
          root: true,
          type: 'test',
          connections: {
            inputs: {
              input1: [{ nodeId: 'node1', portName: 'output1' }]
            }
          },
          inputData: {}
        },
        'node1': {
          id: 'node1',
          type: 'test',
          connections: {
            inputs: {
              input1: [{ nodeId: 'node1', portName: 'output1' }]
            },
            outputs: {}
          },
          inputData: {}
        }
      };

      config.addNodeType({
        type: 'test',
        label: 'Test',
        inputs: [{ type: 'number', name: 'input1' }],
        outputs: [{ type: 'number', name: 'output1' }]
      });

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = engine.resolveRootNode(nodes, { maxLoops: 5 });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Max loop count exceeded')
      );
      
      consoleSpy.mockRestore();
    });

    test('handles valid execution without exceeding loops', () => {
      const nodes = {
        'root': {
          id: 'root',
          root: true,
          type: 'test',
          connections: {
            inputs: {
              input1: [{ nodeId: 'node1', portName: 'output1' }]
            }
          },
          inputData: {}
        },
        'node1': {
          id: 'node1',
          type: 'test',
          connections: {
            inputs: {},
            outputs: {}
          },
          inputData: { input1: { value: 42 } }
        }
      };

      config.addNodeType({
        type: 'test',
        label: 'Test',
        inputs: [{ type: 'number', name: 'input1' }],
        outputs: [{ type: 'number', name: 'output1' }]
      });

      mockFireNodeFunction.mockReturnValue({ output1: 42 });

      const result = engine.resolveRootNode(nodes);

      expect(result.input1).toBe(42);
      expect(mockFireNodeFunction).toHaveBeenCalled();
    });
  });

  describe('root node handling', () => {
    test('throws error with multiple root nodes', () => {
      const nodes = {
        'root1': {
          id: 'root1',
          root: true,
          type: 'test',
          connections: { inputs: {} },
          inputData: {}
        },
        'root2': {
          id: 'root2',
          root: true,
          type: 'test',
          connections: { inputs: {} },
          inputData: {}
        }
      };

      config.addNodeType({
        type: 'test',
        label: 'Test',
        inputs: [],
        outputs: []
      });

      expect(() => {
        engine.resolveRootNode(nodes);
      }).toThrow('The root engine must not be called with more than one root node.');
    });

    test('handles missing root node gracefully', () => {
      const nodes = {
        'node1': {
          id: 'node1',
          root: false,
          type: 'test',
          connections: { inputs: {} },
          inputData: {}
        }
      };

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = engine.resolveRootNode(nodes);

      expect(result).toEqual({});
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('A root node was not found')
      );

      consoleSpy.mockRestore();
    });

    test('can resolve specific root node by ID', () => {
      const nodes = {
        'specificRoot': {
          id: 'specificRoot',
          root: false,
          type: 'test',
          connections: { inputs: {} },
          inputData: { input1: { value: 123 } }
        },
        'otherRoot': {
          id: 'otherRoot',
          root: true,
          type: 'test',
          connections: { inputs: {} },
          inputData: { input1: { value: 456 } }
        }
      };

      config.addNodeType({
        type: 'test',
        label: 'Test',
        inputs: [{ type: 'number', name: 'input1' }],
        outputs: []
      });

      const result = engine.resolveRootNode(nodes, { rootNodeId: 'specificRoot' });

      expect(mockResolveInputControls).toHaveBeenCalledWith('number', { value: 123 }, undefined);
    });
  });

  describe('input resolution', () => {
    test('resolves control values for unconnected inputs', () => {
      const nodes = {
        'root': {
          id: 'root',
          root: true,
          type: 'test',
          connections: { inputs: {} },
          inputData: { 
            control1: { value: 100 },
            control2: { value: 200 }
          }
        }
      };

      config.addNodeType({
        type: 'test',
        label: 'Test',
        inputs: [
          { type: 'number', name: 'control1' },
          { type: 'number', name: 'control2' }
        ],
        outputs: []
      });

      const result = engine.resolveRootNode(nodes);

      expect(result.control1).toBe(100);
      expect(result.control2).toBe(200);
      expect(mockResolveInputControls).toHaveBeenCalledTimes(2);
    });

    test('resolves connected input values', () => {
      const nodes = {
        'root': {
          id: 'root',
          root: true,
          type: 'test',
          connections: {
            inputs: {
              input1: [{ nodeId: 'source', portName: 'output1' }]
            }
          },
          inputData: {}
        },
        'source': {
          id: 'source',
          type: 'source',
          connections: { inputs: {}, outputs: {} },
          inputData: { value: { data: 42 } }
        }
      };

      config
        .addNodeType({
          type: 'test',
          label: 'Test',
          inputs: [{ type: 'number', name: 'input1' }],
          outputs: []
        })
        .addNodeType({
          type: 'source',
          label: 'Source',
          inputs: [{ type: 'number', name: 'value' }],
          outputs: [{ type: 'number', name: 'output1' }]
        });

      mockFireNodeFunction.mockReturnValue({ output1: 42 });

      const result = engine.resolveRootNode(nodes);

      expect(result.input1).toBe(42);
      expect(mockFireNodeFunction).toHaveBeenCalledWith(
        nodes.source,
        expect.any(Object),
        config.nodeTypes.source,
        undefined
      );
    });

    test('handles onlyResolveConnected option', () => {
      const nodes = {
        'root': {
          id: 'root',
          root: true,
          type: 'test',
          connections: {
            inputs: {
              connected: [{ nodeId: 'source', portName: 'output1' }]
            }
          },
          inputData: { 
            unconnected: { value: 100 }
          }
        },
        'source': {
          id: 'source',
          type: 'source',
          connections: { inputs: {}, outputs: {} },
          inputData: {}
        }
      };

      config
        .addNodeType({
          type: 'test',
          label: 'Test',
          inputs: [
            { type: 'number', name: 'connected' },
            { type: 'number', name: 'unconnected' }
          ],
          outputs: []
        })
        .addNodeType({
          type: 'source',
          label: 'Source',
          inputs: [],
          outputs: [{ type: 'number', name: 'output1' }]
        });

      mockFireNodeFunction.mockReturnValue({ output1: 42 });

      const result = engine.resolveRootNode(nodes, { onlyResolveConnected: true });

      expect(result.connected).toBe(42);
      expect(result.unconnected).toBeUndefined();
    });
  });

  describe('dynamic inputs handling', () => {
    test('handles function-based inputs', () => {
      const nodes = {
        'root': {
          id: 'root',
          root: true,
          type: 'dynamic',
          connections: { inputs: {} },
          inputData: { 
            dynamicCount: { value: 3 }
          }
        }
      };

      const dynamicInputs = jest.fn((inputData) => {
        const count = inputData.dynamicCount?.value || 1;
        return Array.from({ length: count }, (_, i) => ({
          type: 'number',
          name: `input${i}`
        }));
      });

      config.addNodeType({
        type: 'dynamic',
        label: 'Dynamic',
        inputs: dynamicInputs,
        outputs: []
      });

      engine.resolveRootNode(nodes);

      expect(dynamicInputs).toHaveBeenCalled();
      // Verify the function was called and returned an array of inputs
      const returnValue = dynamicInputs.mock.results[0].value;
      expect(Array.isArray(returnValue)).toBe(true);
      expect(returnValue.length).toBeGreaterThan(0);
      expect(returnValue[0]).toEqual(
        expect.objectContaining({
          type: 'number',
          name: expect.any(String)
        })
      );
    });
  });

  describe('error handling', () => {
    test('handles errors in node execution gracefully', () => {
      const nodes = {
        'root': {
          id: 'root',
          root: true,
          type: 'test',
          connections: {
            inputs: {
              input1: [{ nodeId: 'errorNode', portName: 'output1' }]
            }
          },
          inputData: {}
        },
        'errorNode': {
          id: 'errorNode',
          type: 'error',
          connections: { inputs: {}, outputs: {} },
          inputData: {}
        }
      };

      config
        .addNodeType({
          type: 'test',
          label: 'Test',
          inputs: [{ type: 'number', name: 'input1' }],
          outputs: []
        })
        .addNodeType({
          type: 'error',
          label: 'Error',
          inputs: [],
          outputs: [{ type: 'number', name: 'output1' }]
        });

      mockFireNodeFunction.mockImplementation(() => {
        throw new Error('Node execution failed');
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = engine.resolveRootNode(nodes);

      expect(consoleSpy).toHaveBeenCalled();
      expect(result.input1).toBeUndefined();

      consoleSpy.mockRestore();
    });
  });
});