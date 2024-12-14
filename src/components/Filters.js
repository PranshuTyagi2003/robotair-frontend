import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const Filters = ({ statusFilter, batteryFilter, setStatusFilter, setBatteryFilter }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        marginBottom: 3,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="online">Online</MenuItem>
          <MenuItem value="offline">Offline</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Battery > %"
        type="number"
        value={batteryFilter}
        onChange={(e) => setBatteryFilter(e.target.value)}
      />
    </Box>
  );
};

export default Filters;
