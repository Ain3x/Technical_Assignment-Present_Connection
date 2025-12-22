import { useEffect, useState } from "react";
import DeskGrid from "../components/DeskGrid";
import { fetchDesks} from "../api/deskApi";
import { CircularProgress, Alert,TextField, Button, Box } from "@mui/material";
import type { DeskDto } from "../types/DeskDto";
import { createReservation,cancelReservationToday, cancelEntireReservation } from "../api/reservationApi";

const DeskView = () => {
  const [desks, setDesks] = useState<DeskDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(() => {
  const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  });
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return tomorrow.toISOString().split("T")[0];
  });

  const loadDesks = async () => {
        try {
          const data = await fetchDesks(startDate, endDate,1);
          setDesks(data);
        } catch {
          setError("Failed to load desks");
        } finally {
          setLoading(false);
        }
      };
  useEffect(() => {
    loadDesks();
  }, []);
  const handleReserve = async (desk: DeskDto) => {
    console.log("Reserving desk:", desk.deskNumber);
      const userId = 1; 
      const reservation = await createReservation(
          desk.id,
          userId,
          startDate,
          endDate
      );
      console.log("Reservation created:", reservation);
      loadDesks();
      
  };
  const handleCancelReservationToday = async (desk: DeskDto) => {
    const userId = 1;
    const response = await cancelReservationToday(
        desk.reservationId??0,
        userId
    );
    console.log("Reservation cancelled for today:", response);
    loadDesks();
  };
  const handleCancelEntireReservation = async (desk: DeskDto) => {
    const userId = 1;
    const response = await cancelEntireReservation(
        desk.reservationId??0,
        userId
    );
    console.log("Entire reservation cancelled:", response);
    loadDesks();
  }
  if (loading) {
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  const todayStr = new Date().toISOString().split("T")[0];
  return (
    <Box>
      {/* Date Filter */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: todayStr }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: startDate }}
        />
        <Button variant="contained" onClick={loadDesks}>
          Filter
        </Button>
      </Box>

      {/* Desk Grid */}
      <DeskGrid 
      desks={desks} 
      onReserve={handleReserve} 
      onCancelToday = {handleCancelReservationToday}
      onCancelEntire = {handleCancelEntireReservation}
      />
    </Box>
  );
};

export default DeskView;
