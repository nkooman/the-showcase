export const isHexCode = (str: string): boolean => {
  // Where I found the regex: https://stackoverflow.com/a/53181462/8949076
  const regex = /(?:#)[0-9a-f]{8}|(?:#)[0-9a-f]{6}|(?:#)[0-9a-f]{4}|(?:#)[0-9a-f]{3}/gi;
  const match = str.match(regex);

  if (!match) return false;

  return match.length > 0;
};
