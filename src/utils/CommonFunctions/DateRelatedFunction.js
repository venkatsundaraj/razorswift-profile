// export const getMonthYearFromUTC = utcTimestamp => {
//   const date = new Date(utcTimestamp);
//   const year = date.getUTCFullYear();
//   const month = date.toLocaleString('default', { month: 'short' });
//   return `${month} ${year}`;
// };

export const getMonthYearFromUTC = utcTimestamp => {
  if (!utcTimestamp) {
    return '-';
  }

  const date = new Date(utcTimestamp);
  const year = date.getUTCFullYear();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${month} ${year}`;
};

export const convertMonthsToYearsAndMonths = months => {
  const years = Math.floor(months / 12);
  const remainingMonths = Math.round(months % 12);
  if (years === 0 && remainingMonths === 0) {
    return '';
  }
  const yearText = years > 0 ? `${years} ${years === 1 ? 'yr' : `yrs`}` : '';
  const monthText =
    remainingMonths > 0
      ? `${remainingMonths} ${remainingMonths === 1 ? 'mo' : `mths`}`
      : '';
  const separator = yearText && monthText ? ' ' : ' ';
  return `${yearText}${separator}${monthText}`;
};
export const convertMonthsToYearsAndMonthsBrackets = months => {
  const years = Math.floor(months / 12);
  const remainingMonths = Math.round(months % 12);
  if (years === 0 && remainingMonths === 0) {
    return '';
  }
  const yearText = years > 0 ? `${years} ${years === 1 ? 'yr' : `yrs`}` : '';
  const monthText =
    remainingMonths > 0
      ? `${remainingMonths} ${remainingMonths === 1 ? 'mo' : `mths`}`
      : '';
  const separator = yearText && monthText ? ' ' : ' ';
  return `(${yearText}${separator}${monthText})`;
};
export const convertYearsToYearsAndMonthsBrackets = years => {
  const months = typeof years === 'string' ? parseInt(years) * 12 : years * 12;
  const remainingMonths = Math.round(months % 12);
  if (months === 0) {
    return '';
  }
  const yearText = years > 0 ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '';
  const monthText =
    remainingMonths > 0
      ? `${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mths'}`
      : '';
  const separator = yearText && monthText ? ' ' : '';
  return `(${yearText}${separator}${monthText})`;
};
export const convertDecimalToYearsAndMonths = decimalValue => {
  const integerPart = Math.floor(decimalValue);
  const decimalPart = decimalValue.toString().split('.')[1] || '';
  const months = parseInt(decimalPart.slice(0, 2), 10);
  if (integerPart === 0 && months === 0) {
    return '';
  }
  const yearText =
    integerPart > 0 ? `${integerPart} ${integerPart === 1 ? 'yr' : 'yrs'}` : '';
  const monthText =
    months > 0 ? `${months} ${months === 1 ? 'mo' : 'mths'}` : '';
  const separator = yearText && monthText ? ' ' : '';
  return `${yearText}${separator}${monthText}`;
};

export function getDateDiffInRoundedMonths(startDate, endDate) {
  var start = new Date(startDate);
  var end = new Date(endDate);

  if (start > end) {
    const temp = start;
    start = end;
    end = temp;
  }

  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  const endYear = end.getFullYear();
  const endMonth = end.getMonth();

  const diffInMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
  return Math.abs(diffInMonths);
}

export const convertToTZ = dateStr => {
  const timezoneOffset = 330;
  const date = new Date(dateStr);
  date.setMinutes(date.getMinutes() + timezoneOffset); // adjust for timezone offset
  const tzOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const tzOffsetMinutes = Math.abs(timezoneOffset) % 60;
  const tzSign = timezoneOffset < 0 ? '-' : '+';
  const tzStr =
    tzSign + padZero(tzOffsetHours) + ':' + padZero(tzOffsetMinutes);
  return date.toISOString().slice(0, 16) + ':00' + tzStr;
};

export const constpadZero = num => {
  return num < 10 ? '0' + num : num;
};

export const convertFromTZ = dateStr => {
  const date = new Date(dateStr);
  const offsetIndex =
    dateStr.lastIndexOf('+') > -1
      ? dateStr.lastIndexOf('+')
      : dateStr.lastIndexOf('-');
  const tzOffset = dateStr.slice(offsetIndex);
  const tzOffsetHours = parseInt(tzOffset.slice(1, 3));
  const tzOffsetMinutes = parseInt(tzOffset.slice(4, 6));
  date.setMinutes(date.getMinutes() - tzOffsetHours * 60 - tzOffsetMinutes); // adjust for timezone offset
  return date.toISOString().slice(0, 16);
};

export function convertDateReadFormat(value) {
  let numValue = parseFloat(value);
  if (isNaN(numValue)) {
    numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
    if (isNaN(numValue)) {
      return '-';
    }
  }
  const years = Math.floor(numValue / 12);
  const months = numValue % 12;
  let result = '';
  if (years > 0) {
    result += `${years}yr `;
  }
  if (months > 0) {
    result += `${months}mo`;
  }
  if (result === '') {
    return '-';
  }
  return result.trim();
}

// export function formatDate(dateTime) {
//   if (dateTime && (typeof dateTime === 'string' || dateTime instanceof Date)) {
//     // Parse input date-time string as a Date object
//     const date = new Date(dateTime);

//     // Add 5 hours and 30 minutes to the date object
//     date.setHours(date.getHours() + 5);
//     date.setMinutes(date.getMinutes() + 30);

//     // Get day, month, and year components
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear().toString();

//     // Get hours, minutes, and seconds components
//     let hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');

//     // Determine AM/PM suffix and adjust hours if necessary
//     const amPm = hours >= 12 ? 'pm' : 'am';
//     hours %= 12;
//     hours = hours || 12;

//     // Construct formatted date-time string
//     const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes} ${amPm}`;

//     return formattedDateTime;
//   } else {
//     return '';
//   }
// }

export function formatDate(dateTime, type = 'date') {
  if (dateTime && (typeof dateTime === 'string' || dateTime instanceof Date)) {
    // Parse input date-time string as a Date object
    const date = new Date(dateTime);

    // Get day, month, and year components
    const day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    // Check the type parameter and format the date accordingly
    let formattedDateTime = '';
    if (type === 'date') {
      formattedDateTime = `${day}/${month}/${year}`;
    } else if (type === 'month') {
      month = new Date(date.getTime()).toLocaleString('default', {
        month: 'short',
      });
      formattedDateTime = `${month} ${year}`;
    } else if (type === 'datetime') {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12;

      formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes} ${amPm}`;
    }

    return formattedDateTime;
  } else {
    return '';
  }
}

export function formatLambdaDate(dateTime, type = 'date') {
  if (dateTime && typeof dateTime === 'string' && dateTime.length === 19) {
    // Convert the Lambda API return format to a format JavaScript Date can handle
    const compatibleDateTime = dateTime.replace(' ', 'T');

    // Parse the modified date-time string as a Date object
    const date = new Date(compatibleDateTime);

    // Get day, month, and year components based on local timezone
    const day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    let formattedDateTime = '';
    if (type === 'date') {
      formattedDateTime = `${day}/${month}/${year}`;
    } else if (type === 'month') {
      month = date.toLocaleString('default', { month: 'short' });
      formattedDateTime = `${month} ${year}`;
    } else if (type === 'datetime') {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const amPm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      hours = hours || 12;

      formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes} ${amPm}`;
    }

    return formattedDateTime;
  } else {
    return '';
  }
}

export function convertMonthsToYears(months) {
  if (typeof months !== 'string' && typeof months !== 'number') {
    console.error('Invalid input for months');
    return null;
  }

  const parsedMonths = parseInt(months, 10);

  if (isNaN(parsedMonths) || parsedMonths < 0) {
    console.error('Invalid input for months');
    return null;
  }

  const years = Math.floor(parsedMonths / 12);
  return years;
}

export function convertYearsToMonths(years) {
  if (typeof years !== 'string' && typeof years !== 'number') {
    console.error('Invalid input for years');
    return null;
  }

  const parsedYears = parseInt(years, 10);

  if (isNaN(parsedYears) || parsedYears < 0) {
    console.error('Invalid input for years');
    return null;
  }

  const months = parsedYears * 12;
  return months;
}

export function getFirstDayOfCurrentMonth() {
  const firstDay = new Date();
  firstDay.setDate(1);
  firstDay.setHours(0, 0, 0, 0);
  return firstDay;
}

// Output

// Output: 60
