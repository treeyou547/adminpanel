export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  avatar: string;
  lastActive: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'DELIVERED' | 'SHIPPED' | 'PROCESSING' | 'CANCELLED';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: string[];
}
