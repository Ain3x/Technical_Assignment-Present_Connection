export interface ReservationDto {
  id: string;
  deskId: string;
  deskNumber: number;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userFullName: string;
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  createdAt: string; // ISO date string
}