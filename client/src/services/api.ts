import axios from 'axios';
import type {
  IExperience,
  IExperienceDetails,
  IBookingData,
  IBookingConfirmation,
  IPromoValidation,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getExperiences = async (): Promise<IExperience[]> => {
  const response = await apiClient.get('/experiences');
  return response.data;
};

export const getExperienceById = async (id: string): Promise<IExperienceDetails> => {
  const response = await apiClient.get(`/experiences/${id}`);
  return response.data;
};

export const validatePromoCode = async (code: string): Promise<IPromoValidation> => {
  const response = await apiClient.post('/promo/validate', { code });
  return response.data;
};

export const createBooking = async (bookingData: IBookingData): Promise<IBookingConfirmation> => {
  const response = await apiClient.post('/bookings', bookingData);
  return response.data;
};