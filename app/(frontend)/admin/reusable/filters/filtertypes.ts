export type FilterOption = {
  label: string;
  value: string;
};
export type FilterConfig = {
  key: string;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};
export type EntityFiltersProps = {
  filters: FilterConfig[];
  search?: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
  };
};

