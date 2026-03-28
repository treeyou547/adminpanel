import * as XLSX from 'xlsx';

const data = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "User" }
];

const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

XLSX.writeFile(workbook, "test_export.csv", { bookType: "csv" });
XLSX.writeFile(workbook, "test_export.xlsx", { bookType: "xlsx" });
console.log("Done");
