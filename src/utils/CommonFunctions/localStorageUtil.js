export const localStorageUtil = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: key => {
    if (typeof localStorage !== 'undefined') {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  },
  appendItem: (key, item) => {
    const value = localStorage.getItem(key);
    const parsedValue = value ? JSON.parse(value) : [];
    const updatedValue = [...parsedValue, item];
    localStorage.setItem(key, JSON.stringify(updatedValue));
  },
  deleteItem: key => {
    localStorage.removeItem(key);
  },
};

// how to use the above code

// import { localStorageUtil } from '../utils/localStorageUtil';

// Set an item in local storage
// localStorageUtil.setItem('myKey', { name: 'John', age: 30 });

// Get an item from local storage
// const myValue = localStorageUtil.getItem('myKey');

// Append an item to an array in local storage
// localStorageUtil.appendItem('myArrayKey', 'newItem');

// Delete an item from local storage
// localStorageUtil.deleteItem('myKey');
