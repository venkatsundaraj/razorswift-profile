export function mapAndJoinCities(cities) {
  const delimiter = ',';
  if (!cities || !Array.isArray(cities) || cities.length === 0) {
    return '';
  }

  let result = cities[0].cityName;
  const length = cities.length;

  for (let i = 1; i < length; i++) {
    result += delimiter + cities[i].cityName;
  }

  return result;
}
