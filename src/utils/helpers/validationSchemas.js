import * as Yup from 'yup'
import { alphabetsRegExp, phoneRegExp } from './regex'

export const alphabetsValidationSchema = (fieldName, required) => {
  let validation = Yup.string()
    .nullable()
    .trim()
    .min(3, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`)
    .matches(
      alphabetsRegExp,
      `${fieldName} cannot contain numbers or special characters`
    )

  if (required) {
    validation = validation.required(`${fieldName} is required`)
  }

  return validation
}

export const emailValidation = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    .email(`Please enter a valid ${fieldName}`)
    .min(1, `${fieldName} must be at least 1 character`)
    .max(50, `${fieldName} cannot be more than 50 characters`)

  if (required) {
    validation = validation.required(`${fieldName} is required`)
  }

  return validation
}

export const validateContactNumber = (fieldName, required) => {
  if (typeof fieldName === 'number') return
  let validation = Yup.string()
    .matches(phoneRegExp, 'Enter a valid contact number')
    .trim()
    .min(10, `${fieldName} must be 10 digit number`)
    .max(10, `${fieldName} must be 10 digit number`)

  if (required) {
    validation = validation.required(`${fieldName} is required`)
  }

  return validation
}

export const messageValidation = (fieldName, required) => {
  let validation = Yup.string()
    .nullable()
    .trim()
    .min(10, `${fieldName} must be at least 10 character`)
    .max(400, `${fieldName} cannot be more than 400 characters`)

  if (required) {
    validation = validation.required(`${fieldName} is required`)
  }

  return validation
}

export const nameValidationwithNoRegex = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    // .min(1, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`)
  // .nullable();

  if (required) {
    validation = validation.required(`${fieldName} is required`)
  }

  return validation
}
