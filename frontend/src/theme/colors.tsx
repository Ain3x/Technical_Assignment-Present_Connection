
export const colors = {
  
  desk: {
    open: {
      background: "#e8f5e9",    // Light green
      text: "#2e7d32",          // Dark green
      border: "#4caf50",        // Medium green
    },
    reserved: {
      background: "#ffebee",    // Light red
      text: "#c62828",          // Dark red
      border: "#f44336",        // Medium red
    },
    maintenance: {
      background: "#fff3e0",    // Light orange
      text: "#e65100",          // Dark orange
      border: "#ff9800",        // Medium orange
    },
  },

 
} as const;

export type DeskStatusColors = {
  background: string;
  text: string;
  border: string;
};

// Helper function
export const getDeskColors = (status: "open" | "reserved" | "maintenance"): DeskStatusColors => {
  switch (status) {
    case "open":
      return colors.desk.open;
    case "reserved":
      return colors.desk.reserved;
    case "maintenance":
      return colors.desk.maintenance;
    default:
      return colors.desk.open;
  }
};