export interface CategoryItem {
  name: string;
  key: string;
  couldEnter: boolean;
  enterItem(): void;
  selectedOptions: string[];
  menuIcon: string;
  isActive: boolean;
}

export interface SideMenuCategory {
  name: string;
  categoryItems: CategoryItem[];
}

export interface SideMenuProps {
  categoryStructure: SideMenuCategory[];
}
