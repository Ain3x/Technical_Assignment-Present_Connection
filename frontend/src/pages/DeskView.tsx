import { useEffect, useState } from "react";
import DeskGrid from "../components/DeskGrid";
import { fetchDesks } from "../api/deskApi";
import { CircularProgress, Alert, TextField, Button, Box } from "@mui/material";
import type { DeskDto } from "../types/DeskDto";
import { createReservation, cancelReservationToday, cancelEntireReservation } from "../api/reservationApi";
import { useCurrentUser } from "../context/CurrentUserContext";

const DeskView = () => {
  const [desks, setDesks] = useState<DeskDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; 
  });
  const [endDate, setEndDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return tomorrow.toISOString().split("T")[0];
  });
  const { id: currentUserId } = useCurrentUser();
  const todayStr = new Date(
  Date.now() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .split("T")[0];

  const loadDesks = async () => {
    setLoading(true);
    try {
      const data = await fetchDesks(startDate, endDate, currentUserId);
      setDesks(data);
      setError(null); // clear previous errors
    } catch {
      setError("Failed to load desks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDesks();
  }, []);

  const handleReserve = async (desk: DeskDto, reserveStart: string, reserveEnd: string) => {
    try {
      await createReservation(desk.id, currentUserId, reserveStart, reserveEnd);
      loadDesks();
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to create reservation");
    }
  };

  const handleCancelReservationToday = async (desk: DeskDto) => {
    try {
      await cancelReservationToday(desk.reservationId ?? 0, currentUserId);
      loadDesks();
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to cancel today's reservation");
    }
  };

  const handleCancelEntireReservation = async (desk: DeskDto) => {
    try {
      await cancelEntireReservation(desk.reservationId ?? 0, currentUserId);
      loadDesks();
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message ?? "Failed to cancel entire reservation");
    }
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    if (value > endDate) setEndDate(value);
  };

  const handleEndDateChange = (value: string) => {
    if (value < startDate) return;
    setEndDate(value);
  };

  return (
    <Box p={2}>
      {error && (
        <Box mb={2}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Box>
      )}

      {/* Date Filter */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: todayStr }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: startDate }}
        />
        <Button variant="contained" onClick={loadDesks}>
          Filter
        </Button>
      </Box>

      {loading ? (
        <Box mt={4} textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <DeskGrid
          desks={desks}
          onReserve={handleReserve}
          onCancelToday={handleCancelReservationToday}
          onCancelEntire={handleCancelEntireReservation}
        />
      )}
    </Box>
  );
};

export default DeskView;
