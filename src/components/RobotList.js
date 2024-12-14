import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const RobotList = ({ robots }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Robot ID</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Battery %</TableCell>
          <TableCell>CPU Usage</TableCell>
          <TableCell>RAM Consumption</TableCell>
          <TableCell>Last Updated</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {robots.map((robot) => (
          <TableRow
            key={robot['Robot ID']}
            style={{ backgroundColor: robot['Battery Percentage'] < 20 ? '#ffcccc' : 'white' }}
          >
            <TableCell>{robot['Robot ID']}</TableCell>
            <TableCell>{robot['Online/Offline'] ? 'Online' : 'Offline'}</TableCell>
            <TableCell>{robot['Battery Percentage']}%</TableCell>
            <TableCell>{robot['CPU Usage']}%</TableCell>
            <TableCell>{robot['RAM Consumption']} MB</TableCell>
            <TableCell>{robot['Last Updated']}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RobotList;
