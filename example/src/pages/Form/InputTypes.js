const InputTypes = {
  string: {
    type: "string",
    label: 'Text',
    acceptTypes: ["string"],
    color: "green",
    controls: [
      {
        type: "text",
        name: "text",
        label: "Text",
        defaultValue: ""
      }
    ]
  },
  boolean: {
    type: "boolean",
    label: 'True/False',
    acceptTypes: ["boolean"],
    controls: [
      {
        type: "checkbox",
        name: "boolean",
        label: "True/False",
        defaultValue: false
      }
    ]
  },
  number: {
    type: "number",
    label: 'Number',
    acceptTypes: ["number"],
    color: "red",
    controls: [
      {
        type: "number",
        name: "number",
        label: "Number",
        defaultValue: 0
      }
    ]
  },
  value: {
    type: "value",
    label: 'Value',
    acceptTypes: ["value", "number", "string", "boolean"],
    color: "yellow"
  },
  fieldId: {
    type: "fieldId",
    label: "Field",
    acceptTypes: ["string", "fieldId"],
    color: "blue",
    controls: [
      {
        type: "select",
        name: "selectedFieldId",
        label: "Field",
        defaultValue: "",
        placeholder: "[Select a Field]",
        options: []
      }
    ]
  },
  options: {
    type: "options",
    label: "Options",
    acceptTypes: ["options"],
    color: "pink"
  },
  stringArray: {
    type: "stringArray",
    label: "Array of strings",
    acceptTypes: ["stringArray"],
    color: "gray"
  }
}

export default InputTypes

export const getInputTypes = fields => {
  return {
    ...InputTypes,
    fieldId: {
      ...InputTypes.fieldId,
      controls: [
        {
          ...InputTypes.fieldId.controls[0],
          options: Object.values(fields).map(f => ({
            value: f.id,
            label: f.label,
            description: f.type
          }))
        }
      ]
    }
  };
};
