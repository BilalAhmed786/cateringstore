export const timezoneOptions = Intl.supportedValuesOf("timeZone").map(
  (timezone) => ({
    label: timezone.replaceAll("_", " "),
    value: timezone,
  })
);