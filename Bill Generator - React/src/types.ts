export interface MenuItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface AdminAction {
  type: 'ADD_ITEM' | 'UPDATE_ITEM' | 'REMOVE_ITEM' | 'RESTOCK';
  item: MenuItem;
}