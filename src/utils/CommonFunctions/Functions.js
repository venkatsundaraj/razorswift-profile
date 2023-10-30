export function debounce(func, delay) {
  let timerId;
  return function (...args) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export function trimObjectValues(obj) {
  const trimValue = value => (typeof value === 'string' ? value.trim() : value);
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, trimValue(value)])
  );
}

// export function checkAndSet(obj) {
//   Object.keys(obj).forEach(key => {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       checkAndSet(obj[key]);
//     } else if (obj[key] === null) {
//       obj[key] = '';
//     }
//   });
//   return obj;
// }

// export function reverseCheckAndSet(obj) {
//   Object.keys(obj).forEach(key => {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       reverseCheckAndSet(obj[key]);
//     } else if (obj[key] === '') {
//       obj[key] = null;
//     }
//   });
//   return obj;
// }

export function checkAndSet(obj) {
  const stack = [obj];

  while (stack.length > 0) {
    const currentObj = stack.pop();

    for (const key in currentObj) {
      if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
        stack.push(currentObj[key]);
      } else if (currentObj[key] === null) {
        currentObj[key] = '';
      } else if (typeof currentObj[key] === 'string') {
        currentObj[key] = currentObj[key].trim();
      }
    }
  }

  return obj;
}

export function reverseCheckAndSet(obj) {
  const stack = [obj];

  while (stack.length > 0) {
    const currentObj = stack.pop();

    for (const key in currentObj) {
      if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
        stack.push(currentObj[key]);
      } else if (currentObj[key] === '') {
        currentObj[key] = null;
      } else if (typeof currentObj[key] === 'string') {
        currentObj[key] = currentObj[key].trim();
      }
    }
  }

  return obj;
}

// function reverseCheckAndSet(obj, defaultValue) {
//   Object.keys(obj).forEach(key => {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       reverseCheckAndSet(obj[key], defaultValue);
//     } else if (obj[key] === '') {
//       obj[key] = defaultValue;
//     }
//   });
//   return obj;
// }

// let obj = {
//   a: '',
//   b: {
//     c: '',
//     d: 123,
//     e: {
//       f: ''
//     }
//   }
// };

// console.log(reverseCheckAndSet(obj, 'default'));
// // Output: { a: 'default', b: { c: 'default', d: 123, e: { f: 'default' } } }

export const formatUrl = Url => {
  if (!Url.startsWith('http')) {
    Url = `http://${Url}`;
  }
  return Url;
};
export const levelWeightConversion = WeightNumber => {
  switch (true) {
    case WeightNumber >= 0 && WeightNumber <= 33:
      return 1;
    case WeightNumber >= 34 && WeightNumber <= 67:
      return 2;
    case WeightNumber >= 68 && WeightNumber <= 100:
      return 3;
    default:
      return '';
  }
};
export function formatContactNumber(contactNumber) {
  const formattedNumber = contactNumber
    ? `+${contactNumber.slice(0, 2)} ${contactNumber.slice(2)}`
    : '';
  return formattedNumber;
}

export function convertSnakeCaseToSentenceCase(value) {
  const words = value.split('_');
  const sentenceCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else {
      return word.toLowerCase();
    }
  });
  return sentenceCaseWords.join(' ');
}

export function extractLastTenDigits(contactValues) {
  if (!contactValues || typeof contactValues !== 'object') {
    // Handle invalid input or non-object input
    return null;
  }

  const { contactNumber, ...rest } = contactValues;

  if (typeof contactNumber !== 'string' || contactNumber.length < 10) {
    // If contactNumber is invalid or too short, return the input object as-is
    return contactValues;
  }

  const updatedContactValue = {
    ...rest,
    contactNumber: contactNumber.substring(contactNumber.length - 10),
  };

  return updatedContactValue;
}
