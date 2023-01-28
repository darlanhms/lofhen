export default function getFirstLink(str: string): string | undefined {
  return String(str).match(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g,
  )?.[0];
}

export function onlyNumbers(str: string): string {
  return String(str).replace(/[^\d]/g, '');
}

export function onlyLetters(str: string): string {
  return String(str).replace(/[^\D]/g, '');
}
