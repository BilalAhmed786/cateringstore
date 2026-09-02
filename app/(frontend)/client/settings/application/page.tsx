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
  const { theme, setTheme } = useTheme();

  const {
   accentColor,
    setAccentColor,
  } = useDashboardSettingsStore();

  return (
    <div className="max-w-3xl space-y-6">
      {/* ================= APPEARANCE ================= */}
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>

          <CardDescription>
            Customize how your dashboard looks.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Theme */}
          <div className="space-y-2">
            <Label>Theme</Label>

            <Select value={theme} onValueChange={setTheme}>
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

            <p className="text-sm text-muted-foreground">
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

    </div>
  );
}