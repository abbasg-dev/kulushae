import React from 'react';
import { Box } from '@mui/material';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import ControlledButton from 'components/button/button.component';
import { CSSProperties } from '@mui/styles';
interface FormBoxProps<T> {
  onSubmit?: SubmitHandler<T>;
  initialValues?: T;
  children?: React.ReactNode;
  sx?: Record<string, any>;
  submitValue?: string;
  methods?: UseFormReturn;
  submitStyle?: CSSProperties;
  disableSubmit?: boolean;
}
function FormBox<T>({ onSubmit, initialValues, children, sx, submitValue, methods, submitStyle, disableSubmit }: FormBoxProps<T>) {
  if (initialValues) {
    Object.keys(initialValues).forEach((key) => {
      methods?.setValue(`data.${key}` as any, initialValues[key]);
    });
  }
  return (
    submitValue || submitStyle || disableSubmit ? (
      <Box
        component={'form'}
        noValidate
        autoComplete="off"
        onSubmit={methods?.handleSubmit(onSubmit)}
        sx={sx}
      >
        <FormProvider {...methods}>
          {children}
          <ControlledButton
            value={submitValue}
            loadingButtonProps={{
              type: 'submit',
              fullWidth: true,
              sx: { py: '0.8rem', mt: '1rem' },
            }}
            customStyle={submitStyle}
            disabled={disableSubmit}
          />
        </FormProvider>
      </Box>
    ) : (
      <Box
        component={'form'}
        noValidate
        autoComplete="off"
        onSubmit={methods?.handleSubmit(onSubmit)}
        sx={sx}
      >
        <FormProvider {...methods}>
          {children}
        </FormProvider>
      </Box>
    )
  );
}
export default FormBox;