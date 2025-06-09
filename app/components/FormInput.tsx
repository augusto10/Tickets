import React from 'react';
import { Input, InputProps } from "@mantine/core";

interface FormInputProps extends InputProps {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, ...props }) => {
  return (
    <Input.Wrapper
      label={label}
      error={error}
      required
    >
      <Input {...props} />
    </Input.Wrapper>
  );
};

export default FormInput;
