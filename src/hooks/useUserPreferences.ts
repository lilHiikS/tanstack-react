import { useContext } from "react";
import { UserPreferencesContext } from "../contexts/UserPreferencesContext";

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider"
    );
  }
  return context;
}
