import {
  Card,
  CardContent,
  Typography,
  Button,
  Tooltip,
  Stack,
  Box,
} from "@mui/material";
import type { DeskDto } from "../types/DeskDto";
import { DeskStatusLabel, DeskStatus } from "../types/index";
import { getDeskColors } from "../theme/colors";

interface DeskCardProps {
  desk: DeskDto;
  onReserve?: (desk: DeskDto) => void;

}

const DeskCard = ({ 
    desk,
    onReserve }: DeskCardProps ) => {
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

  return (
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
          {/* Desk Info Section */}
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

          {/* Buttons Section */}
          <Box sx={{ mt: "auto" }}>
            {desk.isReservedByCurrentUser && desk.reservationId ? (
              <Stack direction="row" spacing={0.5} sx={{ width: "100%" }}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.7rem",
                    py: 0.5,
                    px: 1,
                    minWidth: "unset",
                    flex: 1,
                  }}
                >
                  Today
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  sx={{
                    fontSize: "0.7rem",
                    py: 0.5,
                    px: 1,
                    minWidth: "unset",
                    flex: 1,
                  }}
                >
                  All
                </Button>
              </Stack>
            ) : desk.isAvailableForReservation ? (
              <Button
                size="small"
                variant="contained"
                color="success"
                fullWidth
                onClick = {onReserve ? () => onReserve(desk) : undefined}
                sx={{
                  fontSize: "0.75rem",
                  py: 0.5,
                }}
              >
                Reserve
              </Button>
            ) : null}
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default DeskCard;