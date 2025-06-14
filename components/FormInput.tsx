import { Input, InputProps } from "@mantine/core";
import React from 'react';

interface FormInputProps extends InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
}

export default function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <Input.Wrapper
      label={label}
      error={error}
      required
    >
      <Input {...props} />
    </Input.Wrapper>
  );
}
