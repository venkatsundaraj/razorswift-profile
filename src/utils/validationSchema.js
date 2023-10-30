import {
  AlphabetSpecialCharRegExp,
  alphabetsRegExp,
  commonRegExp,
  letterSpaceHyphenUnderscoreRegex,
  phoneRegExp,
} from '@/utils/regex';
import { sub } from 'date-fns/fp';
import * as Yup from 'yup';
export const alphabetsValidationSchema = (fieldName, required) => {
  let validation = Yup.string()
    .nullable()
    .trim()
    .min(1, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`)
    .matches(
      alphabetsRegExp,
      `${fieldName} cannot contain numbers or special characters`
    );

  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};
export const alphabetsValidationSchemaNotRequired = fieldName =>
  Yup.string()
    .nullable()
    .trim()
    .matches(
      alphabetsRegExp,
      `${fieldName} cannot contain numbers or special characters`
    )
    .min(1, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`)
    .nullable();

export const alphabetsValidationSchemaLong = fieldName =>
  Yup.string()
    .trim()
    .nullable()
    .min(1, `${fieldName} must be at least 1 character`)
    .max(2048, `${fieldName} cannot be more than 2048 characters`)
    .nullable();

export const multiLineValidation = (
  fieldName,
  isRequired = false,
  min = 1,
  max = 250
) => {
  let validation = Yup.string()
    .trim()
    .nullable()
    .min(min, `${fieldName} must be at least ${min} character`)
    .max(max, `${fieldName} cannot be more than ${max} characters`)
    .nullable();

  if (isRequired) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};

export const mobileNumberValidationSchema = fieldName =>
  Yup.string()
    .nullable()
    .trim()
    .required(`${fieldName} is required`)
    .matches(phoneRegExp, `${fieldName} must be a valid number.`)
    .min(10, `${fieldName} must be a 10 digit number`)
    .max(10, `${fieldName} must be a 10 digit number`);

export const EditorValidationSchema = fieldName =>
  Yup.string()
    .nullable()
    .trim()
    .min(1, `${fieldName} must be at least 1 character`)
    // .max(500, `${fieldName} is too long`)

    .test('not-null', `${fieldName} is required`, value => value !== null)
    .required(`${fieldName} is required`);

export const EditorValidationSchemaNotRequired = fieldName =>
  Yup.string()
    .trim()
    .min(1, `${fieldName} must be at least 1 character`)
    // .max(500, `${fieldName} is too long`)
    .nullable()
    .test('not-null', `${fieldName} is required`, value => value !== null);

export const addifnotexistdropdownValidationSchema = (fieldName, min, max) =>
  Yup.mixed()
    .nullable()
    .test(
      'input-value-length',
      `${fieldName} should be between ${min} to ${max} characters`,
      value => {
        if (
          typeof value === 'object' &&
          value &&
          value.hasOwnProperty('inputValue')
        ) {
          const inputValue = value.inputValue.trim();

          return inputValue.length >= min && inputValue.length <= max;
        }
        return true;
      }
    )
    .required(`Please select or add from ${fieldName} dropdown`);

export const addifnotexistdropdownValidationSchemaNotRequired = (
  fieldName,
  min,
  max
) =>
  Yup.mixed()
    .nullable()
    .test(
      'input-value-length',
      toSentenceCase(
        `${fieldName} should be between ${min} to ${max} characters`
      ),
      value => {
        if (
          typeof value === 'object' &&
          value &&
          value.hasOwnProperty('inputValue')
        ) {
          const inputValue = value.inputValue.trim();

          return inputValue.length >= min && inputValue.length <= max;
        }
        return true;
      }
    )
    .test(
      'input-value-non-numeric',
      `${fieldName} should not contain any numbers`,
      value => {
        if (
          typeof value === 'object' &&
          value &&
          value.hasOwnProperty('inputValue')
        ) {
          const inputValue = value.inputValue.trim();

          return /^[^0-9]*$/.test(inputValue);
        }
        return true;
      }
    );

export const dropdownValidationSchema = (fieldName, min, max) =>
  Yup.mixed()
    .nullable()

    .test(
      'input-value-length',
      toSentenceCase(
        `${fieldName} should be between ${min} to ${max} characters`
      ),
      value => {
        if (
          typeof value === 'object' &&
          value &&
          value.hasOwnProperty('inputValue')
        ) {
          const inputValue = value.inputValue.trim();

          return inputValue.length >= min && inputValue.length <= max;
        }
        return true;
      }
    )
    .required(`Please select from ${fieldName} dropdown`);

function toSentenceCase(str) {
  if (!str) return '';
  const firstChar = str.charAt(0);
  return firstChar.toUpperCase() + str.slice(1).toLowerCase();
}

export const nameValidation = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    .min(1, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`)
    .matches(
      commonRegExp,
      `${fieldName} cannot contain numbers or special characters`
    )
    .nullable();
  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};
export const nameLetterSpaceHyphenUnderscoreValidation = (
  fieldName,
  required
) => {
  let validation = Yup.string()
    .trim()
    .min(1, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`)
    .matches(
      letterSpaceHyphenUnderscoreRegex,
      `${fieldName} can only contain letters, spaces, hyphens, and underscores`
    )
    .nullable();
  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};
export const nameOtherValidation = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    .min(1, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`)
    .nullable()
    .matches(AlphabetSpecialCharRegExp, `${fieldName} cannot contain numbers`);

  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};
export const nameOtherValidationContact = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    .nullable()
    .min(1, `${fieldName} must be at least 1 character`)
    .max(50, `${fieldName} cannot be more than 100 characters`);

  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};

export const emailValidation = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    .email(`Please enter a valid ${fieldName}`)
    .min(1, `${fieldName} must be at least 1 character`)
    .max(50, `${fieldName} cannot be more than 50 characters`);

  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};

export const validateContactNumber = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    .matches(phoneRegExp, 'Enter a valid contact number')
    .min(10, `${fieldName} must be 10 digit number`)
    .max(10, `${fieldName} must be 10 digit number`);

  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};
export const nameValidatorNoRegex = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    .nullable()
    .min(1, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`);

  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};
export const addifnotexistMultipledropdownValidationSchema = fieldName =>
  Yup.array()
    .min(1, `Please select or add from ${fieldName} dropdown`)
    .required(`Please select or add from ${fieldName} dropdown`);

export const staticDropDownValidation = (
  fieldName,
  required,
  dropDownValues,
  isorare = 'is'
) => {
  let schema = Yup.string().nullable();

  if (required) {
    schema = schema.required(`${fieldName} ${isorare} required`);
  }

  return schema.oneOf(
    dropDownValues.map(item => String(item.value)),
    `Please select a ${fieldName} from the drop-down`
  );
};
export const nameValidationwithNoRegex = (fieldName, required) => {
  let validation = Yup.string()
    .trim()
    .min(1, `${fieldName} must be at least 1 character`)
    .max(100, `${fieldName} cannot be more than 100 characters`)
    .nullable();

  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};
export const YearValidation = (fieldName, required) => {
  let validation = Yup.number()
    .min(0, `${fieldName} cannot be negative`)
    .typeError(`${fieldName} must be a number`)
    .integer(`${fieldName} must be an integer`);

  if (required) {
    validation = validation.required(`${fieldName} are required`);
  }

  return validation;
};
export const DateOfBirthValidation = (fieldName, required) => {
  let validation = Yup.date()

    .nullable()
    .max(sub({ years: 18 }, new Date()), 'You must be at least 18 years old');

  if (required) {
    validation = validation.required(`${fieldName} is required`);
  }

  return validation;
};
