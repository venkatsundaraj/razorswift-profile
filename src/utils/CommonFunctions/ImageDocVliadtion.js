export const validFileExtensions = {
  // image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
  image: ['jpg', 'png', 'jpeg'],
  // file: ['doc', 'docx', 'pdf'],
  file: ['pdf'],
};

export function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}

export function getAllowedExt(type) {
  return validFileExtensions[type].map(e => `.${e}`).toString();
}

export const MAX_FILE_SIZE = 2097152;

export const FILE_MAX_SiZE = 1048576;
