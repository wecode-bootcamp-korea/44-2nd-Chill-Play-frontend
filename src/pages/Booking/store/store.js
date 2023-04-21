import { create } from 'zustand';

const initialState = {
  selectedMusical: null,
  selectedTheatre: null,
  selectedDate: new Date(),
  selectedTime: null,
  selectedSeats: [],
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
  reset: () => {
    set(state => ({
      ...state,
      bookingState: initialState,
    }));
  },
}));
