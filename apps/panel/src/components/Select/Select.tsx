import React from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';
import FormHelperText from '../FormHelperText/FormHelperText';

interface SelectProps extends ChakraSelectProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  fieldError?: FieldError;
}

const Select: React.FC<SelectProps> = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, error, fieldError: hookError, children, ...rest }, ref) => {
    const fieldError = Boolean(hookError?.message) || error;
    const fieldHelperText = hookError?.message || helperText;

    return (
      <FormControl isInvalid={fieldError}>
        {label && <FormLabel marginBottom={1}>{label}</FormLabel>}
        <ChakraSelect {...rest} ref={ref}>
          {children}
        </ChakraSelect>
        {fieldHelperText && <FormHelperText error={fieldError}>{fieldHelperText}</FormHelperText>}
      </FormControl>
    );
  },
);

export default Select;
