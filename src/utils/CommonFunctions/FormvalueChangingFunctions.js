export function parseExperience(totalExperience) {
  const years = parseInt(totalExperience);
  const decimalPart = (totalExperience % 1).toFixed(2).split('.')[1];
  const months = decimalPart ? decimalPart.toString().padStart(2, '0') : '00';
  if (!totalExperience)
    return {
      years: '',
      months: '',
    };
  return {
    years: years,
    months: months,
  };
}

export const getExperienceRange = jdData => {
  const minimumExperience = jdData?.minimumExperienceInYears;
  const maximumExperience = jdData?.maximumExperienceInYears;

  if (minimumExperience && maximumExperience) {
    return `${minimumExperience} - ${maximumExperience} yrs`;
  } else if (maximumExperience) {
    return `Up to ${maximumExperience} ${maximumExperience > 1 ? 'yrs' : 'yr'}`;
  } else if (minimumExperience) {
    return `${minimumExperience} ${
      minimumExperience > 1 ? 'yrs' : 'yr'
    } and above`;
  } else {
    return '-';
  }
};

export const getSalaryRange = jdData => {
  const minimumSalary = jdData?.minimumSalary;
  const maximumSalary = jdData?.maximumSalary;

  if (minimumSalary && maximumSalary) {
    return `${minimumSalary} - ${maximumSalary} Inr`;
  } else if (maximumSalary) {
    return `Up to ${maximumSalary} Inr`;
  } else if (minimumSalary) {
    return `${minimumSalary} Inr and above`;
  } else {
    return '-';
  }
};
