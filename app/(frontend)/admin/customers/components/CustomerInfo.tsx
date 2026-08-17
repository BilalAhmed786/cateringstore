interface CustomerInfoProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function CustomerInfo({
  icon,
  label,
  value,
}: CustomerInfoProps) {
  return (
    <div className="flex gap-3">
      <div className="text-muted-foreground">
        {icon}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">
          {label}
        </p>

        <p className="font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}