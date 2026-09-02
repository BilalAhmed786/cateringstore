import { Card, CardHeader, CardTitle, CardContent } from "@/app/(frontend)/components/ui/card";


interface TastingPreferencesProps {
  preferences: string[];
}

export default function TastingPreferences({
  preferences,
}: TastingPreferencesProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="text-base">
          Food Preferences
        </CardTitle>
      </CardHeader>

      <CardContent>
        {preferences.length ? (
          <div className="flex flex-wrap gap-2">
            {preferences.map((preference) => (
              <span
                key={preference}
                className="rounded-full bg-muted px-3 py-1.5 text-sm"
              >
                {preference}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No food preferences specified.
          </p>
        )}
      </CardContent>
    </Card>
  );
}