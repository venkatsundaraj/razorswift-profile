export const scrollToView = function (elementId) {
  const element = document.getElementById(elementId);
  element.scrollIntoView({ behavior: 'smooth' });
};
