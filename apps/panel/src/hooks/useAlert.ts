import { useToast, UseToastOptions } from '@chakra-ui/react';

interface AlertFn {
  (title: string, description?: string, options?: UseToastOptions): void;
}

export interface UseAlertReturn {
  success: AlertFn;
  error: AlertFn;
  warn: AlertFn;
  info: AlertFn;
}

export default function useAlert(): UseAlertReturn {
  const toast = useToast();

  const toastAlert = (
    type: UseToastOptions['status'],
    title: string,
    description?: string,
    options?: UseToastOptions,
  ) => {
    toast({
      status: type,
      title,
      description,
      duration: 2000,
      position: 'top-right',
      ...options,
    });
  };

  const successAlert: AlertFn = (title, description, options) => {
    toastAlert('success', title, description, options);
  };

  const errorAlert: AlertFn = (title, description, options) => {
    toastAlert('error', title, description, options);
  };

  const warnAlert: AlertFn = (title, description, options) => {
    toastAlert('warning', title, description, options);
  };

  const infoAlert: AlertFn = (title, description, options) => {
    toastAlert('warning', title, description, options);
  };

  return {
    success: successAlert,
    error: errorAlert,
    warn: warnAlert,
    info: infoAlert,
  };
}
