import * as yup from 'yup';

const MIN_PASSWORD_LENGTH = 8;

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const schema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      )
      .matches(/[a-zа-я]/, 'Password must contain a lowercase letter')
      .matches(/[A-ZА-Я]/, 'Password must contain an uppercase letter')
      .matches(/[0-9]/, 'Password must contain a number')
      .matches(/[!@#$%^&*]/, 'Password must contain a special character'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password'),
  })
  .defined() as yup.ObjectSchema<FormData>;
