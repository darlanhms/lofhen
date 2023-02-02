import React from 'react';
import {
  FormHelperText as ChakraFormHelperText,
  FormErrorMessage,
  FormHelperTextProps as ChakraFormHelperTextProps,
} from '@chakra-ui/react';

interface FormHelperTextProps extends ChakraFormHelperTextProps {
  error?: boolean;
}

const FormHelperText: React.FC<FormHelperTextProps> = ({ error, children, ...rest }) => {
  if (error) {
    return <FormErrorMessage {...rest}>{children}</FormErrorMessage>;
  }

  return <ChakraFormHelperText {...rest}>{children}</ChakraFormHelperText>;
};

export default FormHelperText;
