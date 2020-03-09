import NodeTypes from './NodeTypes'
import { previewState } from './Form'

const getRootNode = nodes =>
  nodes[Object.values(nodes).find(n => n.type === "output").id];

// const loopTransputs = (transputs, callback) => {
//   Object.entries(transputs).forEach(([inputName, connection]) => {
//     callback(inputName, connection);
//   });
// };

const mapTransputs = (transputs, callback) => (
  Object.entries(transputs).map(([inputName, connection]) => {
    return callback(inputName, connection);
  })
);

const fireNodeFunction = (node, inputValues, nodeType) => {
  switch (node.type) {
    case "number": return { number: inputValues.number };
    case "boolean": return { boolean: inputValues.boolean };
    case "string": return { string: inputValues.string };
    case "and": return { output: inputValues.val1 && inputValues.val2 };
    case "or": return { output: inputValues.val1 || inputValues.val2 };
    case "valueEqualsBoolean": return { output: inputValues.val1 === inputValues.boolean };
    case "valueEqualsValue": return { output: inputValues.val1 === inputValues.val2 };
    case "textSwitch": return { output: inputValues.test ? inputValues.textIfTrue : inputValues.textIfFalse}
    case "field": {
      const fields = previewState.getFields()
      const field = fields[inputValues.fieldId]
      return field ? resolveLogic(field, fields) : {}
    }
    case "valueEqualsOneOfOptions": {
      let value = inputValues.value
      if(value === undefined){
        const fields = previewState.getFields()
        const field = fields[inputValues.fieldId] || {}
        value = field.value
      }
      return { output: inputValues.selectedOptions.includes(value) }
    }
    default:
      return undefined
  }
}

const resolveInputControls = (type, data) => {
  switch (type) {
    case "number":
      return data.number;
    case "boolean":
      return data.boolean;
    case "string":
      return data.text;
    case "fieldId":
      return data.selectedFieldId;
    case "textSwitch":
      return {
        textIfTrue: data.textIfTrue.text,
        textIfFalse: data.textIfFalse.text
      };
    case "stringArray":
      return data.values
    case "value":
      return Object.keys(data).length ? data : undefined
    default:
      return data;
  }
};

const resolveInputValues = (node, nodeType, nodes) => {
  return nodeType.inputs.reduce((obj, input) => {
    const inputConnections = node.connections.inputs[input.name] || []
    if(inputConnections.length > 0){
      obj[input.name] = getValueOfConnection(inputConnections[0], nodes)
    }else{
      obj[input.name] = resolveInputControls(input.type, node.inputData[input.name])
    }
    return obj
  }, {})
}

const getValueOfConnection = (connection, nodes) => {
  const outputNode = nodes[connection.nodeId]
  const outputNodeType = NodeTypes[outputNode.type]
  const inputValues = resolveInputValues(outputNode, outputNodeType, nodes)
  const outputResult = fireNodeFunction(outputNode, inputValues, outputNodeType)[connection.portName]
  return outputResult
}

const resolveLogic = (field, fields) => {
  const rootNode = getRootNode(field.logic);
  const attributes = mapTransputs(
    rootNode.connections.inputs,
    (inputName, connection) => {
      return {
        name: inputName,
        value: getValueOfConnection(connection[0], field.logic)
      }
    }
  ).reduce((obj, attr) => {
    obj[attr.name] = attr.value !== undefined ? attr.value : field[attr.name]
    return obj
  }, {})
  return {...field, ...attributes}
};

export default resolveLogic;
