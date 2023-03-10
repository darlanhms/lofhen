import React from 'react';
import { FieldError } from 'react-hook-form';
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import FormHelperText from '../FormHelperText/FormHelperText';

export interface InputProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  fieldError?: FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps & ChakraInputProps>(
  ({ label, helperText, error, fieldError: hookError, ...rest }, ref) => {
    const fieldError = Boolean(hookError?.message) || error;
    const fieldHelperText = hookError?.message || helperText;

    return (
      <FormControl isInvalid={fieldError}>
        {label && <FormLabel marginBottom={1}>{label}</FormLabel>}
        <ChakraInput {...rest} ref={ref} />
        {fieldHelperText && <FormHelperText error={fieldError}>{fieldHelperText}</FormHelperText>}
      </FormControl>
    );
  },
);

export default Input;
