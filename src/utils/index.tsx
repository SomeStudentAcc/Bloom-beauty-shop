import { BrandGroup } from "@/app/brands/BrandsList";

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

export const getCdnUrl = () => CDN_URL;
export const getUrl = (url: string, key: string) => {
  return `${CDN_URL}/${key}/${url}`;
};

export const formatPrice = (number: number): string => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const getLocalizedDate = (
  dateStr: string,
  locale: "ru" | "uz" | "en"
) => {
  const date = new Date(dateStr);
  const day = date.getDate();

  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);

  return { day, month };
};

export const toPlainNumber = (formattedNumber: string) => {
  // Remove all non-digit characters
  const allDigits = formattedNumber.replace(/\D/g, "");

  // If it doesn't start with 998, ensure it does
  if (!allDigits.startsWith("998")) {
    return "998" + allDigits;
  }

  return allDigits;
};

export const getFavorites = (): { id: string }[] => {
  const stored = localStorage.getItem("b_favorites");
  return stored ? JSON.parse(stored) : [];
};

export const customSort = (arr: string[]): string[] => {
  return arr.sort((a: string, b: string): number => {
    const getPriority = (str: string): number => {
      if (/^\d/.test(str)) return 0; // Starts with a number
      if (/^[A-Za-z]/.test(str)) return 1; // Starts with English letter
      if (/^[А-Яа-яЁё]/.test(str)) return 2; // Starts with Russian letter
      return 3; // Anything else
    };

    const priorityA: number = getPriority(a);
    const priorityB: number = getPriority(b);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // If priorities are equal, fallback to localeCompare (with 'ru' locale)
    return a.localeCompare(b, "ru");
  });
};


  export const groupBrandsByFirstLetter = (brands: string[]): BrandGroup[] => {
    const result: BrandGroup[] = [];

    for (const brand of brands) {
      const firstChar = brand[0].toUpperCase();
      const existingGroup = result.find((group) => group.letter === firstChar);

      if (existingGroup) {
        existingGroup.brands.push(brand);
      } else {
        result.push({ letter: firstChar, brands: [brand] });
      }
    }

    return result;
  };
