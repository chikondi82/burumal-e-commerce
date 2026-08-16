export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  status: 'active' | 'inactive';
}

const STORAGE_KEY = 'burumal_categories';

export const categoryService = {
  getAllCategories: (): Category[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  },

  getCategoryById: (id: number): Category | undefined => {
    const categories = categoryService.getAllCategories();
    return categories.find(c => c.id === id);
  },

  getCategoryBySlug: (slug: string): Category | undefined => {
    const categories = categoryService.getAllCategories();
    return categories.find(c => c.slug === slug);
  },

  addCategory: (category: Omit<Category, 'id' | 'productCount' | 'status'>): Category => {
    const categories = categoryService.getAllCategories();
    const id = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const newCategory: Category = {
      ...category,
      id,
      productCount: 0,
      status: 'active',
    };
    categories.push(newCategory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    return newCategory;
  },

  updateCategory: (id: number, updates: Partial<Category>): Category | null => {
    const categories = categoryService.getAllCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    categories[index] = { ...categories[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    return categories[index];
  },

  deleteCategory: (id: number): boolean => {
    const categories = categoryService.getAllCategories();
    const filtered = categories.filter(c => c.id !== id);
    if (filtered.length === categories.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  initializeMockCategories: () => {
    if (typeof window === 'undefined') return;
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return;

    const mockCategories: Category[] = [
      { id: 1, name: 'Electronics', slug: 'electronics', icon: '📱', productCount: 345, status: 'active' },
      { id: 2, name: 'Fashion', slug: 'fashion', icon: '👗', productCount: 567, status: 'active' },
      { id: 3, name: 'Beauty', slug: 'beauty', icon: '💄', productCount: 189, status: 'active' },
      { id: 4, name: 'Home', slug: 'home', icon: '🏠', productCount: 234, status: 'active' },
      { id: 5, name: 'Baby', slug: 'baby', icon: '👶', productCount: 123, status: 'active' },
      { id: 6, name: 'Gifts', slug: 'gifts', icon: '🎁', productCount: 89, status: 'active' },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockCategories));
  },
};
