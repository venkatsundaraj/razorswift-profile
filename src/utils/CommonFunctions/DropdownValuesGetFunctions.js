export function getDropDownValues(result) {
  return Array.isArray(result)
    ? result.map((res, index) => ({
        title: res?.name,
        year: res?.id,
      }))
    : [];
}
