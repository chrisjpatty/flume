import {
  calculateCurve,
  updateConnection
} from '../connectionCalculator';

describe('connectionCalculator', () => {
  describe('calculateCurve', () => {
    test('generates correct curve for horizontal connection', () => {
      const from = { x: 0, y: 100 };
      const to = { x: 300, y: 100 };

      const curve = calculateCurve(from, to);

      expect(curve).toContain('M0,100');
      expect(curve).toContain('300,100');
      expect(typeof curve).toBe('string');
      expect(curve.length).toBeGreaterThan(0);
    });

    test('generates correct curve for vertical connection', () => {
      const from = { x: 100, y: 0 };
      const to = { x: 100, y: 300 };

      const curve = calculateCurve(from, to);

      expect(curve).toContain('M100,0');
      expect(curve).toContain('100,300');
    });

    test('handles negative coordinates', () => {
      const from = { x: -50, y: -100 };
      const to = { x: 50, y: 100 };

      const curve = calculateCurve(from, to);

      expect(curve).toContain('M-50,-100');
      expect(curve).toContain('50,100');
    });

    test('handles zero-length connection', () => {
      const from = { x: 100, y: 100 };
      const to = { x: 100, y: 100 };

      const curve = calculateCurve(from, to);

      expect(typeof curve).toBe('string');
    });

    test('creates proper bezier curve with control points', () => {
      const from = { x: 0, y: 0 };
      const to = { x: 300, y: 200 };

      const curve = calculateCurve(from, to);
      
      // Should contain the start point, control points, and end point
      expect(curve).toContain('M0,0');
      expect(curve).toContain('300,200');
      // Should create a bezier curve (contains 'C' for cubic bezier)
      expect(curve).toContain('C');
    });

    test('handles curve with different horizontal distances', () => {
      const testCases = [
        { from: { x: 0, y: 0 }, to: { x: 100, y: 0 } },
        { from: { x: 0, y: 0 }, to: { x: 500, y: 0 } },
        { from: { x: 0, y: 0 }, to: { x: 50, y: 0 } }
      ];

      testCases.forEach(({ from, to }) => {
        const curve = calculateCurve(from, to);
        expect(typeof curve).toBe('string');
        expect(curve.length).toBeGreaterThan(0);
        expect(curve).toContain(`M${from.x},${from.y}`);
        expect(curve).toContain(`${to.x},${to.y}`);
      });
    });
  });

  describe('updateConnection', () => {
    test('updates connection path attribute', () => {
      const mockLine = {
        setAttribute: jest.fn()
      };
      const from = { x: 0, y: 0 };
      const to = { x: 100, y: 100 };

      updateConnection({ line: mockLine, from, to });

      expect(mockLine.setAttribute).toHaveBeenCalledWith('d', expect.any(String));
      
      // Verify the path string is a valid curve
      const pathString = mockLine.setAttribute.mock.calls[0][1];
      expect(pathString).toContain('M0,0');
      expect(pathString).toContain('100,100');
    });

    test('handles multiple update calls', () => {
      const mockLine = {
        setAttribute: jest.fn()
      };

      // First update
      updateConnection({ 
        line: mockLine, 
        from: { x: 0, y: 0 }, 
        to: { x: 100, y: 100 } 
      });

      // Second update
      updateConnection({ 
        line: mockLine, 
        from: { x: 50, y: 50 }, 
        to: { x: 150, y: 150 } 
      });

      expect(mockLine.setAttribute).toHaveBeenCalledTimes(2);
      
      // Check both calls had valid path strings
      const firstCall = mockLine.setAttribute.mock.calls[0][1];
      const secondCall = mockLine.setAttribute.mock.calls[1][1];
      
      expect(firstCall).toContain('M0,0');
      expect(firstCall).toContain('100,100');
      expect(secondCall).toContain('M50,50');
      expect(secondCall).toContain('150,150');
    });
  });
});