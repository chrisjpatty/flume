import React from "react";
import Modal from "./Modal";

const OptionsEditor = ({
  options: initialOptions,
  onChange,
  isOpen,
  onCloseRequested
}) => {
  const [options, setOptions] = React.useState(initialOptions);

  React.useEffect(() => {
    if (isOpen === true) {
      setOptions(initialOptions);
    }
  }, [isOpen, initialOptions]);

  const save = () => {
    onChange(options)
    onCloseRequested()
  }

  const setOption = (opt, i) => {
    setOptions(opts => [...opts.slice(0, i), opt, ...opts.slice(i + 1)]);
  };

  const addOption = () => {
    setOptions(opts => ([
      ...opts,
      {value: "", label: ""}
    ]))
  }

  return isOpen ? (
    <Modal onCloseRequested={onCloseRequested}>
      <div className="flex-column options-editor">
        <div className="flex-row controls-row">
          <button className="attribute-button align-right" onClick={save}>Save</button>
        </div>
        <div className="flex-row">
          <div className="half-column">
            <label>Value</label>
          </div>
          <div className="half-column">
            <label>Label</label>
          </div>
        </div>
        {options.map((option, i) => (
          <OptionRow {...option} onChange={opt => setOption(opt, i)} key={i} />
        ))}
        <div className="flex-row controls-footer">
          <button className="add-button align-right" onClick={addOption}>
            + Add Option
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default OptionsEditor;

const OptionRow = ({ value, label, onChange }) => {
  const handleChange = (key, val) => {
    onChange({ value, label, [key]: val });
  };

  return (
    <div className="flex-row option-row">
      <input
        type="text"
        value={value}
        onChange={e => handleChange("value", e.target.value)}
      />
      <input
        type="text"
        value={label}
        onChange={e => handleChange("label", e.target.value)}
      />
    </div>
  );
};
