"use client"

import type React from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate authentication - in real app, this would be an API call
    if (credentials.username === "admin" && credentials.password === "marvel2024") {
      localStorage.setItem("adminToken", "authenticated")
      localStorage.setItem("adminRole", "super-admin")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid credentials. Access denied.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-amber-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10" />

      <Card className="w-full max-w-md relative z-10 bg-black/80 border-red-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-red-500 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">S.H.I.E.L.D. Access</CardTitle>
          <CardDescription className="text-gray-300">Authorized Personnel Only</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Agent ID
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your agent ID"
                value={credentials.username}
                onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Security Code
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter security code"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="border-red-500/50 bg-red-950/50">
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={loading}>
              {loading ? "Authenticating..." : "Access Control Panel"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Demo Credentials:</p>
            <p>Username: admin | Password: marvel2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
