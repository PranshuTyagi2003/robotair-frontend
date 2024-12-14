import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import RobotList from '../components/RobotList';
import MapView from '../components/MapView';
import Filters from '../components/Filters';
import io from 'socket.io-client';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [robots, setRobots] = useState([]);
    const [filteredRobots, setFilteredRobots] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [batteryFilter, setBatteryFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://autofills-backend-1.onrender.com/robots')
            .then((response) => {
                setRobots(response.data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching robot data:', error));

        const socket = io('https://autofills-backend-1.onrender.com');
        socket.on('robot_data_update', (data) => setRobots(data));
        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        let filtered = robots;
        if (statusFilter !== 'all') {
            filtered = filtered.filter(robot => statusFilter === 'online' ? robot['Online/Offline'] : !robot['Online/Offline']);
        }
        if (batteryFilter) {
            filtered = filtered.filter(robot => robot['Battery Percentage'] > parseInt(batteryFilter));
        }
        setFilteredRobots(filtered);
    }, [robots, statusFilter, batteryFilter]);

    const chartData = {
        labels: filteredRobots.map(robot => robot['Robot ID']),
        datasets: [
            {
                label: 'CPU Usage (%)',
                data: filteredRobots.map(robot => robot['CPU Usage']),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderWidth: 2,
            },
            {
                label: 'RAM Consumption (MB)',
                data: filteredRobots.map(robot => robot['RAM Consumption']),
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
        },
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Robot Fleet Monitoring Dashboard</Typography>
            <Filters
                statusFilter={statusFilter}
                batteryFilter={batteryFilter}
                setStatusFilter={setStatusFilter}
                setBatteryFilter={setBatteryFilter}
            />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Robot List</Typography>
                            <RobotList robots={filteredRobots} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Map View</Typography>
                            <MapView robots={filteredRobots} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">CPU and RAM Usage</Typography>
                            <div style={{ height: '400px', position: 'relative' }}>
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
