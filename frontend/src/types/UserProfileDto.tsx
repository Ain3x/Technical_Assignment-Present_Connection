import type { ReservationDto } from "./ReservationDto";

export interface UserProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  currentReservations: ReservationDto[];
  pastReservations: ReservationDto[];
}
