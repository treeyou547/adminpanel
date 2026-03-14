import type { User, Product, Order, Role } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@nexgen.com', role: 'Admin', status: 'ACTIVE', avatar: 'https://i.pravatar.cc/150?u=1', lastActive: '2 hrs ago' },
  { id: '2', name: 'Jane Smith', email: 'jane@nexgen.com', role: 'Editor', status: 'ACTIVE', avatar: 'https://i.pravatar.cc/150?u=2', lastActive: '5 mins ago' },
  { id: '3', name: 'Bob Johnson', email: 'bob@nexgen.com', role: 'Viewer', status: 'INACTIVE', avatar: 'https://i.pravatar.cc/150?u=3', lastActive: '1 day ago' },
  { id: '4', name: 'Alice Williams', email: 'alice@nexgen.com', role: 'Editor', status: 'ACTIVE', avatar: 'https://i.pravatar.cc/150?u=4', lastActive: '1 hr ago' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@nexgen.com', role: 'Viewer', status: 'INACTIVE', avatar: 'https://i.pravatar.cc/150?u=5', lastActive: '2 days ago' },
  { id: '6', name: 'Diana Prince', email: 'diana@nexgen.com', role: 'Admin', status: 'ACTIVE', avatar: 'https://i.pravatar.cc/150?u=6', lastActive: 'Now' },
  { id: '7', name: 'Clark Kent', email: 'clark@nexgen.com', role: 'Editor', status: 'PENDING', avatar: 'https://i.pravatar.cc/150?u=7', lastActive: '1 week ago' },
  { id: '8', name: 'Bruce Wayne', email: 'bruce@nexgen.com', role: 'Viewer', status: 'ACTIVE', avatar: 'https://i.pravatar.cc/150?u=8', lastActive: '30 mins ago' },
];

export const mockProducts: Product[] = [
  { id: 'PROD-1', name: 'Premium UI Kit v2', category: 'Software', price: 99.00, stock: 450, status: 'IN_STOCK' },
  { id: 'PROD-2', name: 'Admin Dashboard Pro', category: 'Software', price: 149.00, stock: 120, status: 'IN_STOCK' },
  { id: 'PROD-3', name: 'E-commerce React Template', category: 'Templates', price: 79.00, stock: 12, status: 'LOW_STOCK' },
  { id: 'PROD-4', name: 'Marketing Landing Page', category: 'Templates', price: 49.00, stock: 0, status: 'OUT_OF_STOCK' },
  { id: 'PROD-5', name: 'Enterprise CRM Starter', category: 'Software', price: 299.00, stock: 50, status: 'IN_STOCK' },
];

export const mockOrders: Order[] = [
  { id: 'ORD-001', customer: 'Acme Corp', date: '2024-03-27', total: 1250.00, status: 'DELIVERED' },
  { id: 'ORD-002', customer: 'Global Tech', date: '2024-03-26', total: 450.00, status: 'PROCESSING' },
  { id: 'ORD-003', customer: 'Startup Inc', date: '2024-03-25', total: 99.00, status: 'SHIPPED' },
  { id: 'ORD-004', customer: 'Dev Studios', date: '2024-03-25', total: 298.00, status: 'CANCELLED' },
  { id: 'ORD-005', customer: 'Design Agency', date: '2024-03-24', total: 890.00, status: 'DELIVERED' },
];

export const mockRoles: Role[] = [
  { id: 'R1', name: 'Super Admin', description: 'Full access to all features and settings', usersCount: 2, permissions: ['read:all', 'write:all', 'delete:all', 'manage:users'] },
  { id: 'R2', name: 'Admin', description: 'Access to most features, cannot delete other admins', usersCount: 5, permissions: ['read:all', 'write:all', 'manage:users'] },
  { id: 'R3', name: 'Editor', description: 'Can create and edit content, manage products', usersCount: 12, permissions: ['read:all', 'write:content', 'manage:products'] },
  { id: 'R4', name: 'Viewer', description: 'Read-only access to dashboards and reports', usersCount: 45, permissions: ['read:dashboards', 'read:reports'] },
];

export const mockChartData = [
  { date: 'Jan', revenue: 2890, orders: 2338 },
  { date: 'Feb', revenue: 2756, orders: 2100 },
  { date: 'Mar', revenue: 3322, orders: 2800 },
  { date: 'Apr', revenue: 3478, orders: 2908 },
  { date: 'May', revenue: 3110, orders: 2500 },
  { date: 'Jun', revenue: 4021, orders: 3200 },
];
