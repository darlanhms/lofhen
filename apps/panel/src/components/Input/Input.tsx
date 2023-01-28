import React from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

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
        {label && <FormLabel>{label}</FormLabel>}
        <ChakraInput {...rest} ref={ref} />
        {fieldHelperText && fieldError ? (
          <FormErrorMessage>{fieldHelperText}</FormErrorMessage>
        ) : fieldHelperText ? (
          <FormHelperText>{fieldHelperText}</FormHelperText>
        ) : (
          <></>
        )}
      </FormControl>
    );
  },
);

export default Input;
