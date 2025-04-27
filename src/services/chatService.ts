import api from './api';
import { ChatMessageDto } from '../types';

const CHAT_ENDPOINTS = {
  GET_MESSAGES: (senderId: number, recipientId: number) => 
    `/messages/${senderId}/${recipientId}`,
};

export const getChatMessages = async (
  senderId: number, 
  recipientId: number
): Promise<ChatMessageDto[]> => {
  const response = await api.get<ChatMessageDto[]>(
    CHAT_ENDPOINTS.GET_MESSAGES(senderId, recipientId)
  );
  return response.data;
};

export default {
  getChatMessages,
};