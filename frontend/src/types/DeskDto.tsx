import { DeskStatus } from "./index";

export interface DeskDto {
  id: number;
  deskNumber: number;
  status: DeskStatus;

  maintenanceMessage?: string | null;

  reservationId?: number | null;

  reservedByFirstName?: string | null;
  reservedByLastName?: string | null;
  reservedByFullName?: string | null;

  reservationStartDate?: string | null;
  reservationEndDate?: string | null;   

  isReservedByCurrentUser: boolean;
  isAvailableForReservation: boolean;
}
