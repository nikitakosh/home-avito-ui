// Authentication types
export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthenticationResponse {
  access_token: string;
  refresh_token: string;
}

// User types
export enum UserRole {
  SELLER = 'SELLER',
  BUYER = 'BUYER'
}

export interface UserInfoDto {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  products: ProductInfoDto[];
  friends: FriendInfoDto[];
}

export interface FriendInfoDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
}

export interface UpdateProfileInfoDto {
  firstname?: string;
  lastname?: string;
  role?: UserRole;
}

// Product types
export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  PROPERTY = 'PROPERTY',
  JOBS = 'JOBS',
  PROPERTIES = 'PROPERTIES',
  VEHICLES = 'VEHICLES'
}

export interface ProductInfoDto {
  id: number;
  title: string;
  price: number;
  location: string;
  imageUrl: string;
}

export interface ProductGetByIdResponseDto {
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  dateCreate: string;
}

export interface ProductSaveRequestDto {
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  location: string;
  imageUrl: string;
  dateCreate?: string;
}

export interface OwnerInfoDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
}

// Chat types
export interface ChatMessageDto {
  id?: number;
  senderId: number;
  recipientId: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: Date;
}