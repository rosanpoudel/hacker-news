export function truncate(str, num) {
  if (str !== undefined && str !== null) {
    return str.length > num ? `${str.substring(0, num - 3)}...` : str;
  }
  return str;
}
