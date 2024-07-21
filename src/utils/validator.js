export function isValidEnglishLettersOnly(input) {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(input);
}
export const englishLettersOnlyPattern = "^[a-zA-Z]+$";
