"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";

import { Label } from "@/app/(frontend)/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(frontend)/components/ui/select";

import { Switch } from "@/app/(frontend)/components/ui/switch";

import { useDashboardSettingsStore } from "@/app/(frontend)/store/dashboardSettingsStore";

import { useTheme } from "next-themes";

export default function DashboardSettingsForm() {
  // Theme is managed by next-themes
  const {
    theme,
    setTheme,
  } = useTheme();

  // Other dashboard preferences are managed by Zustand
  const {
    sidebar,
    rememberSidebar,
    accentColor,

    setSidebar,
    setRememberSidebar,
    setAccentColor,
  } = useDashboardSettingsStore();

  return (
    <div className="max-w-3xl space-y-6">
      {/* ================= APPEARANCE ================= */}
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>

          <CardDescription>
            Customize how the admin dashboard looks.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Theme */}
          <div className="space-y-2">
            <Label>Theme</Label>

            <Select
              value={theme}
              onValueChange={setTheme}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="system">
                  System
                </SelectItem>

                <SelectItem value="light">
                  Light
                </SelectItem>

                <SelectItem value="dark">
                  Dark
                </SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-slate-500">
              Choose how the dashboard should appear.
            </p>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <Label>Accent Color</Label>

            <Select
              value={accentColor}
              onValueChange={setAccentColor}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select accent color" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="default">
                  Default
                </SelectItem>

                <SelectItem value="blue">
                  Blue
                </SelectItem>

                <SelectItem value="green">
                  Green
                </SelectItem>

                <SelectItem value="purple">
                  Purple
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ================= SIDEBAR ================= */}
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Sidebar</CardTitle>

          <CardDescription>
            Customize the dashboard sidebar behavior.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Sidebar State */}
          <div className="space-y-2">
            <Label>Sidebar State</Label>

            <Select
              value={sidebar}
              onValueChange={setSidebar}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sidebar state" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="expanded">
                  Expanded
                </SelectItem>

                <SelectItem value="collapsed">
                  Collapsed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Remember Sidebar */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-900">
                Remember sidebar state
              </p>

              <p className="text-sm text-slate-500">
                Keep the sidebar state after refreshing the page.
              </p>
            </div>

            <Switch
              checked={rememberSidebar}
              onCheckedChange={setRememberSidebar}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}