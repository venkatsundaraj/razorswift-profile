export const getFormTypes = key => {
  const formTypes = {
    Add_View: '1',
    Add_Form: '2',
    Edit_Form: '3',
  };

  if (key) {
    return formTypes[key];
  } else {
    return formTypes;
  }
};
