"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import { Eye, MoreHorizontal, Search, Shield, Trash2, UserCheck, UserX } from "lucide-react"
import { useEffect, useState } from "react"
import { getThemeColors, userRoles } from "./app-colors"
import { UserDetailModal } from "./detail-modals/user-detail-modal"
import { UserPrivilegesModal } from "./detail-modals/user-privileges-modal"
import { useTheme } from "./theme/theme-provider"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 },
  },
}

interface User {
  id: string
  nom: string
  prenom: string
  email: string
  registrationDate: string
  lastConnection: string
  status: "active" | "inactive"
  role: string
}

export function UserManagement() {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showPrivilegesModal, setShowPrivilegesModal] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const usersCollection = collection(db, "users")
      const usersSnapshot = await getDocs(usersCollection)
      const usersList = usersSnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          nom: data.nom || "",
          prenom: data.prenom || "",
          email: data.email || "",
          registrationDate: data.registrationDate || new Date().toISOString(),
          lastConnection: data.lastConnection || new Date().toISOString(),
          status: data.status || "active",
          role: data.role || "user"
        }
      })
      setUsers(usersList)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les utilisateurs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const updateUserRole = (userId: string, newRole: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
    setShowPrivilegesModal(false)
  }

  const getRoleBadgeColor = (role: string) => {
    const roleObj = userRoles.find((r) => r.id === role)
    return roleObj?.color || colors.textSecondary
  }

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  return (
    <motion.div
      className="p-6"
      style={{ backgroundColor: colors.background }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={cardVariants} whileHover={{ scale: 1.01 }}>
        <Card
          className="transition-colors duration-300"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <CardHeader>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <CardTitle style={{ color: colors.textPrimary }}>Gestion des Utilisateurs</CardTitle>
              <CardDescription style={{ color: colors.textSecondary }}>
                Liste des utilisateurs avec leurs rôles et privilèges
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div
              className="flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, email ou rôle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 border transition-all duration-300 focus:scale-105"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    color: colors.textPrimary,
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              className="rounded-md border transition-colors duration-300"
              style={{ borderColor: colors.border }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: colors.border }}>
                    <TableHead style={{ color: colors.textPrimary }}>Nom</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Prénom</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Email</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Rôle</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Date d'inscription</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Dernière connexion</TableHead>
                    <TableHead style={{ color: colors.textPrimary }}>Statut</TableHead>
                    <TableHead className="w-[70px]" style={{ color: colors.textPrimary }}>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: `${colors.surface}50` }}
                        className="transition-colors duration-200"
                        style={{ borderColor: colors.border }}
                      >
                        <TableCell className="font-medium" style={{ color: colors.textPrimary }}>
                          {user.nom}
                        </TableCell>
                        <TableCell style={{ color: colors.textPrimary }}>
                          {user.prenom}
                        </TableCell>
                        <TableCell style={{ color: colors.textSecondary }}>{user.email}</TableCell>
                        <TableCell>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Badge
                              variant="outline"
                              style={{
                                borderColor: getRoleBadgeColor(user.role),
                                color: getRoleBadgeColor(user.role),
                              }}
                            >
                              {userRoles.find((role) => role.id === user.role)?.name || user.role}
                            </Badge>
                          </motion.div>
                        </TableCell>
                        <TableCell style={{ color: colors.textSecondary }}>
                          {new Date(user.registrationDate).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell style={{ color: colors.textSecondary }}>
                          {new Date(user.lastConnection).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Badge
                              variant={user.status === "active" ? "default" : "secondary"}
                              style={{
                                backgroundColor: user.status === "active" ? colors.success : colors.textSecondary,
                                color: "white",
                              }}
                            >
                              {user.status === "active" ? "Actif" : "Inactif"}
                            </Badge>
                          </motion.div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                                <Eye className="mr-2 h-4 w-4" />
                                Voir détails
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedUser(user)
                                  setShowPrivilegesModal(true)
                                }}
                              >
                                <Shield className="mr-2 h-4 w-4" />
                                Gérer privilèges
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                                {user.status === "active" ? (
                                  <>
                                    <UserX className="mr-2 h-4 w-4" />
                                    Désactiver
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Activer
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteUser(user.id)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {selectedUser && !showPrivilegesModal && (
          <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
        {selectedUser && showPrivilegesModal && (
          <UserPrivilegesModal
            user={selectedUser}
            onClose={() => {
              setSelectedUser(null)
              setShowPrivilegesModal(false)
            }}
            onUpdateRole={updateUserRole}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
