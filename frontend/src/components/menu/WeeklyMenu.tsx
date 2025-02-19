import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Tab,
    Tabs,
    CircularProgress,
    Alert,
} from '@mui/material';
import WeekSelector from './WeekSelector';
import DayMenu from './DayMenu';
import { menuService } from '../../services/api';
import { WeekMenu } from '../../types/menu';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const WeeklyMenu: React.FC = () => {
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [availableWeeks, setAvailableWeeks] = useState<number[]>([]);
    const [menuData, setMenuData] = useState<WeekMenu | null>(null);
    const [menuType, setMenuType] = useState<'lunch' | 'dinner'>('lunch');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeeks = async () => {
            try {
                const response = await menuService.getAllMenuWeeks();
                setAvailableWeeks(response.data);
                if (response.data.length > 0 && !selectedWeek) {
                    setSelectedWeek(response.data[0]);
                }
            } catch (err) {
                setError('Error al cargar las semanas disponibles');
            }
        };

        fetchWeeks();
    }, []);

    useEffect(() => {
        const fetchMenu = async () => {
            if (!selectedWeek) return;

            setLoading(true);
            setError(null);
            try {
                const response = await menuService.getMenuByWeek(selectedWeek);
                setMenuData(response.data);
            } catch (err) {
                setError('Error al cargar el menú');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, [selectedWeek]);

    const handleWeekChange = (week: number) => {
        setSelectedWeek(week);
    };

    const handleMenuTypeChange = (_: React.SyntheticEvent, newValue: 'lunch' | 'dinner') => {
        setMenuType(newValue);
    };

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    return (
        <Container maxWidth="xl">
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Menú Semanal
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <WeekSelector
                            weeks={availableWeeks}
                            selectedWeek={selectedWeek}
                            onWeekChange={handleWeekChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                            <Tabs value={menuType} onChange={handleMenuTypeChange}>
                                <Tab label="Comidas" value="lunch" />
                                <Tab label="Cenas" value="dinner" />
                            </Tabs>
                        </Box>
                    </Grid>
                </Grid>

                {loading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    menuData && (
                        <Grid container spacing={3}>
                            {DAYS.map((day, index) => (
                                <Grid item xs={12} md={6} lg={4} key={day}>
                                    <DayMenu
                                        menu={menuData[menuType][index]}
                                        dayName={day}
                                        menuType={menuType}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )
                )}
            </Paper>
        </Container>
    );
};

export default WeeklyMenu;
