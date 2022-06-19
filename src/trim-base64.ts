// remove base64 and just get data @return string
export const base64Replacer = (base: string) => {
  if (base) {
    const data = base.split(",");

    if (data.length >= 1) {
      return data[1];
    }
  }
  return "";
};
