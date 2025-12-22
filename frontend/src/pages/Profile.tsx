import { useEffect, useState } from "react";
import { fetchUserProfile } from "../api/userApi";
import type { UserProfileDto } from "../types/UserProfileDto";
import { Box, Typography, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from "@mui/material";
import { useCurrentUser } from "../context/CurrentUserContext";

const Profile = () => {
  const { id: currentUserId } = useCurrentUser();
  const [profile, setProfile] = useState<UserProfileDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile(currentUserId);
        setProfile(data);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUserId]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!profile) return null;

  const renderTable = (reservations: typeof profile.currentReservations) => (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Desk</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                None
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.deskNumber}</TableCell>
                <TableCell>{new Date(r.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(r.endDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        {profile.firstName} {profile.lastName}
      </Typography>

      <Typography variant="h6">Current Reservations</Typography>
      {renderTable(profile.currentReservations)}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Past Reservations</Typography>
      {renderTable(profile.pastReservations)}
    </Box>
  );
};

export default Profile;
