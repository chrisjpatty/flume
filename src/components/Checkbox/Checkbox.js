import React from "react";
import styled from "@emotion/styled";
const nanoid = require("nanoid");

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background: linear-gradient(to bottom, #5b5f62, #6f7477);
  border: 1px solid #3c3e40;
  border-radius: 4px;
  margin-right: 8px;
`;

const Label = styled.label`
  padding-top: 2px;
  font-size: 13px;
`;

const Checkbox = ({ label, data, onChange }) => {
  const id = React.useRef(nanoid(10));

  return (
    <Wrapper>
      <Input
        type="checkbox"
        id={id}
        value={data}
        checked={data}
        onChange={e => onChange(e.target.checked)}
      />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};

export default Checkbox;
