// "use client"

// import { useState } from "react"
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   flexRender,
// } from "@tanstack/react-table"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuCheckboxItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu"

// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

// const data = [
//   { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@example.com" },
//   { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@example.com" },
//   { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@example.com" },
//   { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@example.com" },
//   { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com" },
// ]

// const columns = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//       >
//         Email
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"))
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)

//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

// export function DataTableDemo() {
//   const [sorting, setSorting] = useState([])
//   const [columnFilters, setColumnFilters] = useState([])
//   const [columnVisibility, setColumnVisibility] = useState({})
//   const [rowSelection, setRowSelection] = useState({})

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   })

//   return (
//     <div className="w-full">
//       {/* Filters & Column Selector */}
//       <div className="flex items-center py-4 gap-4 flex-wrap">
//         <Input
//           placeholder="Filter emails..."
//           value={table.getColumn("email")?.getFilterValue() ?? ""}
//           onChange={(e) => table.getColumn("email")?.setFilterValue(e.target.value)}
//           className="max-w-sm"
//         />

//         <select
//           className="border px-3 py-2 rounded text-sm"
//           value={table.getColumn("status")?.getFilterValue() ?? ""}
//           onChange={(e) => table.getColumn("status")?.setFilterValue(e.target.value)}
//         >
//           <option value="">All Status</option>
//           <option value="success">Success</option>
//           <option value="processing">Processing</option>
//           <option value="failed">Failed</option>
//         </select>

//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={() => {
//             table.resetColumnFilters()
//             table.resetSorting()
//           }}
//         >
//           Clear Filters
//         </Button>

//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columns <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((col) => col.getCanHide())
//               .map((col) => (
//                 <DropdownMenuCheckboxItem
//                   key={col.id}
//                   className="capitalize"
//                   checked={col.getIsVisible()}
//                   onCheckedChange={(value) => col.toggleVisibility(!!value)}
//                 >
//                   {col.id}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       {/* Table */}
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No results.
//                   <div className="mt-2">
//                     <Button size="sm" onClick={() => table.resetColumnFilters()}>
//                       Clear Filters
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex items-center justify-between py-4 flex-wrap gap-4">
//         <div className="text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="text-sm">Rows per page:</span>
//           <select
//             className="border px-2 py-1 rounded text-sm"
//             value={table.getState().pagination.pageSize}
//             onChange={(e) => {
//               table.setPageSize(Number(e.target.value))
//             }}
//           >
//             {[5, 10, 20, 50].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="flex items-center space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.setPageIndex(0)}
//             disabled={!table.getCanPreviousPage()}
//           >
//             First
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Prev
//           </Button>
//           <span className="text-sm px-2">
//             Page {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </span>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//             disabled={!table.getCanNextPage()}
//           >
//             Last
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { ThemeToggle } from "./themetoggle"




const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <div className="capitalize">{row.getValue("priority")}</div>,
  },
  {
    accessorKey: "estimatedHours",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Est. Hours
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString(),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id)}>
              Copy task ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View task</DropdownMenuItem>
            <DropdownMenuItem>Edit task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


export function DataTableDemo() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})


  const data=[
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 29,
      "createdAt": "2024-09-03T13:33:41.132462"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2024-09-28T13:33:41.132502"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-07-01T13:33:41.132511"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 22,
      "createdAt": "2024-10-20T13:33:41.132517"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 40,
      "createdAt": "2024-07-07T13:33:41.132527"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-05-05T13:33:41.132533"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2024-09-14T13:33:41.132538"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 35,
      "createdAt": "2024-05-27T13:33:41.132548"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 18,
      "createdAt": "2024-09-07T13:33:41.132558"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2025-02-18T13:33:41.132567"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2024-08-28T13:33:41.132575"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 27,
      "createdAt": "2025-01-13T13:33:41.132582"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2025-01-12T13:33:41.132604"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-11-23T13:33:41.132609"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-12-28T13:33:41.132615"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 15,
      "createdAt": "2024-10-03T13:33:41.132620"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 40,
      "createdAt": "2024-11-22T13:33:41.132624"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 37,
      "createdAt": "2025-02-10T13:33:41.132630"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-09-26T13:33:41.132635"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-09-09T13:33:41.132639"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-08-15T13:33:41.132644"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2024-04-30T13:33:41.132649"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2025-01-02T13:33:41.132654"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 1,
      "createdAt": "2025-03-06T13:33:41.132669"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2024-11-23T13:33:41.132676"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2025-04-15T13:33:41.132681"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2024-05-14T13:33:41.132686"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2025-02-20T13:33:41.132692"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2024-06-15T13:33:41.132697"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2025-02-14T13:33:41.132702"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 39,
      "createdAt": "2024-11-05T13:33:41.132707"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-05-23T13:33:41.132711"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2025-01-06T13:33:41.132716"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-10-11T13:33:41.132721"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-12-01T13:33:41.132735"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2024-06-27T13:33:41.132744"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-08-13T13:33:41.132753"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 26,
      "createdAt": "2025-02-08T13:33:41.132761"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2025-02-06T13:33:41.132768"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 11,
      "createdAt": "2025-03-30T13:33:41.132773"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2025-02-26T13:33:41.132778"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-05-12T13:33:41.132788"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-05-27T13:33:41.132794"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 3,
      "createdAt": "2024-11-17T13:33:41.132799"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-05-24T13:33:41.132803"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 3,
      "createdAt": "2024-04-21T13:33:41.132809"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 5,
      "createdAt": "2024-11-30T13:33:41.132813"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-08-14T13:33:41.132818"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2025-03-04T13:33:41.132824"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-06-08T13:33:41.132829"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2025-02-23T13:33:41.132833"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2025-03-13T13:33:41.132932"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2024-06-23T13:33:41.132939"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2024-11-20T13:33:41.132948"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 40,
      "createdAt": "2024-09-23T13:33:41.132967"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 9,
      "createdAt": "2024-05-23T13:33:41.132974"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 13,
      "createdAt": "2024-10-04T13:33:41.132978"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 12,
      "createdAt": "2024-06-12T13:33:41.132983"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 25,
      "createdAt": "2024-11-22T13:33:41.132988"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2024-08-25T13:33:41.132994"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 36,
      "createdAt": "2024-09-16T13:33:41.133005"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2024-06-12T13:33:41.133013"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2024-08-24T13:33:41.133020"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2024-12-07T13:33:41.133028"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2025-03-10T13:33:41.133036"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2025-01-10T13:33:41.133041"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2025-02-12T13:33:41.133046"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 15,
      "createdAt": "2024-04-20T13:33:41.133051"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2024-07-15T13:33:41.133056"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2024-04-21T13:33:41.133061"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 35,
      "createdAt": "2025-01-06T13:33:41.133066"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2024-09-22T13:33:41.133071"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2025-04-14T13:33:41.133076"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2024-10-31T13:33:41.133081"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 9,
      "createdAt": "2024-06-18T13:33:41.133085"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2024-07-27T13:33:41.133090"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2024-10-18T13:33:41.133097"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-08-15T13:33:41.133105"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-08-24T13:33:41.133114"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2025-02-03T13:33:41.133121"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2025-01-28T13:33:41.133129"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 7,
      "createdAt": "2024-12-15T13:33:41.133135"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2024-12-19T13:33:41.133139"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2024-07-13T13:33:41.133144"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 39,
      "createdAt": "2024-12-20T13:33:41.133149"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-06-18T13:33:41.133154"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2025-04-15T13:33:41.133159"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-09-10T13:33:41.133163"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2024-07-19T13:33:41.133168"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2024-06-16T13:33:41.133173"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 3,
      "createdAt": "2024-12-01T13:33:41.133178"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2025-04-08T13:33:41.133183"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2024-08-21T13:33:41.133187"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2024-10-30T13:33:41.133192"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 25,
      "createdAt": "2024-09-01T13:33:41.133197"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2025-03-08T13:33:41.133202"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-10-16T13:33:41.133207"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2025-03-11T13:33:41.133212"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-07-19T13:33:41.133217"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 29,
      "createdAt": "2025-03-24T13:33:41.133221"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-05-21T13:33:41.133227"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2024-08-05T13:33:41.133231"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-06-17T13:33:41.133236"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 29,
      "createdAt": "2024-08-05T13:33:41.133241"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2025-01-03T13:33:41.133246"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 28,
      "createdAt": "2025-03-07T13:33:41.133256"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 4,
      "createdAt": "2024-09-25T13:33:41.133261"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 4,
      "createdAt": "2024-12-13T13:33:41.133265"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 25,
      "createdAt": "2024-06-30T13:33:41.133270"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-07-14T13:33:41.133275"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2024-04-19T13:33:41.133280"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2025-01-31T13:33:41.133285"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-06-13T13:33:41.133289"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 1,
      "createdAt": "2024-05-19T13:33:41.133294"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 14,
      "createdAt": "2024-07-20T13:33:41.133299"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2025-03-15T13:33:41.133305"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 4,
      "createdAt": "2025-01-08T13:33:41.133313"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2024-11-02T13:33:41.133320"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2024-12-14T13:33:41.133328"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-12-23T13:33:41.133335"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2024-10-14T13:33:41.133340"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-07-28T13:33:41.133345"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 28,
      "createdAt": "2025-03-17T13:33:41.133351"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 13,
      "createdAt": "2025-02-02T13:33:41.133355"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2024-11-09T13:33:41.133360"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2024-04-15T13:33:41.133364"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2025-03-24T13:33:41.133369"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 11,
      "createdAt": "2024-06-23T13:33:41.133374"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 27,
      "createdAt": "2024-07-07T13:33:41.133380"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 13,
      "createdAt": "2025-03-17T13:33:41.133389"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-09-27T13:33:41.133396"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 4,
      "createdAt": "2024-04-28T13:33:41.133404"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2024-06-24T13:33:41.133412"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2025-01-11T13:33:41.133419"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-10-02T13:33:41.133424"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 14,
      "createdAt": "2025-04-01T13:33:41.133429"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2024-09-15T13:33:41.133433"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 17,
      "createdAt": "2024-04-15T13:33:41.133438"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 29,
      "createdAt": "2024-06-14T13:33:41.133443"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-10-09T13:33:41.133447"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 8,
      "createdAt": "2024-04-26T13:33:41.133452"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-09-05T13:33:41.133457"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 3,
      "createdAt": "2025-02-03T13:33:41.133461"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-11-23T13:33:41.133466"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 8,
      "createdAt": "2024-12-22T13:33:41.133471"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-12-19T13:33:41.133476"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2025-01-11T13:33:41.133480"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2024-10-03T13:33:41.133485"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2024-12-10T13:33:41.133490"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 15,
      "createdAt": "2024-10-03T13:33:41.133495"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 30,
      "createdAt": "2024-05-31T13:33:41.133499"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-09-13T13:33:41.133504"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2024-11-25T13:33:41.133509"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2024-12-10T13:33:41.133514"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-12-22T13:33:41.133518"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2024-10-09T13:33:41.133524"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 11,
      "createdAt": "2024-05-23T13:33:41.133534"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 31,
      "createdAt": "2024-06-23T13:33:41.133541"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2024-06-08T13:33:41.133549"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2024-09-07T13:33:41.133557"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 4,
      "createdAt": "2024-06-04T13:33:41.133564"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 12,
      "createdAt": "2024-11-18T13:33:41.133569"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2025-01-06T13:33:41.133574"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 26,
      "createdAt": "2024-06-24T13:33:41.133579"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 15,
      "createdAt": "2025-03-26T13:33:41.133585"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2025-02-06T13:33:41.133589"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 39,
      "createdAt": "2024-08-07T13:33:41.133594"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 28,
      "createdAt": "2024-09-02T13:33:41.133598"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 37,
      "createdAt": "2025-03-02T13:33:41.133604"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-05-31T13:33:41.133609"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 40,
      "createdAt": "2024-08-21T13:33:41.133614"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 13,
      "createdAt": "2024-10-31T13:33:41.133618"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2025-03-26T13:33:41.133625"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2024-12-14T13:33:41.133634"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-08-12T13:33:41.133642"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2024-09-03T13:33:41.133650"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 13,
      "createdAt": "2024-12-22T13:33:41.133658"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2025-03-20T13:33:41.133664"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 12,
      "createdAt": "2025-02-04T13:33:41.133668"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2024-06-22T13:33:41.133673"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 35,
      "createdAt": "2025-01-02T13:33:41.133678"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2024-09-09T13:33:41.133683"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-04-21T13:33:41.133688"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 27,
      "createdAt": "2024-08-02T13:33:41.133693"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2025-03-20T13:33:41.133698"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2025-04-07T13:33:41.133703"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-11-05T13:33:41.133708"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-06-23T13:33:41.133713"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2025-04-06T13:33:41.133718"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2024-09-04T13:33:41.133723"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2025-04-11T13:33:41.133728"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 37,
      "createdAt": "2024-05-17T13:33:41.133733"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-11-09T13:33:41.133738"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-10-06T13:33:41.133744"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 12,
      "createdAt": "2024-06-25T13:33:41.133748"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2025-01-28T13:33:41.133753"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 20,
      "createdAt": "2024-10-25T13:33:41.133758"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 13,
      "createdAt": "2025-03-09T13:33:41.133763"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2025-03-15T13:33:41.133767"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 23,
      "createdAt": "2024-05-17T13:33:41.133772"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2024-10-14T13:33:41.133776"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2024-11-22T13:33:41.133781"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 29,
      "createdAt": "2024-06-23T13:33:41.133786"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 23,
      "createdAt": "2025-02-16T13:33:41.133791"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 20,
      "createdAt": "2024-10-22T13:33:41.133796"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2025-03-21T13:33:41.133800"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 32,
      "createdAt": "2024-10-14T13:33:41.133805"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 18,
      "createdAt": "2024-05-02T13:33:41.133813"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2024-11-06T13:33:41.133821"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 22,
      "createdAt": "2024-06-29T13:33:41.133828"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-04-18T13:33:41.133837"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-10-22T13:33:41.133844"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-12-27T13:33:41.133848"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 32,
      "createdAt": "2024-06-19T13:33:41.133853"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 29,
      "createdAt": "2024-06-24T13:33:41.133858"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2025-02-08T13:33:41.133863"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 20,
      "createdAt": "2024-07-20T13:33:41.133868"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 20,
      "createdAt": "2024-08-23T13:33:41.133872"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 18,
      "createdAt": "2025-02-03T13:33:41.133877"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-12-13T13:33:41.133882"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2024-06-28T13:33:41.133886"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2024-12-08T13:33:41.133891"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 40,
      "createdAt": "2025-03-05T13:33:41.133896"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2024-08-30T13:33:41.133901"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2024-07-03T13:33:41.133906"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2024-08-31T13:33:41.133911"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-11-07T13:33:41.133915"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-06-16T13:33:41.133920"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2025-04-12T13:33:41.133926"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 28,
      "createdAt": "2024-09-30T13:33:41.133931"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2024-08-15T13:33:41.133936"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2024-10-03T13:33:41.133940"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2024-06-07T13:33:41.133945"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 15,
      "createdAt": "2024-07-03T13:33:41.133950"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2025-03-06T13:33:41.133955"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2024-08-24T13:33:41.133962"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 40,
      "createdAt": "2024-11-20T13:33:41.133969"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 13,
      "createdAt": "2025-01-27T13:33:41.133977"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2025-04-05T13:33:41.133984"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-04-23T13:33:41.133991"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 22,
      "createdAt": "2024-08-08T13:33:41.133996"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2024-10-30T13:33:41.134001"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-10-21T13:33:41.134005"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2024-09-11T13:33:41.134010"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2024-04-29T13:33:41.134015"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-09-17T13:33:41.134023"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-07-30T13:33:41.134031"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 22,
      "createdAt": "2024-12-04T13:33:41.134039"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 4,
      "createdAt": "2024-06-28T13:33:41.134045"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 39,
      "createdAt": "2024-04-26T13:33:41.134050"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2024-10-11T13:33:41.134055"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2024-06-19T13:33:41.134060"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2025-03-10T13:33:41.134064"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-08-24T13:33:41.134069"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 3,
      "createdAt": "2025-01-16T13:33:41.134074"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-11-28T13:33:41.134080"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-12-31T13:33:41.134088"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 27,
      "createdAt": "2024-08-14T13:33:41.134096"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 10,
      "createdAt": "2025-02-18T13:33:41.134104"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 32,
      "createdAt": "2025-04-11T13:33:41.134112"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-06-19T13:33:41.134117"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2024-12-17T13:33:41.134122"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 10,
      "createdAt": "2024-11-19T13:33:41.134127"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2024-05-10T13:33:41.134131"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2024-05-01T13:33:41.134136"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 15,
      "createdAt": "2024-09-12T13:33:41.134141"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2025-02-20T13:33:41.134146"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2024-08-03T13:33:41.134150"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2025-03-05T13:33:41.134155"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 35,
      "createdAt": "2025-02-18T13:33:41.134160"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 37,
      "createdAt": "2024-08-05T13:33:41.134165"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2025-03-08T13:33:41.134172"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-08-21T13:33:41.134180"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-08-25T13:33:41.134187"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 39,
      "createdAt": "2024-10-31T13:33:41.134197"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 13,
      "createdAt": "2024-05-24T13:33:41.134205"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 11,
      "createdAt": "2025-04-12T13:33:41.134212"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 32,
      "createdAt": "2024-10-06T13:33:41.134217"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 11,
      "createdAt": "2024-12-08T13:33:41.134221"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2025-01-18T13:33:41.134226"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2024-12-20T13:33:41.134230"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2025-01-23T13:33:41.134235"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-06-20T13:33:41.134239"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2024-11-21T13:33:41.134244"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-07-17T13:33:41.134249"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-10-26T13:33:41.134253"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-08-21T13:33:41.134258"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2024-10-03T13:33:41.134265"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 1,
      "createdAt": "2024-07-06T13:33:41.134273"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-06-22T13:33:41.134281"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-10-30T13:33:41.134286"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 20,
      "createdAt": "2024-10-15T13:33:41.134291"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 18,
      "createdAt": "2025-02-10T13:33:41.134474"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2024-10-04T13:33:41.134486"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2025-01-19T13:33:41.134495"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 4,
      "createdAt": "2025-02-28T13:33:41.134501"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2025-02-24T13:33:41.134506"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 1,
      "createdAt": "2024-05-04T13:33:41.134524"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 28,
      "createdAt": "2024-09-21T13:33:41.134529"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2025-03-10T13:33:41.134533"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-10-26T13:33:41.134538"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 12,
      "createdAt": "2024-06-18T13:33:41.134543"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 11,
      "createdAt": "2025-03-09T13:33:41.134548"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 11,
      "createdAt": "2025-03-25T13:33:41.134553"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-08-06T13:33:41.134557"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2024-10-05T13:33:41.134563"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2024-12-28T13:33:41.134568"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 35,
      "createdAt": "2024-06-18T13:33:41.134573"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 22,
      "createdAt": "2024-05-24T13:33:41.134578"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-08-04T13:33:41.134584"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-09-11T13:33:41.134589"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2024-07-26T13:33:41.134594"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2025-03-20T13:33:41.134602"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2025-03-26T13:33:41.134609"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 4,
      "createdAt": "2024-07-21T13:33:41.134617"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2024-12-09T13:33:41.134625"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2025-03-22T13:33:41.134639"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 8,
      "createdAt": "2025-04-09T13:33:41.134647"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2025-01-21T13:33:41.134652"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2024-06-29T13:33:41.134657"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 35,
      "createdAt": "2024-04-28T13:33:41.134662"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2024-11-24T13:33:41.134668"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-05-19T13:33:41.134672"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 33,
      "createdAt": "2025-01-04T13:33:41.134677"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2025-02-23T13:33:41.134682"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 24,
      "createdAt": "2025-01-21T13:33:41.134687"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2024-07-15T13:33:41.134691"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-08-14T13:33:41.134696"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2024-08-02T13:33:41.134702"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 22,
      "createdAt": "2024-05-09T13:33:41.134710"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 11,
      "createdAt": "2024-06-11T13:33:41.134718"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2024-11-28T13:33:41.134725"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2024-09-09T13:33:41.134733"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2025-01-01T13:33:41.134740"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 30,
      "createdAt": "2024-07-26T13:33:41.134749"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 5,
      "createdAt": "2024-07-18T13:33:41.134754"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 39,
      "createdAt": "2025-02-03T13:33:41.134759"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 30,
      "createdAt": "2025-03-15T13:33:41.134764"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2024-10-27T13:33:41.134768"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 3,
      "createdAt": "2024-08-31T13:33:41.134773"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2025-04-06T13:33:41.134778"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2024-10-04T13:33:41.134782"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 22,
      "createdAt": "2024-05-06T13:33:41.134787"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 3,
      "createdAt": "2024-05-22T13:33:41.134792"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-10-20T13:33:41.134797"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 27,
      "createdAt": "2024-09-27T13:33:41.134802"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 11,
      "createdAt": "2024-04-21T13:33:41.134806"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 20,
      "createdAt": "2024-12-09T13:33:41.134811"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2024-08-25T13:33:41.134816"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2025-01-09T13:33:41.134821"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 28,
      "createdAt": "2024-11-17T13:33:41.134827"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2025-04-05T13:33:41.134831"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 29,
      "createdAt": "2024-06-04T13:33:41.134839"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-05-13T13:33:41.134845"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2024-07-24T13:33:41.134851"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2024-05-24T13:33:41.134858"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 35,
      "createdAt": "2024-08-31T13:33:41.134866"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 23,
      "createdAt": "2024-12-29T13:33:41.134874"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2025-02-25T13:33:41.134882"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-07-25T13:33:41.134889"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 18,
      "createdAt": "2025-01-10T13:33:41.134898"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2024-04-15T13:33:41.134904"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2024-11-23T13:33:41.134909"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-06-19T13:33:41.134914"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 3,
      "createdAt": "2024-10-31T13:33:41.134918"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-06-25T13:33:41.134923"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2024-06-18T13:33:41.134928"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 7,
      "createdAt": "2024-11-19T13:33:41.134934"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2024-08-17T13:33:41.134938"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 37,
      "createdAt": "2025-01-12T13:33:41.134943"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 10,
      "createdAt": "2024-12-18T13:33:41.134952"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2024-07-01T13:33:41.134957"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 39,
      "createdAt": "2024-12-10T13:33:41.134962"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 15,
      "createdAt": "2024-07-25T13:33:41.134967"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 15,
      "createdAt": "2024-06-24T13:33:41.134972"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2024-12-16T13:33:41.134977"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2024-12-23T13:33:41.134982"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 40,
      "createdAt": "2024-09-23T13:33:41.134986"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2025-03-05T13:33:41.134991"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 4,
      "createdAt": "2024-11-03T13:33:41.134996"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 3,
      "createdAt": "2025-01-10T13:33:41.135000"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 26,
      "createdAt": "2024-05-30T13:33:41.135005"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2024-06-20T13:33:41.135010"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 4,
      "createdAt": "2024-09-11T13:33:41.135014"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 12,
      "createdAt": "2024-06-21T13:33:41.135019"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2024-07-05T13:33:41.135024"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2024-08-14T13:33:41.135029"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2024-12-29T13:33:41.135033"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 12,
      "createdAt": "2024-10-02T13:33:41.135038"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 39,
      "createdAt": "2024-12-05T13:33:41.135046"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-06-10T13:33:41.135052"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2025-04-15T13:33:41.135056"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2024-08-22T13:33:41.135061"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 29,
      "createdAt": "2024-12-08T13:33:41.135066"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2025-02-03T13:33:41.135070"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 12,
      "createdAt": "2024-12-23T13:33:41.135075"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2025-01-17T13:33:41.135080"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-09-20T13:33:41.135084"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2024-06-15T13:33:41.135091"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 3,
      "createdAt": "2024-08-14T13:33:41.135099"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 39,
      "createdAt": "2024-05-22T13:33:41.135106"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-09-27T13:33:41.135117"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 39,
      "createdAt": "2025-02-06T13:33:41.135126"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 35,
      "createdAt": "2024-09-29T13:33:41.135131"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2025-01-13T13:33:41.135136"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2024-06-01T13:33:41.135140"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 13,
      "createdAt": "2024-09-26T13:33:41.135145"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-05-08T13:33:41.135155"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-12-10T13:33:41.135163"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 4,
      "createdAt": "2024-06-27T13:33:41.135179"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2024-08-20T13:33:41.135187"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2025-03-13T13:33:41.135195"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-10-07T13:33:41.135199"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-09-07T13:33:41.135204"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2025-03-18T13:33:41.135218"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2025-03-31T13:33:41.135223"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2025-03-22T13:33:41.135228"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 26,
      "createdAt": "2025-02-03T13:33:41.135232"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-11-14T13:33:41.135237"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2024-07-13T13:33:41.135242"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-08-29T13:33:41.135247"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 30,
      "createdAt": "2025-03-01T13:33:41.135254"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2024-09-26T13:33:41.135263"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2025-02-28T13:33:41.135270"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 26,
      "createdAt": "2024-10-29T13:33:41.135278"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 13,
      "createdAt": "2024-09-13T13:33:41.135292"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2024-08-08T13:33:41.135297"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 22,
      "createdAt": "2024-11-09T13:33:41.135302"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-07-06T13:33:41.135307"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 8,
      "createdAt": "2024-12-04T13:33:41.135311"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2024-07-19T13:33:41.135316"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2025-03-18T13:33:41.135320"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2024-07-01T13:33:41.135325"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2024-10-03T13:33:41.135329"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2024-08-23T13:33:41.135334"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 29,
      "createdAt": "2024-12-01T13:33:41.135338"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 25,
      "createdAt": "2025-03-19T13:33:41.135343"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-09-15T13:33:41.135348"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 37,
      "createdAt": "2024-07-01T13:33:41.135354"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 13,
      "createdAt": "2024-10-27T13:33:41.135359"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2025-02-03T13:33:41.135363"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-11-26T13:33:41.135368"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-12-30T13:33:41.135373"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2024-07-14T13:33:41.135378"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-11-22T13:33:41.135389"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-09-17T13:33:41.135394"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 7,
      "createdAt": "2025-02-17T13:33:41.135399"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2025-03-12T13:33:41.135403"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-05-13T13:33:41.135408"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2025-01-06T13:33:41.135413"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 29,
      "createdAt": "2024-10-25T13:33:41.135418"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-12-08T13:33:41.135423"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 15,
      "createdAt": "2024-08-17T13:33:41.135427"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 39,
      "createdAt": "2024-11-14T13:33:41.135432"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 23,
      "createdAt": "2024-08-15T13:33:41.135437"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-06-17T13:33:41.135441"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 22,
      "createdAt": "2024-05-12T13:33:41.135446"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-08-22T13:33:41.135457"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2024-12-01T13:33:41.135462"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2024-11-29T13:33:41.135467"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2024-04-23T13:33:41.135471"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2024-10-12T13:33:41.135476"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2025-02-04T13:33:41.135484"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2025-04-11T13:33:41.135490"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2025-03-18T13:33:41.135494"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 40,
      "createdAt": "2025-01-22T13:33:41.135502"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 27,
      "createdAt": "2024-06-17T13:33:41.135507"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-05-17T13:33:41.135512"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 37,
      "createdAt": "2024-06-15T13:33:41.135517"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 24,
      "createdAt": "2024-05-22T13:33:41.135521"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2024-04-16T13:33:41.135526"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 27,
      "createdAt": "2024-08-20T13:33:41.135531"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 29,
      "createdAt": "2025-01-12T13:33:41.135536"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 22,
      "createdAt": "2024-07-28T13:33:41.135544"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2025-03-29T13:33:41.135552"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2025-03-21T13:33:41.135559"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2025-03-10T13:33:41.135567"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2025-03-16T13:33:41.135574"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 3,
      "createdAt": "2024-08-18T13:33:41.135582"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-07-20T13:33:41.135589"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2025-02-13T13:33:41.135604"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2024-07-21T13:33:41.135613"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2024-06-01T13:33:41.135621"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2024-10-15T13:33:41.135629"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2025-01-10T13:33:41.135635"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-10-29T13:33:41.135640"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-09-25T13:33:41.135644"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 36,
      "createdAt": "2025-01-08T13:33:41.135649"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2024-10-03T13:33:41.135654"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2025-04-11T13:33:41.135658"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2025-03-11T13:33:41.135663"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-12-13T13:33:41.135667"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-06-02T13:33:41.135672"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 4,
      "createdAt": "2025-03-23T13:33:41.135677"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 8,
      "createdAt": "2024-07-02T13:33:41.135682"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 26,
      "createdAt": "2025-01-19T13:33:41.135687"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2024-12-03T13:33:41.135695"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2024-11-13T13:33:41.135704"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 22,
      "createdAt": "2024-04-19T13:33:41.135717"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2024-08-09T13:33:41.135725"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-09-04T13:33:41.135730"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 13,
      "createdAt": "2024-06-07T13:33:41.135735"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-05-07T13:33:41.135740"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 4,
      "createdAt": "2024-04-24T13:33:41.135745"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2024-05-05T13:33:41.135750"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-10-22T13:33:41.135755"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-12-15T13:33:41.135759"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2024-09-03T13:33:41.135764"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 29,
      "createdAt": "2024-12-10T13:33:41.135768"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-06-25T13:33:41.135774"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 8,
      "createdAt": "2024-12-14T13:33:41.135780"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-07-09T13:33:41.135787"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2024-07-31T13:33:41.135795"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-09-18T13:33:41.135803"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-05-06T13:33:41.135811"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2025-02-16T13:33:41.135817"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 28,
      "createdAt": "2024-06-08T13:33:41.135826"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 11,
      "createdAt": "2024-08-08T13:33:41.135834"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-05-27T13:33:41.135839"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 17,
      "createdAt": "2024-07-30T13:33:41.135844"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-08-23T13:33:41.135849"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2025-02-28T13:33:41.135855"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2024-08-11T13:33:41.135860"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2025-03-01T13:33:41.135864"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2024-05-11T13:33:41.135869"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 26,
      "createdAt": "2024-08-02T13:33:41.135873"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 18,
      "createdAt": "2024-12-10T13:33:41.135878"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2024-09-13T13:33:41.135883"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 32,
      "createdAt": "2024-10-11T13:33:41.135888"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 10,
      "createdAt": "2024-06-13T13:33:41.135892"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 39,
      "createdAt": "2024-07-11T13:33:41.135897"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-07-02T13:33:41.135902"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-07-02T13:33:41.135907"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2025-02-17T13:33:41.135911"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2024-07-05T13:33:41.135916"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-05-09T13:33:41.135924"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2025-02-18T13:33:41.135929"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 33,
      "createdAt": "2025-03-13T13:33:41.135936"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 13,
      "createdAt": "2024-05-05T13:33:41.135944"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-08-29T13:33:41.135952"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-07-16T13:33:41.135960"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2025-04-01T13:33:41.135968"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2024-08-06T13:33:41.135975"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 28,
      "createdAt": "2024-05-07T13:33:41.135981"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2025-03-18T13:33:41.135986"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2025-01-11T13:33:41.135990"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2024-09-10T13:33:41.135995"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 24,
      "createdAt": "2024-05-25T13:33:41.136000"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2025-01-26T13:33:41.136004"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2024-04-30T13:33:41.136009"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-11-22T13:33:41.136014"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2025-01-29T13:33:41.136019"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2024-06-24T13:33:41.136024"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-05-14T13:33:41.136033"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2025-01-08T13:33:41.136038"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-07-11T13:33:41.136042"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-08-11T13:33:41.136047"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-10-06T13:33:41.136052"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 39,
      "createdAt": "2025-01-02T13:33:41.136056"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2024-10-04T13:33:41.136061"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2024-09-08T13:33:41.136066"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 37,
      "createdAt": "2024-07-24T13:33:41.136070"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 31,
      "createdAt": "2025-03-05T13:33:41.136075"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 27,
      "createdAt": "2024-09-27T13:33:41.136080"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 4,
      "createdAt": "2024-06-18T13:33:41.136084"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2025-03-06T13:33:41.136089"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2024-08-13T13:33:41.136094"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 28,
      "createdAt": "2025-03-28T13:33:41.136102"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-12-02T13:33:41.136107"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2024-11-30T13:33:41.136112"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 15,
      "createdAt": "2024-10-13T13:33:41.136118"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-08-13T13:33:41.136122"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2024-12-20T13:33:41.136131"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 29,
      "createdAt": "2024-12-17T13:33:41.136135"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2024-10-16T13:33:41.136140"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2025-01-30T13:33:41.136145"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-09-14T13:33:41.136150"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 37,
      "createdAt": "2024-12-30T13:33:41.136155"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-07-02T13:33:41.136159"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2024-08-15T13:33:41.136164"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 28,
      "createdAt": "2024-09-13T13:33:41.136169"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 15,
      "createdAt": "2024-11-04T13:33:41.136173"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 25,
      "createdAt": "2025-03-27T13:33:41.136178"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-05-01T13:33:41.136183"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2024-08-21T13:33:41.136189"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 37,
      "createdAt": "2025-02-18T13:33:41.136193"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 28,
      "createdAt": "2024-09-30T13:33:41.136198"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2024-10-27T13:33:41.136203"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2024-07-19T13:33:41.136207"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2025-04-07T13:33:41.136212"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-11-16T13:33:41.136220"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 23,
      "createdAt": "2024-06-12T13:33:41.136224"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2024-11-14T13:33:41.136229"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 24,
      "createdAt": "2024-12-09T13:33:41.136236"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 38,
      "createdAt": "2025-02-02T13:33:41.136244"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2025-01-09T13:33:41.136252"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2024-12-20T13:33:41.136259"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 13,
      "createdAt": "2025-02-20T13:33:41.136268"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 12,
      "createdAt": "2025-03-01T13:33:41.136273"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2024-10-26T13:33:41.136278"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-09-08T13:33:41.136282"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 28,
      "createdAt": "2024-08-02T13:33:41.136287"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-11-22T13:33:41.136293"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2025-01-06T13:33:41.136298"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2024-10-16T13:33:41.136303"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 17,
      "createdAt": "2025-03-08T13:33:41.136307"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 37,
      "createdAt": "2024-06-28T13:33:41.136314"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 12,
      "createdAt": "2024-04-25T13:33:41.136318"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 28,
      "createdAt": "2024-08-20T13:33:41.136331"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2024-09-28T13:33:41.136339"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 26,
      "createdAt": "2024-09-09T13:33:41.136347"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2024-08-30T13:33:41.136355"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 10,
      "createdAt": "2024-06-03T13:33:41.136362"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 32,
      "createdAt": "2025-03-26T13:33:41.136368"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 27,
      "createdAt": "2024-12-22T13:33:41.136373"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 15,
      "createdAt": "2025-03-21T13:33:41.136377"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-09-25T13:33:41.136382"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 8,
      "createdAt": "2024-10-21T13:33:41.136386"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2024-11-11T13:33:41.136396"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2025-02-18T13:33:41.136400"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 37,
      "createdAt": "2024-08-12T13:33:41.136405"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 37,
      "createdAt": "2024-12-01T13:33:41.136410"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 9,
      "createdAt": "2025-03-27T13:33:41.136415"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2025-02-25T13:33:41.136420"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2025-01-30T13:33:41.136425"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 40,
      "createdAt": "2025-02-14T13:33:41.136429"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2024-09-21T13:33:41.136437"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 20,
      "createdAt": "2024-12-31T13:33:41.136442"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-09-24T13:33:41.136447"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2024-12-03T13:33:41.136452"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 35,
      "createdAt": "2024-07-08T13:33:41.136457"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2025-03-04T13:33:41.136461"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-04-15T13:33:41.136466"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2024-12-19T13:33:41.136471"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2025-02-01T13:33:41.136475"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 13,
      "createdAt": "2024-08-06T13:33:41.136480"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-10-23T13:33:41.136485"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2024-10-26T13:33:41.136489"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2024-08-23T13:33:41.136494"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 25,
      "createdAt": "2024-11-11T13:33:41.136499"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2025-01-25T13:33:41.136503"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2024-11-28T13:33:41.136508"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-11-04T13:33:41.136513"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 38,
      "createdAt": "2024-04-15T13:33:41.136517"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2024-04-17T13:33:41.136522"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 37,
      "createdAt": "2025-01-01T13:33:41.136531"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-08-28T13:33:41.136536"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-07-21T13:33:41.136541"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2025-04-14T13:33:41.136545"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2024-09-19T13:33:41.136550"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-06-29T13:33:41.136555"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 17,
      "createdAt": "2024-06-18T13:33:41.136574"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-11-19T13:33:41.136584"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 26,
      "createdAt": "2025-03-25T13:33:41.136591"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 27,
      "createdAt": "2024-07-04T13:33:41.136599"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2025-04-07T13:33:41.136604"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 23,
      "createdAt": "2024-04-22T13:33:41.136609"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 39,
      "createdAt": "2024-05-18T13:33:41.136614"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-10-11T13:33:41.136618"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2025-01-06T13:33:41.136623"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 30,
      "createdAt": "2024-09-04T13:33:41.136627"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 4,
      "createdAt": "2024-11-20T13:33:41.136632"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2025-02-17T13:33:41.136637"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2025-01-28T13:33:41.136648"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2025-03-14T13:33:41.136652"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 20,
      "createdAt": "2025-01-15T13:33:41.136657"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 4,
      "createdAt": "2024-11-26T13:33:41.136662"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 23,
      "createdAt": "2024-08-29T13:33:41.136667"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2024-04-16T13:33:41.136672"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-08-04T13:33:41.136676"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-11-24T13:33:41.136686"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 35,
      "createdAt": "2025-02-04T13:33:41.136691"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 28,
      "createdAt": "2024-06-04T13:33:41.136695"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2025-01-29T13:33:41.136701"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2024-07-17T13:33:41.136706"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2025-01-09T13:33:41.136710"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-12-20T13:33:41.136715"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2025-02-21T13:33:41.136720"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 11,
      "createdAt": "2024-09-27T13:33:41.136724"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-07-02T13:33:41.136729"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2025-03-01T13:33:41.136734"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 40,
      "createdAt": "2024-12-26T13:33:41.136742"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 10,
      "createdAt": "2024-06-21T13:33:41.136746"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-05-18T13:33:41.136752"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 35,
      "createdAt": "2024-05-08T13:33:41.136757"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2024-05-14T13:33:41.136762"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 22,
      "createdAt": "2024-08-09T13:33:41.136768"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2024-09-28T13:33:41.136776"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2024-10-10T13:33:41.136784"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 3,
      "createdAt": "2025-01-21T13:33:41.136792"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2025-04-09T13:33:41.136801"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 33,
      "createdAt": "2025-01-08T13:33:41.136807"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 20,
      "createdAt": "2024-10-17T13:33:41.136811"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2024-09-26T13:33:41.136816"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 15,
      "createdAt": "2024-10-26T13:33:41.136820"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-09-24T13:33:41.136825"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-08-24T13:33:41.136829"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 4,
      "createdAt": "2025-04-03T13:33:41.136834"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 8,
      "createdAt": "2025-01-17T13:33:41.136854"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-11-19T13:33:41.136862"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 12,
      "createdAt": "2024-12-10T13:33:41.136876"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 40,
      "createdAt": "2024-12-25T13:33:41.136885"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 1,
      "createdAt": "2025-02-07T13:33:41.136893"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 11,
      "createdAt": "2024-06-07T13:33:41.136903"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 23,
      "createdAt": "2025-03-13T13:33:41.136911"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2024-05-19T13:33:41.136916"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 28,
      "createdAt": "2025-01-25T13:33:41.136922"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-09-07T13:33:41.136930"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2024-05-22T13:33:41.136938"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2025-04-08T13:33:41.136946"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2024-12-01T13:33:41.136951"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2024-10-07T13:33:41.136956"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 29,
      "createdAt": "2024-12-17T13:33:41.136960"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 15,
      "createdAt": "2024-11-09T13:33:41.136965"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 4,
      "createdAt": "2025-01-26T13:33:41.136969"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 14,
      "createdAt": "2024-11-27T13:33:41.136974"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2025-03-20T13:33:41.136978"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 3,
      "createdAt": "2024-08-07T13:33:41.136983"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 31,
      "createdAt": "2024-11-18T13:33:41.136993"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2024-11-28T13:33:41.136998"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2025-01-24T13:33:41.137002"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2024-07-27T13:33:41.137010"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2025-02-04T13:33:41.137018"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2025-03-27T13:33:41.137027"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-10-31T13:33:41.137035"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-09-25T13:33:41.137043"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 32,
      "createdAt": "2024-09-23T13:33:41.137051"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2024-06-07T13:33:41.137057"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2024-09-18T13:33:41.137062"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 28,
      "createdAt": "2024-06-24T13:33:41.137066"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-04-29T13:33:41.137071"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 22,
      "createdAt": "2024-11-17T13:33:41.137076"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-07-09T13:33:41.137080"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-07-18T13:33:41.137085"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2025-01-11T13:33:41.137091"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 27,
      "createdAt": "2024-06-28T13:33:41.137095"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2025-02-25T13:33:41.137104"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 24,
      "createdAt": "2024-10-27T13:33:41.137109"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-11-11T13:33:41.137114"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2024-06-14T13:33:41.137119"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2024-06-13T13:33:41.137123"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 39,
      "createdAt": "2024-07-05T13:33:41.137129"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 8,
      "createdAt": "2024-09-10T13:33:41.137134"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2025-04-14T13:33:41.137139"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2025-03-02T13:33:41.137143"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2025-04-06T13:33:41.137148"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 22,
      "createdAt": "2024-07-07T13:33:41.137152"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2024-05-17T13:33:41.137157"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2024-10-09T13:33:41.137162"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2024-08-23T13:33:41.137167"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-06-11T13:33:41.137171"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-09-07T13:33:41.137176"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 8,
      "createdAt": "2024-10-09T13:33:41.137181"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 22,
      "createdAt": "2024-12-14T13:33:41.137186"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2025-03-03T13:33:41.137194"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2024-11-03T13:33:41.137199"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 3,
      "createdAt": "2024-08-04T13:33:41.137204"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 11,
      "createdAt": "2024-09-04T13:33:41.137209"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2024-05-17T13:33:41.137213"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2025-04-11T13:33:41.137218"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2025-04-14T13:33:41.137223"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-06-16T13:33:41.137230"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2025-02-15T13:33:41.137235"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 29,
      "createdAt": "2024-12-17T13:33:41.137240"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2025-04-02T13:33:41.137245"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-12-29T13:33:41.137249"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 13,
      "createdAt": "2024-09-12T13:33:41.137254"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 37,
      "createdAt": "2025-03-05T13:33:41.137258"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-04-20T13:33:41.137263"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 20,
      "createdAt": "2025-03-24T13:33:41.137268"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 38,
      "createdAt": "2025-01-20T13:33:41.137272"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 3,
      "createdAt": "2024-10-24T13:33:41.137277"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 10,
      "createdAt": "2024-10-01T13:33:41.137285"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-08-08T13:33:41.137294"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 29,
      "createdAt": "2024-10-02T13:33:41.137299"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-08-30T13:33:41.137304"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2025-04-14T13:33:41.137309"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 29,
      "createdAt": "2024-06-17T13:33:41.137316"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-07-22T13:33:41.137325"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 40,
      "createdAt": "2024-11-05T13:33:41.137333"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 3,
      "createdAt": "2024-08-19T13:33:41.137341"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 30,
      "createdAt": "2025-03-22T13:33:41.137348"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2025-02-16T13:33:41.137353"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2025-02-25T13:33:41.137358"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 35,
      "createdAt": "2025-01-21T13:33:41.137362"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 3,
      "createdAt": "2024-06-03T13:33:41.137367"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 10,
      "createdAt": "2024-08-05T13:33:41.137372"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-08-27T13:33:41.137377"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 27,
      "createdAt": "2024-08-19T13:33:41.137382"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2025-03-21T13:33:41.137386"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 20,
      "createdAt": "2024-04-30T13:33:41.137391"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 40,
      "createdAt": "2024-12-08T13:33:41.137400"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-10-04T13:33:41.137406"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 12,
      "createdAt": "2024-09-08T13:33:41.137425"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2024-07-24T13:33:41.137432"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2025-02-12T13:33:41.137440"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2024-04-28T13:33:41.137447"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-08-28T13:33:41.137451"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2025-01-07T13:33:41.137458"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-04-27T13:33:41.137462"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 29,
      "createdAt": "2024-06-14T13:33:41.137467"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2024-09-18T13:33:41.137472"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2024-08-30T13:33:41.137476"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 26,
      "createdAt": "2024-07-25T13:33:41.137481"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2024-08-28T13:33:41.137486"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-07-31T13:33:41.137490"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2024-12-13T13:33:41.137495"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 39,
      "createdAt": "2024-11-16T13:33:41.137500"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2025-02-02T13:33:41.137505"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 8,
      "createdAt": "2024-11-19T13:33:41.137513"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-05-31T13:33:41.137519"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 33,
      "createdAt": "2024-12-14T13:33:41.137523"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 1,
      "createdAt": "2024-05-20T13:33:41.137528"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2024-09-20T13:33:41.137532"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2024-04-19T13:33:41.137537"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2024-09-15T13:33:41.137542"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-10-14T13:33:41.137546"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2024-05-20T13:33:41.137551"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 24,
      "createdAt": "2025-02-17T13:33:41.137555"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 4,
      "createdAt": "2024-06-22T13:33:41.137561"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-09-27T13:33:41.137566"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-08-04T13:33:41.137570"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 11,
      "createdAt": "2024-05-23T13:33:41.137577"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 3,
      "createdAt": "2025-02-01T13:33:41.137585"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 26,
      "createdAt": "2024-11-10T13:33:41.137590"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2024-05-04T13:33:41.137595"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-11-06T13:33:41.137599"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2024-11-09T13:33:41.137604"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 40,
      "createdAt": "2024-05-12T13:33:41.137612"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2024-06-24T13:33:41.137617"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 2,
      "createdAt": "2025-02-10T13:33:41.137622"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 35,
      "createdAt": "2024-12-08T13:33:41.137627"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2024-04-16T13:33:41.137631"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 35,
      "createdAt": "2024-08-16T13:33:41.137636"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 28,
      "createdAt": "2024-06-23T13:33:41.137641"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-05-09T13:33:41.137645"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 39,
      "createdAt": "2025-04-14T13:33:41.137650"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2025-04-13T13:33:41.137654"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 6,
      "createdAt": "2024-06-25T13:33:41.137659"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 14,
      "createdAt": "2025-01-15T13:33:41.137664"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 19,
      "createdAt": "2024-07-23T13:33:41.137668"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-04-27T13:33:41.137673"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 24,
      "createdAt": "2025-04-14T13:33:41.137678"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 15,
      "createdAt": "2024-08-15T13:33:41.137682"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 1,
      "createdAt": "2024-08-19T13:33:41.137687"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2025-01-04T13:33:41.137692"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 36,
      "createdAt": "2024-11-17T13:33:41.137963"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 33,
      "createdAt": "2024-08-14T13:33:41.137988"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2024-12-31T13:33:41.137998"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-08-04T13:33:41.138006"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2024-09-24T13:33:41.138014"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 1,
      "createdAt": "2024-11-22T13:33:41.138023"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2024-05-18T13:33:41.138032"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2024-07-30T13:33:41.138041"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 18,
      "createdAt": "2025-04-03T13:33:41.138049"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 36,
      "createdAt": "2024-10-12T13:33:41.138057"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 22,
      "createdAt": "2024-04-29T13:33:41.138066"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 8,
      "createdAt": "2024-06-15T13:33:41.138092"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 8,
      "createdAt": "2024-06-11T13:33:41.138101"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2024-06-05T13:33:41.138109"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2024-06-27T13:33:41.138119"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 23,
      "createdAt": "2025-03-03T13:33:41.138272"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 10,
      "createdAt": "2025-01-24T13:33:41.138291"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 21,
      "createdAt": "2024-12-11T13:33:41.138297"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-12-06T13:33:41.138308"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 13,
      "createdAt": "2024-12-12T13:33:41.138313"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2024-09-28T13:33:41.138318"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 14,
      "createdAt": "2024-11-26T13:33:41.138323"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2025-03-28T13:33:41.138328"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 15,
      "createdAt": "2024-07-21T13:33:41.138332"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-12-12T13:33:41.138338"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 9,
      "createdAt": "2024-05-27T13:33:41.138343"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-06-28T13:33:41.138348"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2025-04-03T13:33:41.138352"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 26,
      "createdAt": "2024-09-04T13:33:41.138360"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2024-12-27T13:33:41.138366"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2025-02-01T13:33:41.138370"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 16,
      "createdAt": "2024-06-13T13:33:41.138376"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-11-15T13:33:41.138381"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-11-08T13:33:41.138391"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2024-07-03T13:33:41.138399"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 25,
      "createdAt": "2024-05-27T13:33:41.138407"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 22,
      "createdAt": "2025-02-08T13:33:41.138423"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2025-01-06T13:33:41.138431"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2025-03-17T13:33:41.138436"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2024-09-23T13:33:41.138441"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2024-08-09T13:33:41.138446"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2025-03-01T13:33:41.138450"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-09-30T13:33:41.138455"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2024-08-29T13:33:41.138460"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 35,
      "createdAt": "2024-06-02T13:33:41.138465"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 19,
      "createdAt": "2024-12-30T13:33:41.138469"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 31,
      "createdAt": "2024-10-22T13:33:41.138474"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 1,
      "createdAt": "2024-08-24T13:33:41.138479"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 18,
      "createdAt": "2024-11-06T13:33:41.138484"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2024-05-11T13:33:41.138493"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 38,
      "createdAt": "2024-07-23T13:33:41.138501"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 12,
      "createdAt": "2024-09-26T13:33:41.138509"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 2,
      "createdAt": "2024-12-12T13:33:41.138517"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 17,
      "createdAt": "2025-02-11T13:33:41.138522"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 6,
      "createdAt": "2025-02-09T13:33:41.138527"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 35,
      "createdAt": "2024-09-07T13:33:41.138537"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 31,
      "createdAt": "2024-06-23T13:33:41.138545"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 15,
      "createdAt": "2024-08-23T13:33:41.138549"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-06-14T13:33:41.138554"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 1,
      "createdAt": "2024-10-01T13:33:41.138559"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 14,
      "createdAt": "2024-05-03T13:33:41.138563"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-05-16T13:33:41.138568"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 25,
      "createdAt": "2024-05-18T13:33:41.138574"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 18,
      "createdAt": "2024-05-27T13:33:41.138579"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 9,
      "createdAt": "2024-11-19T13:33:41.138584"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 23,
      "createdAt": "2024-06-07T13:33:41.138589"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 9,
      "createdAt": "2025-04-08T13:33:41.138593"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 20,
      "createdAt": "2024-05-07T13:33:41.138598"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2025-04-07T13:33:41.138603"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 8,
      "createdAt": "2024-06-24T13:33:41.138608"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 25,
      "createdAt": "2024-10-18T13:33:41.138612"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2024-09-05T13:33:41.138617"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 40,
      "createdAt": "2024-11-29T13:33:41.138622"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 1,
      "createdAt": "2024-10-23T13:33:41.138629"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 40,
      "createdAt": "2024-08-11T13:33:41.138635"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 11,
      "createdAt": "2025-02-05T13:33:41.138832"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2024-07-23T13:33:41.138846"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2024-04-23T13:33:41.138856"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 30,
      "createdAt": "2024-12-20T13:33:41.138865"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 37,
      "createdAt": "2025-02-26T13:33:41.138874"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 3,
      "createdAt": "2024-08-23T13:33:41.138897"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-10-12T13:33:41.138906"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2025-03-23T13:33:41.138914"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 14,
      "createdAt": "2025-01-22T13:33:41.138923"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 34,
      "createdAt": "2024-08-03T13:33:41.138932"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2024-10-19T13:33:41.138940"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2024-12-24T13:33:41.138949"
    },
    {
      "title": "Write API docs",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2024-10-11T13:33:41.138957"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 33,
      "createdAt": "2024-10-08T13:33:41.138965"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 21,
      "createdAt": "2024-10-24T13:33:41.138973"
    },
    {
      "title": "Refactor codebase",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 39,
      "createdAt": "2025-03-22T13:33:41.138981"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2024-05-11T13:33:41.138996"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 34,
      "createdAt": "2025-02-17T13:33:41.139005"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-11-06T13:33:41.139014"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-06-11T13:33:41.139022"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 12,
      "createdAt": "2024-09-04T13:33:41.139031"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 14,
      "createdAt": "2024-05-05T13:33:41.139038"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 2,
      "createdAt": "2024-09-24T13:33:41.139047"
    },
    {
      "title": "Update dashboard UI",
      "type": "bug",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 29,
      "createdAt": "2024-12-23T13:33:41.139055"
    },
    {
      "title": "Design error pages",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-12-20T13:33:41.139066"
    },
    {
      "title": "Add new user roles",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 22,
      "createdAt": "2024-11-16T13:33:41.139075"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Done",
      "priority": "Medium",
      "estimatedHours": 4,
      "createdAt": "2024-08-28T13:33:41.139083"
    },
    {
      "title": "Fix login bug",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2024-09-01T13:33:41.139091"
    },
    {
      "title": "Optimize DB queries",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 6,
      "createdAt": "2024-09-25T13:33:41.139099"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 39,
      "createdAt": "2024-11-26T13:33:41.139107"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 1,
      "createdAt": "2024-09-28T13:33:41.139116"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 9,
      "createdAt": "2025-01-01T13:33:41.139124"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 38,
      "createdAt": "2024-07-22T13:33:41.139133"
    },
    {
      "title": "Update dashboard UI",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 10,
      "createdAt": "2024-09-25T13:33:41.139142"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 14,
      "createdAt": "2024-06-03T13:33:41.139150"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 31,
      "createdAt": "2024-05-06T13:33:41.139178"
    },
    {
      "title": "Write API docs",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 13,
      "createdAt": "2025-03-28T13:33:41.139187"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 39,
      "createdAt": "2024-11-27T13:33:41.139195"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 27,
      "createdAt": "2025-02-02T13:33:41.139203"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 18,
      "createdAt": "2025-03-16T13:33:41.139211"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 34,
      "createdAt": "2024-12-30T13:33:41.139219"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 17,
      "createdAt": "2024-08-23T13:33:41.139227"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 36,
      "createdAt": "2024-07-06T13:33:41.139236"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2025-02-28T13:33:41.139244"
    },
    {
      "title": "Optimize DB queries",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 21,
      "createdAt": "2025-02-19T13:33:41.139252"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 19,
      "createdAt": "2024-12-30T13:33:41.139260"
    },
    {
      "title": "Add new user roles",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2024-10-20T13:33:41.139269"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2024-10-05T13:33:41.139279"
    },
    {
      "title": "Design error pages",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 16,
      "createdAt": "2024-10-13T13:33:41.139287"
    },
    {
      "title": "Fix login bug",
      "type": "documentation",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-08-24T13:33:41.139295"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 7,
      "createdAt": "2025-02-09T13:33:41.139304"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 23,
      "createdAt": "2025-03-31T13:33:41.139312"
    },
    {
      "title": "Refactor codebase",
      "type": "enhancement",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 5,
      "createdAt": "2024-08-25T13:33:41.139519"
    },
    {
      "title": "Refactor codebase",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 11,
      "createdAt": "2024-04-26T13:33:41.139546"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Todo",
      "priority": "Low",
      "estimatedHours": 15,
      "createdAt": "2024-08-18T13:33:41.139556"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 35,
      "createdAt": "2024-11-26T13:33:41.139562"
    },
    {
      "title": "Implement auth",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 7,
      "createdAt": "2024-12-13T13:33:41.139571"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 32,
      "createdAt": "2025-02-19T13:33:41.139576"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 33,
      "createdAt": "2024-07-02T13:33:41.139581"
    },
    {
      "title": "Design error pages",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Medium",
      "estimatedHours": 33,
      "createdAt": "2024-12-05T13:33:41.139586"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-09-07T13:33:41.139591"
    },
    {
      "title": "Optimize DB queries",
      "type": "bug",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 17,
      "createdAt": "2024-07-02T13:33:41.139596"
    },
    {
      "title": "Write API docs",
      "type": "bug",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 28,
      "createdAt": "2024-10-17T13:33:41.139602"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 27,
      "createdAt": "2024-12-07T13:33:41.139610"
    },
    {
      "title": "Refactor codebase",
      "type": "feature",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 26,
      "createdAt": "2024-07-03T13:33:41.139735"
    },
    {
      "title": "Fix login bug",
      "type": "feature",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2024-06-14T13:33:41.139741"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Done",
      "priority": "High",
      "estimatedHours": 4,
      "createdAt": "2024-10-28T13:33:41.139797"
    },
    {
      "title": "Add new user roles",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 29,
      "createdAt": "2024-12-13T13:33:41.139805"
    },
    {
      "title": "Fix login bug",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 25,
      "createdAt": "2024-08-22T13:33:41.139810"
    },
    {
      "title": "Write API docs",
      "type": "documentation",
      "status": "Canceled",
      "priority": "High",
      "estimatedHours": 5,
      "createdAt": "2024-04-18T13:33:41.139815"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 8,
      "createdAt": "2024-11-23T13:33:41.139820"
    },
    {
      "title": "Implement auth",
      "type": "documentation",
      "status": "Todo",
      "priority": "Medium",
      "estimatedHours": 36,
      "createdAt": "2025-02-28T13:33:41.139841"
    },
    {
      "title": "Update dashboard UI",
      "type": "documentation",
      "status": "Done",
      "priority": "Low",
      "estimatedHours": 14,
      "createdAt": "2025-03-04T13:33:41.139846"
    },
    {
      "title": "Optimize DB queries",
      "type": "feature",
      "status": "Canceled",
      "priority": "Low",
      "estimatedHours": 31,
      "createdAt": "2024-08-18T13:33:41.139851"
    },
    {
      "title": "Design error pages",
      "type": "documentation",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 16,
      "createdAt": "2025-04-15T13:33:41.139856"
    },
    {
      "title": "Update dashboard UI",
      "type": "enhancement",
      "status": "Canceled",
      "priority": "Medium",
      "estimatedHours": 22,
      "createdAt": "2025-02-26T13:33:41.139863"
    },
    {
      "title": "Add new user roles",
      "type": "bug",
      "status": "Todo",
      "priority": "High",
      "estimatedHours": 30,
      "createdAt": "2024-10-06T13:33:41.139871"
    },
    {
      "title": "Implement auth",
      "type": "feature",
      "status": "In-Progress",
      "priority": "High",
      "estimatedHours": 32,
      "createdAt": "2025-03-08T13:33:41.139878"
    },
    {
      "title": "Implement auth",
      "type": "enhancement",
      "status": "In-Progress",
      "priority": "Low",
      "estimatedHours": 20,
      "createdAt": "2025-03-06T13:33:41.139886"
    }
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full">
        <ThemeToggle/>
      {/* Filters & Column Selector */}
      <div className="flex items-center py-4 gap-4 flex-wrap">
        <Input
          placeholder="Search title..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />

        <select
          className="border px-3 py-2 rounded text-sm"
          value={table.getColumn("type")?.getFilterValue() ?? ""}
          onChange={(e) => table.getColumn("type")?.setFilterValue(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
          <option value="task">Task</option>
        </select>

        <select
          className="border px-3 py-2 rounded text-sm"
          value={table.getColumn("status")?.getFilterValue() ?? ""}
          onChange={(e) => table.getColumn("status")?.setFilterValue(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Done">Done</option>
          <option value="In Progress">In Progress</option>
          <option value="Backlog">Backlog</option>
        </select>

        <select
          className="border px-3 py-2 rounded text-sm"
          value={table.getColumn("priority")?.getFilterValue() ?? ""}
          onChange={(e) => table.getColumn("priority")?.setFilterValue(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            table.resetColumnFilters()
            table.resetSorting()
          }}
        >
          Clear Filters
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                  <div className="mt-2">
                    <Button size="sm" onClick={() => table.resetColumnFilters()}>
                      Clear Filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4 flex-wrap gap-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <select
            className="border px-2 py-1 rounded text-sm"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <span className="text-sm px-2">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  )
}
