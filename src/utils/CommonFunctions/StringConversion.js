// Convert string to sentence case (First letter capitalized, rest in lowercase)
export const convertToSentenceCase = string => {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Convert string to title case (First letter of each word capitalized)
export const convertToTitleCase = string => {
  if (typeof string !== 'string') {
    return '';
  }

  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Convert string to uppercase
export const convertToUppercase = string => {
  if (typeof string !== 'string') {
    return '';
  }

  return string.toUpperCase();
};

// Convert string to lowercase
export const convertToLowercase = string => {
  if (typeof string !== 'string') {
    return '';
  }

  return string.toLowerCase();
};
