/*
    Joins a list of classes for cleaner multiple class declarations when using CSS modules
    @param  {String[]} classes  The classnames 
    @return {String}            A string containing the combined classnames
*/
export function classes(...classes: string[]) {
  return classes.join(" ");
}

export function toCamelCase(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .reduce(
      (word, camelWord) => word[0].toUpperCase() + word.slice(1) + camelWord
    );
}

export function importAll(r: any) {
  let images: object = {};
  r.keys().map((item: string, index: number) => {
    images[item.replace("./", "") as keyof Object] = r(item);
  });
  return images;
}

export const aosConfig = { offset: 24, duration: 1000, once: true };
