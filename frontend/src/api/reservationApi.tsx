import { apiClient } from "./apiClient";
import type { ReservationDto } from "../types/ReservationDto";

export const createReservation = async (
    deskId: number,
    userId: number,
    startDate: string,
    endDate: string  
): Promise<ReservationDto> => {
  const response = await apiClient.post<ReservationDto>("/reservations", {
    deskId,
    userId, 
    startDate, 
    endDate,
  });

  return response.data;
};
export const cancelReservationToday = async (
    reservationId: number,
    userId?: number
): Promise<void> => {
  await apiClient.delete(`/reservations/${reservationId}/today`,{
    params: { userId },
  });
};
export const cancelEntireReservation = async (
    reservationId: number,
    userId?: number
): Promise<void> => {
  await apiClient.delete(`/reservations/${reservationId}`,{
    params: { userId },
  });
};

