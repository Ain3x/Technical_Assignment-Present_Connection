import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import DeskCard from "./DeskCard";
import type { DeskDto } from "../types/DeskDto";
import { createReservation } from "../api/reservationApi";

interface DeskGridProps {
  desks: DeskDto[];
}
const handleReserve = (desk: DeskDto) => {
  console.log("Reserving desk:", desk.deskNumber);
};
const DeskGrid = ({ desks }: DeskGridProps) => {
  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        {desks.map((desk) => (
          <Grid key={desk.id}>
            <DeskCard 
            desk={desk} 
            onReserve = {handleReserve}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DeskGrid;
