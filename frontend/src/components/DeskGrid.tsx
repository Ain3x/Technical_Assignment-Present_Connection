import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import DeskCard from "./DeskCard";
import type { DeskDto } from "../types/DeskDto";


interface DeskGridProps {
  desks: DeskDto[];
  onReserve: (desk: DeskDto, reserveStart:string,reserverEnd:string) => Promise<void>;
  onCancelToday?: (desk: DeskDto) => Promise<void>;
  onCancelEntire?: (desk: DeskDto) => Promise<void>;
}

const DeskGrid = ({ desks, onReserve, onCancelToday, onCancelEntire }: DeskGridProps) => {
  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        {desks.map((desk) => (
          <Grid key={desk.id}>
            <DeskCard 
            desk={desk} 
            onReserve = {onReserve}
            onCancelToday = {onCancelToday}
            onCancelEntire = {onCancelEntire}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DeskGrid;
