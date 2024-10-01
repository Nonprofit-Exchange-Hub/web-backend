import { ReactNode, createContext, useEffect, useRef } from 'react';
import { Category } from '../types';
import { APP_API_BASE_URL } from '../configs';

export interface Settings {
  categories: () => Category[];
  setCategories: (categories: Category[]) => void;
  orgCategories: () => Category[];
}

interface Props {
  children: ReactNode;
}

export const SettingsContext = createContext<Settings>({
  categories: () => [],
  setCategories: () => {},
  orgCategories: () => [],
});

/**
 * SettingsProvider will load the categories from the API and store them in memory.
 *
 * To re-load the categories, call fetchCategories().
 * @param children
 * @returns
 */
export const SettingsProvider = ({ children }: Props) => {
  const _categoriesRef = useRef<Category[]>([]);

  useEffect(() => {
    const _fetchCategories = async () => {
      await fetchCategories();
    };

    _fetchCategories().catch(() => console.log('Error initializing SettingsProvider'));
  }, []);

  const setCategories = (_categories: Category[]) => {
    _categoriesRef.current = [..._categories];
  };

  const categories = () => [..._categoriesRef.current];

  const orgCategories = () => {
    return [..._categoriesRef.current.filter((category) => category.applies_to_organizations)];
  };
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${APP_API_BASE_URL}/categories`);
      if (res.ok) {
        _categoriesRef.current = [...((await res.json()) satisfies Category[])];
      }
    } catch (error) {
      console.log('Error fetching Categorie', error);
    }
  };

  return (
    <SettingsContext.Provider value={{ categories, setCategories, orgCategories }}>
      {children}
    </SettingsContext.Provider>
  );
};
