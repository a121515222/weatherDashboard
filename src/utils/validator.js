export function isValidEnglishLettersOnly(input) {
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿĀ-žƀ-ɏ]+(\s[A-Za-zÀ-ÖØ-öø-ÿĀ-žƀ-ɏ]+)*\s*$/;
  return regex.test(input);
}
export const englishLettersOnlyPattern =
  "^[A-Za-zÀ-ÖØ-öø-ÿĀ-žƀ-ɏ]+(\\s[A-Za-zÀ-ÖØ-öø-ÿĀ-žƀ-ɏ]+)*\\s*$";
