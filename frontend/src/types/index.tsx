export type DeskStatus = 0 | 1 | 2;

export const DeskStatus = {
  Open: 0,
  Reserved: 1,
  Maintenance: 2,
} as const;

export const DeskStatusLabel: Record<DeskStatus, string> = {
  [DeskStatus.Open]: "Open",
  [DeskStatus.Reserved]: "Reserved",
  [DeskStatus.Maintenance]: "Maintenance",
};