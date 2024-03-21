import React, { useState } from "react";
import { useMemo } from "react";
import moment from "moment";
import {
  Box,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  FormControl,
  Label,
  Select,
  MenuItem,
  IconButton,
  Button,
  Switch
} from "@mui/material";
import {
  
  MRT_TablePagination,
  MRT_GlobalFilterTextField,
  MRT_ExpandAllButton,
  MRT_TableContainer,
  useMaterialReactTable,
} from "material-react-table";
import jsonData from "./data.json";
import {
  FilterList,
  SwapVert,
  Visibility,
  ArrowUpward,
  ArrowDownward,
  Layers,
  Close,
 } from "@mui/icons-material"; 


const DataTable = () => {
  const data = jsonData;
  const [columnVisibility, setColumnVisibility] = useState({
    // Initialize column visibility state for each column
    id: true,
    name: true,
    category: true,
    subcategory: true,
    createdAt: true,
    updatedAt: true,
    price: true,
    sale_price: true,
  });
  const [visibleOpen, setVisibleOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortDirection, setSortDirection] = useState({});
  const [sortOpen, setSortOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
    const [grouping, setGrouping] = useState([]);
 
 const [selectedGroup, setSelectedGroup] = useState("");

   const [selectedColumn, setSelectedColumn] = useState("");

   

   const handleApplyGrouping = () => {
     
     toggleGroup();
   };


 const handleGroupChange = (event) => {
   setSelectedGroup(event.target.value);
 };

 const applyGrouping = () => {
   // Use setGrouping function to apply grouping to the selected column
   table.setGrouping([selectedGroup]);
   toggleGroup(); // Close the side panel after applying grouping
 };
   const applyFilters = () => {
     // Apply the filters to the table data using the filter API
     table.setGlobalFilter(searchText);
   };

   const clearFilters = () => {
     setSearchText("");
     // Clear all applied filters and reset the table data
     table.setGlobalFilter("");
   };

  const toggleVisible = () => {
    setVisibleOpen(!visibleOpen);
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const toggleSort = () => {
    setSortOpen(!sortOpen);
  };

  const toggleGroup = () => {
    setGroupOpen(!groupOpen);
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Name",
        accessorKey: "name",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Category",
        accessorKey: "category",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Subcategory",
        accessorKey: "subcategory",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Created At",
        accessorKey: "createdAt",

        Cell: ({ cell }) => {
          const createdAt = moment(cell.row.original.createdAt);
          return <span>{createdAt.format("DD-MMM-YYYY HH:mm")}</span>;
        },
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
        Cell: ({ cell }) => {
          const createdAt = moment(cell.row.original.updatedAt);
          return <span>{createdAt.format("DD-MMM-YYYY HH:mm")}</span>;
        },

        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Price",
        accessorKey: "price",

        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        header: "Sale Price",
        accessorKey: "sale_price",

        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    state: { columnVisibility, sortBy: sortDirection, grouping },
    onColumnVisibilityChange: setColumnVisibility,
    onSortByChange: setSortDirection,
    enableColumnActions: false,
    displayColumnDefOptions: {
      "mrt-row-expand": {
        Header: () => (
          <Stack direction="row" alignItems="center">
            <MRT_ExpandAllButton table={table} />
            <Box>Groups</Box>
          </Stack>
        ),
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.getValue(grouping[grouping.length - 1]);
        },
        enableResizing: true,
        size: 200,
      },
    },
    onGroupingChange: setGrouping,
    groupedColumnMode: "reorder",
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      showRowsPerPage: false,
      shape: "rounded",
      color: "primary",
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });
  
  
 const clearSort = () => {
   if (table) {
     table.resetSorting();
   }
 };
  const handleToggleColumn = (accessorKey) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [accessorKey]: !prevVisibility[accessorKey],
    }));
  };
  const handleShowAllColumns = () => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      id: true,
      name: true,
      category: true,
      subcategory: true,
      createdAt: true,
      updatedAt: true,
      price: true,
      sale_price: true,
    }));
  };
  console.log(columns);
return (
  <div>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "8px",
        marginTop: "10px",
      }}
    >
      <MRT_GlobalFilterTextField table={table} />
      <IconButton onClick={toggleVisible}>
        <Visibility />
      </IconButton>
      <IconButton onClick={toggleSort}>
        <SwapVert />
      </IconButton>
      <IconButton onClick={toggleFilter}>
        <FilterList />
      </IconButton>
      <IconButton onClick={toggleGroup}>
        <Layers />
      </IconButton>
    </Box>

    <MRT_TableContainer table={table} />
    <MRT_TablePagination table={table} />
    <Drawer
      anchor="right"
      PaperProps={{ sx: { width: "300px" } }}
      open={visibleOpen}
      onClose={toggleVisible}
    >
      <Typography>Show/Hide columns</Typography>
      <IconButton
        onClick={toggleVisible}
        sx={{ position: "absolute", right: "5px" }}
      >
        <Close />
      </IconButton>
      <List>
        {columns.map((column) => (
          <ListItem key={column.accessorKey}>
            <ListItemText primary={column.header} />
            <Switch
              checked={columnVisibility[column.accessorKey]}
              onChange={() => handleToggleColumn(column.accessorKey)}
            />
          </ListItem>
        ))}

        <Button
          variant="outlined"
          sx={{ justifyContent: "center" }}
          onClick={handleShowAllColumns}
        >
          Show All Columns
        </Button>
      </List>
    </Drawer>
    <Drawer
      anchor="right"
      open={filterOpen}
      PaperProps={{ sx: { width: "300px" } }}
      onClose={toggleFilter}
    >
      <Typography>Filter columns</Typography>
      <IconButton
        onClick={toggleFilter}
        sx={{ position: "absolute", top: "5px", right: "5px" }}
      >
        <Close />
      </IconButton>
      {/* Fuzzy search for the name column */}
      <List>
        <ListItem>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="outlined" onClick={applyFilters}>
            Apply
          </Button>
          <Button variant="outlined" onClick={clearFilters}>
            Clear
          </Button>
        </ListItem>
      </List>
    </Drawer>
    <Drawer
      anchor="right"
      open={sortOpen}
      onClose={toggleSort}
      PaperProps={{ sx: { width: "300px" } }}
    >
      <div>
        <Typography>Sort columns</Typography>
        <IconButton
          onClick={toggleSort}
          sx={{ position: "absolute", top: "5px", right: "5px" }}
        >
          <Close />
        </IconButton>
        {/* Render the list of columns with toggle switches for sorting direction */}
        <List>
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <ListItem key={header.id}>
                <Button
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.column.columnDef.header}
                </Button>
              </ListItem>
            ))
          )}
          <Button
            variant="outlined"
            sx={{ justifyContent: "center" }}
            onClick={clearSort}
          >
            Clear Sort
          </Button>
        </List>
      </div>
    </Drawer>
    <Drawer
      anchor="right"
      PaperProps={{ sx: { width: "300px" } }}
      open={groupOpen}
      onClose={toggleGroup}
    >
      <Typography>Group Panel</Typography>
      <div>
        {/* Select box for choosing grouping column */}
        <IconButton
          sx={{ position: "absolute", right: 5 }}
          onClick={toggleGroup}
        >
          <Close />
        </IconButton>
        <Select value={selectedColumn}  fullWidth>
          <MenuItem value="">Select Column</MenuItem>

          <MenuItem key="category" value="category">
            Category
          </MenuItem>
          <MenuItem key="subcategory" value="subcategory">
            Subcategory
          </MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleApplyGrouping}
          disabled={!selectedColumn}
          fullWidth
        >
          Apply Grouping
        </Button>
      </div>
    </Drawer>
  </div>
);
};

export default DataTable;
