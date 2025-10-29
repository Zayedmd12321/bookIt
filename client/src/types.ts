export interface IExperience {
  _id: string;
  title: string;
  location: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  basePrice: number;
  taxPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISlot {
  _id: string;
  experienceId: string;
  date: string;
  time: string;
  totalCapacity: number;
  bookedCount: number;
  slotsLeft: number;
  isSoldOut: boolean;
}

export interface IExperienceDetails {
  experience: IExperience;
  slots: ISlot[];
}

export interface IBookingConfirmation {
  message: string;
  bookingDetails: {
    _id: string;
    experienceId: string;
    slotId: string;
    userName: string;
    userEmail: string;
    quantity: number;
    totalPrice: number;
    promoCode?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IPromoValidation {
  isValid: boolean;
  message?: string;
  promoDetails?: {
    code: string;
    discountType: 'percentage' | 'fixed';
    amount: number;
  };
}

export interface IBookingData {
  experienceId: string;
  slotId: string;
  userName: string;
  userEmail: string;
  quantity: number;
  promoCode?: string;
}