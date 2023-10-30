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
