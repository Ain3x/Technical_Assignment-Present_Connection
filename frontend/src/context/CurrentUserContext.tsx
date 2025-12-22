import { createContext, useContext } from "react";

export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
}

const defaultUser: CurrentUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
};
/*
const defaultUser: CurrentUser = {
  id: 2,
  firstName: "Jane",
  lastName: "Smith",
  fullName: "Jane Smith",
};
*/
export const CurrentUserContext = createContext<CurrentUser>(defaultUser);

export const useCurrentUser = () => useContext(CurrentUserContext);