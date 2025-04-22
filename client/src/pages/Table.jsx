// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Stack
// } from "@mui/material";

// import axios from "axios";
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { useSearchParams } from "react-router-dom";

// const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor("title", {
//     header: () => <strong>Title</strong>,
//   }),
//   columnHelper.accessor("type", {
//     header: () => <strong>Type</strong>,
//   }),
//   columnHelper.accessor("status", {
//     header: () => <strong>Status</strong>,
//   }),
//   columnHelper.accessor("priority", {
//     header: () => <strong>Priority</strong>,
//   }),
// ];

// export function DataTableDemo() {
//   const [data, setData] = useState([]);

//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const page = pagination.pageIndex + 1; // because backend is 1-based
//         const limit = pagination.pageSize;
//         const url = `http://localhost:5000/api/tasks?page=${page}&pageSize=${limit}`;

//         const response = await axios.get(url);
//         console.log("Data fetched:", response.data);
//         setData(response.data); // adjust based on API response structure
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [pagination]);

//   const table = useReactTable({
//     data:data.data,
//     columns,
//     state: {
//       pagination,
//     },
//     manualPagination: true,
//     pageCount: data.pagination.totalCount/ data.pagination.pageSize // unknown total pages
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             {table.getHeaderGroups()[0].headers.map((header) => (
//               <TableCell key={header.id}>
//                 {flexRender(header.column.columnDef.header, header.getContext())}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {table.getRowModel().rows.map((row) => (
//             <TableRow key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <TableCell key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Stack direction="row" justifyContent={"space-between"} sx={{p:3}}>
//         <Button disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()} variant="contained" >Previous</Button>
//         <Button  disabled={!table.getCanNextPage()}  onClick={()=>table.nextPage()} variant="contained" >Next</Button>
//       </Stack>

//     </TableContainer>

//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Stack,
//   Typography,
// } from "@mui/material";

// import axios from "axios";
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor("title", {
//     header: () => <strong>Title</strong>,
//   }),
//   columnHelper.accessor("type", {
//     header: () => <strong>Type</strong>,
//   }),
//   columnHelper.accessor("status", {
//     header: () => <strong>Status</strong>,
//   }),
//   columnHelper.accessor("priority", {
//     header: () => <strong>Priority</strong>,
//   }),
// ];

// export function DataTableDemo() {
//   const [data, setData] = useState({ data: [], pagination: {} });
//    const [sorting,setSorting] = useState([])
//   const [pagination, setPagination] = useState({
//     pageIndex: 1,
//     pageSize: 10,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const page = pagination.pageIndex + 1; // backend is 1-based
//         const limit = pagination.pageSize;
//         const url = `http://localhost:5000/api/tasks?page=${page}&pageSize=${limit}`;

//         const response = await axios.get(url);
//         console.log("Data fetched:", response.data);
//         setData(response.data); // Save the whole response object
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     fetchData();
//   }, [pagination]);

//   const table = useReactTable({
//     data: data?.data || [],
//     columns,
//     state: {
//       pagination,
//       sorting
//     },
//     manualPagination: true,
//     sortDescFirst: false,
//     pageCount: data?.pagination
//       ? Math.ceil(data.pagination.totalCount / data.pagination.pageSize)
//       : -1,
//     onPaginationChange: setPagination,
//     onSortingChange:setSorting,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   console.log("checkkkkkkkkk sortinggggggggggg",sorting)
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             {table.getHeaderGroups()[0].headers.map((header) => (
//               <TableCell sx={{cursor:"pointer","&:hover":{
//                 bgColor:(theme)=>theme.palette.grey[100]
//               }}} key={header.id}  onClick={header.column.getToggleSortingHandler()}>

//                 {flexRender(
//                   header.column.columnDef.header,
//                   header.getContext()
//                 )}
//                 {header.column.getIsSorted()}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {table.getRowModel().rows.map((row) => (
//             <TableRow key={row.id}>
//               {row.getVisibleCells().map((cell) => (
//                 <TableCell key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* pagination control button are shown here  */}

//       {/* Pagination Controls */}
//       <Stack direction="row" justifyContent="space-between" sx={{ p: 3 }}>
//         <Button
//           disabled={!table.getCanPreviousPage()}
//           onClick={() => table.previousPage()}
//           variant="contained"
//         >
//           Previousi
//         </Button>
//         <Typography>
//           Page {table.getState().pagination.pageIndex} of {table.getPageCount()}
//         </Typography>
//         <Button
//           disabled={!table.getCanNextPage()}
//           onClick={() => table.nextPage()}
//           variant="contained"
//         >
//           Next
//         </Button>
//       </Stack>
//     </TableContainer>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("title", { header: "Title" }),
  columnHelper.accessor("type", { header: "Type" }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("priority", { header: "Priority" }),
];

const dropdownOptions = {
  type: ["bug", "feature", "task"],
  status: ["Todo", "In-Progress", "Canceled", "Done"],
  priority: ["Low", "Medium", "High"],
};

export function DataTableDemo() {
  const [data, setData] = useState({ data: [], pagination: {} });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    type: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const page = pagination.pageIndex + 1;
      const limit = pagination.pageSize;
      const sort = sorting[0] || {};

      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const params = new URLSearchParams({
        page,
        pageSize: limit,
        sortBy: sort.id || "createdAt",
        sortOrder: sort.desc ? "desc" : "asc",
        ...cleanFilters,
      });

      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks?${params}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [pagination, sorting, filters]);

  const table = useReactTable({
    data: data?.data || [],
    columns,
    state: { pagination, sorting },
    manualPagination: true,
    manualSorting: true,
    pageCount: data.pagination?.totalPages ?? -1,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleResetFilters = () => {
    setFilters({ title: "", type: "", status: "", priority: "" });
    setPagination({ pageIndex: 0, pageSize: 10 });
    setSorting([]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filter Tasks
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField
            label="Search Title"
            variant="outlined"
            size="small"
            value={filters.title}
            onChange={(e) => handleFilterChange("title", e.target.value)}
          />
          {Object.entries(dropdownOptions).map(([key, options]) => (
            <TextField
              key={key}
              label={key[0].toUpperCase() + key.slice(1)}
              select
              size="small"
              value={filters[key]}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All</MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ))}
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleResetFilters}
            sx={{ ml: "auto", height: 40 }}
          >
            Reset Filters
          </Button>
        </Stack>
      </Paper>

      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow>
              {table.getHeaderGroups()[0].headers.map((header) => (
                <TableCell
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  sx={{ cursor: "pointer", fontWeight: 600 }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " ↑"
                    : header.column.getIsSorted() === "desc"
                    ? " ↓"
                    : ""}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            variant="contained"
          >
            Previous
          </Button>
          <Typography>
            Page {pagination.pageIndex + 1} of{" "}
            {data.pagination?.totalPages || 1}
          </Typography>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant="contained"
          >
            Next
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
