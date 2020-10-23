import React from 'react'
import { render } from '@testing-library/react'
import { NodeEditor, FlumeConfig, Colors, Controls } from '../'

const config = new FlumeConfig()
  .addPortType({
    type: 'text',
    name: 'text',
    label: 'Text',
    color: Colors.green,
    controls: [
      Controls.text({
        name: 'text',
        label: 'Text'
      })
    ]
  })
  .addNodeType({
    type: 'text',
    label: 'Text',
    inputs: ports => [ports.text({})],
    outputs: ports => [ports.text()]
  })
  .addNodeType({
    type: 'transputFromContext',
    label: 'From Context',
    inputs: ports => (_, __, context) =>
      context.transputs.map(id => ports.text({ name: id, label: id })),
    outputs: ports => (_, __, context) =>
      context.transputs.map(id => ports.text({ name: id, label: id }))
  })
  .addNodeType({
    type: 'transputFromText',
    label: 'From Text',
    inputs: ports => data => {
      const name = data && data.name && data.name.text
      return [
        ports.text({ name: 'name', label: 'Name' }),
        name && ports.text({ name, label: name })
      ].filter(Boolean)
    },
    outputs: ports => data => {
      const name = data && data.name && data.name.text
      return name ? [ports.text({ name, label: name })] : []
    }
  })

describe('Dynamic transputs', () => {
  test('can be added and removed', () => {
    const Editor = ({ transputs }) => (
      <div style={{ width: 400, height: 400 }}>
        <NodeEditor
          nodes={{
            a: {
              id: 'a',
              x: 0,
              y: 0,
              type: 'transputFromContext',
              width: 100,
              inputData: {},
              connections: { inputs: {}, outputs: {} }
            }
          }}
          context={{ transputs }}
          nodeTypes={config.nodeTypes}
          portTypes={config.portTypes}
        />
      </div>
    )

    const { rerender, container } = render(<Editor transputs={['one']} />)

    const select = (type, name) =>
      `[data-port-transput-type="${type}"][data-port-name="${name}"]`
    const input = name => container.querySelector(select('input', name))
    const output = name => container.querySelector(select('output', name))

    expect(input('one')).not.toBe(null)
    expect(input('two')).toBe(null)
    expect(output('one')).not.toBe(null)
    expect(output('two')).toBe(null)

    rerender(<Editor transputs={['one', 'two']} />)

    expect(input('one')).not.toBe(null)
    expect(input('two')).not.toBe(null)
    expect(output('one')).not.toBe(null)
    expect(output('two')).not.toBe(null)

    rerender(<Editor transputs={['two']} />)

    expect(input('one')).toBe(null)
    expect(input('two')).not.toBe(null)
    expect(output('one')).toBe(null)
    expect(output('two')).not.toBe(null)
  })

  test('connections are destroyed when an input is removed', () => {
    const onChange = jest.fn()
    const Editor = ({ transputs }) => (
      <div style={{ width: 400, height: 400 }}>
        <NodeEditor
          nodes={{
            t: {
              id: 't',
              x: 0,
              y: 0,
              type: 'text',
              width: 100,
              inputData: {},
              connections: {
                inputs: {},
                outputs: { text: [{ nodeId: 'a', portName: 'one' }] }
              }
            },
            a: {
              id: 'a',
              x: 200,
              y: 0,
              type: 'transputFromContext',
              width: 100,
              inputData: {},
              connections: {
                inputs: { one: [{ nodeId: 't', portName: 'text' }] },
                outputs: {}
              }
            }
          }}
          onChange={onChange}
          context={{ transputs }}
          nodeTypes={config.nodeTypes}
          portTypes={config.portTypes}
        />
      </div>
    )

    const { rerender, container } = render(<Editor transputs={['one']} />)
    const get = id => container.querySelector(`[data-connection-id="${id}"]`)

    expect(get('ttextaone')).not.toBe(null)
    rerender(<Editor transputs={['zero', 'one']} />)
    expect(get('ttextaone')).not.toBe(null)
    rerender(<Editor transputs={['zero']} />)
    expect(get('ttextaone')).toBe(null)

    const lastCall = onChange.mock.calls.pop()[0]
    expect(lastCall.t.connections.outputs).toEqual({ text: [] })
    expect(lastCall.a.connections.inputs).toEqual({})
  })

  test('connections are destroyed when an output is removed', () => {
    const onChange = jest.fn()
    const Editor = ({ transputs }) => (
      <div style={{ width: 400, height: 400 }}>
        <NodeEditor
          nodes={{
            t: {
              id: 't',
              x: 0,
              y: 0,
              type: 'text',
              width: 100,
              inputData: {},
              connections: {
                inputs: { text: [{ nodeId: 'a', portName: 'one' }] },
                outputs: {}
              }
            },
            a: {
              id: 'a',
              x: 200,
              y: 0,
              type: 'transputFromContext',
              width: 100,
              inputData: {},
              connections: {
                inputs: {},
                outputs: { one: [{ nodeId: 't', portName: 'text' }] }
              }
            }
          }}
          onChange={onChange}
          context={{ transputs }}
          nodeTypes={config.nodeTypes}
          portTypes={config.portTypes}
        />
      </div>
    )

    const { rerender, container } = render(<Editor transputs={['one']} />)
    const get = id => container.querySelector(`[data-connection-id="${id}"]`)

    expect(get('aonettext')).not.toBe(null)
    rerender(<Editor transputs={['zero', 'one']} />)
    expect(get('aonettext')).not.toBe(null)
    rerender(<Editor transputs={['zero']} />)
    expect(get('aonettext')).toBe(null)

    const lastCall = onChange.mock.calls.pop()[0]
    expect(lastCall.a.connections.outputs).toEqual({ one: [] })
    expect(lastCall.t.connections.inputs).toEqual({})
  })

  test('supports removing transput with numeric name', () => {
    const onChange = jest.fn()
    const Editor = ({ transputs }) => (
      <div style={{ width: 400, height: 400 }}>
        <NodeEditor
          nodes={{
            t: {
              id: 't',
              x: 0,
              y: 0,
              type: 'text',
              width: 100,
              inputData: {},
              connections: {
                inputs: {},
                outputs: { text: [{ nodeId: 'a', portName: '1' }] }
              }
            },
            a: {
              id: 'a',
              x: 200,
              y: 0,
              type: 'transputFromContext',
              width: 100,
              inputData: {},
              connections: {
                inputs: { '1': [{ nodeId: 't', portName: 'text' }] },
                outputs: {}
              }
            }
          }}
          onChange={onChange}
          context={{ transputs }}
          nodeTypes={config.nodeTypes}
          portTypes={config.portTypes}
        />
      </div>
    )

    const { rerender, container } = render(<Editor transputs={[1]} />)
    const get = id => container.querySelector(`[data-connection-id="${id}"]`)

    expect(get('ttexta1')).not.toBe(null)
    rerender(<Editor transputs={[]} />)
    expect(get('ttexta1')).toBe(null)

    const lastCall = onChange.mock.calls.pop()[0]
    expect(lastCall.t.connections.outputs).toEqual({ text: [] })
    expect(lastCall.a.connections.inputs).toEqual({})
  })

  test('preserves dynamic inputData', () => {
    const onChange = jest.fn()
    const { getByText } = render(
      <div style={{ width: 400, height: 400 }}>
        <NodeEditor
          nodes={{
            a: {
              id: 'a',
              x: 0,
              y: 0,
              type: 'transputFromContext',
              width: 100,
              inputData: { one: { text: 'testing context' } },
              connections: { inputs: {}, outputs: {} }
            },
            b: {
              id: 'b',
              x: 200,
              y: 0,
              type: 'transputFromText',
              width: 100,
              inputData: {
                name: { text: 'two' },
                two: { text: 'testing text' }
              },
              connections: { inputs: {}, outputs: {} }
            }
          }}
          onChange={onChange}
          context={{ transputs: ['one'] }}
          nodeTypes={config.nodeTypes}
          portTypes={config.portTypes}
        />
      </div>
    )
    const lastCall = onChange.mock.calls.pop()[0]
    expect(lastCall.a.inputData.one).toEqual({ text: 'testing context' })
    expect(lastCall.b.inputData.name).toEqual({ text: 'two' })
    expect(lastCall.b.inputData.two).toEqual({ text: 'testing text' })
    getByText('testing context')
    getByText('testing text')
  })
})
