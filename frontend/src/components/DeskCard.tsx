import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Tooltip,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import type { DeskDto } from "../types/DeskDto";
import { DeskStatusLabel, DeskStatus } from "../types/index";
import { getDeskColors } from "../theme/colors";

interface DeskCardProps {
  desk: DeskDto;
  onReserve?: (desk: DeskDto, startDate: string, endDate: string) => void;
  onCancelToday?: (desk: DeskDto) => void;
  onCancelEntire?: (desk: DeskDto) => void;
}

const DeskCard = ({
  desk,
  onReserve,
  onCancelToday,
  onCancelEntire,
}: DeskCardProps) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [reserveStart, setReserveStart] = useState("");
  const [reserveEnd, setReserveEnd] = useState("");

  const tooltipText =
    desk.status === DeskStatus.Reserved
      ? `Reserved by ${desk.reservedByFullName ?? "Unknown"}`
      : desk.status === DeskStatus.Maintenance
      ? desk.maintenanceMessage ?? "Under maintenance"
      : "Desk is available";

  const statusKey =
    desk.status === DeskStatus.Open
      ? "open"
      : desk.status === DeskStatus.Reserved
      ? "reserved"
      : "maintenance";

  const deskColors = getDeskColors(statusKey);

  const handleReserveClick = () => setPickerOpen(true);
  const handleConfirmReserve = () => {
    if (onReserve) onReserve(desk, reserveStart, reserveEnd);
    setPickerOpen(false);
  };
  const handleStartDateChange = (value: string) => {
    setReserveStart(value);

    if (value > reserveEnd) {
      setReserveEnd(value);
    }
  };

  const handleEndDateChange = (value: string) => {
    if (value < reserveStart) {
      return; 
    }
    setReserveEnd(value);
  };
  const todayStr = new Date().toISOString().split("T")[0];
  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <Card
          sx={{
            width: 150,
            minHeight: 140,
            backgroundColor: deskColors.background,
            boxShadow: 1,
            "&:hover": { boxShadow: 3 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              p: 1.5,
              "&:last-child": { pb: 1.5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
              gap: 1,
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{ color: deskColors.text }}
              >
                Desk {desk.deskNumber}
              </Typography>
              <Typography variant="caption" sx={{ color: deskColors.text }}>
                {DeskStatusLabel[desk.status] ?? desk.status}
              </Typography>
            </Box>

            <Box sx={{ mt: "auto" }}>
              {desk.isReservedByCurrentUser && desk.reservationId ? (
                <Stack direction="row" spacing={0.5} sx={{ width: "100%" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={onCancelToday ? () => onCancelToday(desk) : undefined}
                    sx={{
                      fontSize: "0.7rem",
                      py: 0.5,
                      px: 1,
                      minWidth: "unset",
                      flex: 1,
                    }}
                  >
                    Cancel Today
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={onCancelEntire ? () => onCancelEntire(desk) : undefined}
                    sx={{
                      fontSize: "0.7rem",
                      py: 0.5,
                      px: 1,
                      minWidth: "unset",
                      flex: 1,
                    }}
                  >
                    Cancel All
                  </Button>
                </Stack>
              ) : desk.isAvailableForReservation ? (
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleReserveClick}
                  sx={{ fontSize: "0.75rem", py: 0.5 }}
                >
                  Reserve
                </Button>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Tooltip>

      {/* Date Picker Dialog */}
      <Dialog open={pickerOpen} onClose={() => setPickerOpen(false)}>
        <DialogTitle>Reserve Desk {desk.deskNumber}</DialogTitle>
        <DialogContent sx={{ display: "flex", gap: 2, mt: 2}}>
          <TextField
            label="Start Date"
            type="date"
            value={reserveStart}
            onChange={(e) => handleStartDateChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: todayStr }}
            sx={{ minWidth: 180, mt: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={reserveEnd}
            onChange={(e) => handleEndDateChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: reserveStart }}
            sx={{ minWidth: 180 , mt: 2}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPickerOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmReserve}
            disabled={!reserveStart || !reserveEnd}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeskCard;
