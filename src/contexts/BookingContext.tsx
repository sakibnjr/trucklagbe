import { createContext, useContext, useState, ReactNode, useCallback } from "react";

type VehicleType = 'truck' | 'pickup' | 'pickup-van' | 'private-car' | 'hiace' | '';

interface BookingContextType {
  selectedVehicle: VehicleType;
  setSelectedVehicle: (vehicle: VehicleType) => void;
  scrollToBooking: () => void;
  bookingFormRef: React.RefObject<HTMLDivElement> | null;
  setBookingFormRef: (ref: React.RefObject<HTMLDivElement>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('');
  const [bookingFormRef, setBookingFormRef] = useState<React.RefObject<HTMLDivElement> | null>(null);

  const scrollToBooking = useCallback(() => {
    if (bookingFormRef?.current) {
      bookingFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a highlight effect
      bookingFormRef.current.classList.add('ring-2', 'ring-secondary', 'ring-offset-2');
      setTimeout(() => {
        bookingFormRef.current?.classList.remove('ring-2', 'ring-secondary', 'ring-offset-2');
      }, 2000);
    } else {
      // Fallback: scroll to top where the form is
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [bookingFormRef]);

  return (
    <BookingContext.Provider value={{ 
      selectedVehicle, 
      setSelectedVehicle, 
      scrollToBooking, 
      bookingFormRef, 
      setBookingFormRef 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
