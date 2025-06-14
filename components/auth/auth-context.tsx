"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  email: string
  role: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (credentials: { email: string; password: string; role: string }) => void
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const savedUser = localStorage.getItem("guinee-tourisme-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (credentials: { email: string; password: string; role: string }) => {
    const userData = {
      email: credentials.email,
      role: credentials.role,
      name: credentials.role === "admin" ? "Administrateur Principal" : "Utilisateur",
    }
    setUser(userData)
    localStorage.setItem("guinee-tourisme-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("guinee-tourisme-user")
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
