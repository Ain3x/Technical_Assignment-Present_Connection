import { useEffect, useState } from "react";
import DeskGrid from "../components/DeskGrid";
import { fetchDesks} from "../api/deskApi";
import { CircularProgress, Box, Alert } from "@mui/material";
import type { DeskDto } from "../types/DeskDto";

const DeskView = () => {
  const [desks, setDesks] = useState<DeskDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDesks = async () => {
      try {
        const data = await fetchDesks("2025-12-22", "2025-12-23",1);
        setDesks(data);
      } catch {
        setError("Failed to load desks");
      } finally {
        setLoading(false);
      }
    };

    loadDesks();
  }, []);

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

  return <DeskGrid desks={desks} />;
};

export default DeskView;
