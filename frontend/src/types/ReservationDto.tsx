export interface ReservationDto {
  id: string;
  deskId: string;
  deskNumber: number;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userFullName: string;
  startDate: string; // ISO 
  endDate: string;   // ISO 
  createdAt: string; // ISO 
}