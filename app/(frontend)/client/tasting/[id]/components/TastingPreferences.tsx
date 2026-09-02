

interface TastingPreferencesProps {
  preferences: string[];
}

export default function TastingPreferences({
  preferences,
}: TastingPreferencesProps) {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="font-semibold">
          Food Preferences
        </h2>
      </div>

      <div className="p-5">
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
      </div>
    </section>
  );
}