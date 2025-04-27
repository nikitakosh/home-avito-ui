import api from './api';
import { 
  ProductInfoDto, 
  ProductGetByIdResponseDto, 
  ProductSaveRequestDto, 
  ProductCategory,
  OwnerInfoDto
} from '../types';

const PRODUCT_ENDPOINTS = {
  GET_ALL: '/api/v1/products',
  GET_ONE: (id: number) => `/api/v1/products/${id}`,
  GET_BY_CATEGORY: '/api/v1/products/category',
  CREATE: '/api/v1/products',
  GET_OWNER: (id: number) => `/api/v1/products/owner/${id}`,
};

export const getAllProducts = async (): Promise<ProductInfoDto[]> => {
  const response = await api.get<ProductInfoDto[]>(PRODUCT_ENDPOINTS.GET_ALL);
  return response.data;
};

export const getProductById = async (id: number): Promise<ProductGetByIdResponseDto> => {
  const response = await api.get<ProductGetByIdResponseDto>(PRODUCT_ENDPOINTS.GET_ONE(id));
  return response.data;
};

export const getProductsByCategory = async (category: ProductCategory): Promise<ProductInfoDto[]> => {
  const response = await api.get<ProductInfoDto[]>(PRODUCT_ENDPOINTS.GET_BY_CATEGORY, {
    params: { category },
  });
  return response.data;
};

export const createProduct = async (data: ProductSaveRequestDto): Promise<void> => {
  await api.post(PRODUCT_ENDPOINTS.CREATE, data);
};

export const getProductOwner = async (id: number): Promise<OwnerInfoDto> => {
  const response = await api.get<OwnerInfoDto>(PRODUCT_ENDPOINTS.GET_OWNER(id));
  return response.data;
};

export default {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  getProductOwner,
};