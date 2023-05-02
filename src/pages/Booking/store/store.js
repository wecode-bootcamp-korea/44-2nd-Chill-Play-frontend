import { create } from 'zustand';

const initialState = {
  selectedMusical: null,
  selectedTheatre: null,
  selectedDate: new Date(),
  selectedTime: null,
  selectedSeats: [],
  totalAmount: 0,
};

export const useBookingStore = create(set => ({
  bookingState: initialState,
  setMusical: musical => {
    set(state => ({
      ...state,
      bookingState: {
        ...state.bookingState,
        selectedMusical: musical,
      },
    }));
  },
  setTheatre: theatre => {
    set(state => ({
      ...state,
      bookingState: {
        ...state.bookingState,
        selectedTheatre: theatre,
      },
    }));
  },
  setDate: selectedDate => {
    set(state => ({
      ...state,
      bookingState: {
        ...state.bookingState,
        selectedDate: selectedDate,
      },
    }));
  },
  setTime: selectedTime => {
    set(state => ({
      ...state,
      bookingState: {
        ...state.bookingState,
        selectedTime: selectedTime,
      },
    }));
  },
  setSeats: seatsValues => {
    set(state => ({
      ...state,
      bookingState: {
        ...state.bookingState,
        selectedSeats: seatsValues,
      },
    }));
  },
  setTotalAmount: value => {
    set(state => ({
      ...state,
      bookingState: {
        ...state.bookingState,
        totalAmount: value,
      },
    }));
  },
  reset: () => {
    set(state => ({
      ...state,
      bookingState: initialState,
    }));
  },
}));
