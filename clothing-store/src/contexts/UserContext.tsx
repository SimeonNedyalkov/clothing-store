import React, { createContext, useContext, useState } from "react";

// Define the user and auth state shapes
interface User {
  email: string;
  _id: string;
  accessToken: string;
}

interface AuthState {
  user: User | null;
}

interface AuthContextType {
  userId: string;
  email: string;
  accessToken: string;
  isAuthenticated: boolean;
  changeAuthState: (state: AuthState) => void;
  logout: () => void;
}

// Define the default context value
const defaultContextValue: AuthContextType = {
  userId: "",
  email: "",
  accessToken: "",
  isAuthenticated: false,
  changeAuthState: () => null,
  logout: () => null,
};

export const UserContext = createContext<AuthContextType>(defaultContextValue);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
  });

  const changeAuthState = (state: AuthState) => {
    setAuthState(state);
  };

  const logout = () => {
    setAuthState({ user: null });
  };

  const contextData: AuthContextType = {
    userId: authState.user?._id || "",
    email: authState.user?.email || "",
    accessToken: authState.user?.accessToken || "",
    isAuthenticated: !!authState.user,
    changeAuthState,
    logout,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}

// Custom hook for using the context
export function useAuthContext(): AuthContextType {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
}
