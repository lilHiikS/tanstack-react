import React, { createContext, useEffect, useState } from "react";

interface UserPreferences {
  theme: "light" | "dark" | "auto";
  itemsPerPage: number;
  favoriteItems: string[];
  sortBy: "name" | "rarity" | "price";
  sortOrder: "asc" | "desc";
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "auto",
  itemsPerPage: 20,
  favoriteItems: [],
  sortBy: "name",
  sortOrder: "asc",
};

const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined);

export { UserPreferencesContext };

export function UserPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] =
    useState<UserPreferences>(DEFAULT_PREFERENCES);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cs-collection-preferences");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch (error) {
        console.error("Failed to parse stored preferences:", error);
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "cs-collection-preferences",
      JSON.stringify(preferences)
    );
  }, [preferences]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  const toggleFavorite = (itemId: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteItems: prev.favoriteItems.includes(itemId)
        ? prev.favoriteItems.filter((id) => id !== itemId)
        : [...prev.favoriteItems, itemId],
    }));
  };

  const isFavorite = (itemId: string) => {
    return preferences.favoriteItems.includes(itemId);
  };

  const value = {
    preferences,
    updatePreferences,
    toggleFavorite,
    isFavorite,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
