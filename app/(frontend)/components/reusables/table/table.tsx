import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/(frontend)/components/ui/table";
import { MenuItemsTableProps } from "../types/types";

export function DataTable<T>({
  items,
  columns,
}: MenuItemsTableProps<T>) {
 
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.header}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-6">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            items.map((item, i) => (
              <TableRow key={i}>
                {columns.map((col, j) => (
                  <TableCell key={j}>{col.accessor(item)}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
