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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import WeekSelector from './WeekSelector';
import { menuService } from '../../services/api';
import { WeekMenu } from '../../types/menu';
import './WeeklyMenu.css';

const DAYS = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];

interface WeeklyMenuProps {
    onWeekChange?: (weekNumber: number) => void;
}

const WeeklyMenu: React.FC<WeeklyMenuProps> = ({ onWeekChange }) => {
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
                    const firstWeek = response.data[0];
setSelectedWeek(firstWeek);
if (onWeekChange) {
    onWeekChange(firstWeek);
}
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
        if (onWeekChange) {
            onWeekChange(week);
        }
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
                <Grid container spacing={2}>
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
                        <div className="menu-container">
                            <div className="menu-header">
                                <Typography variant="h6">Menú basal 1ª semana</Typography>
                                <Typography variant="h6" color="error">{menuType === 'lunch' ? 'COMIDA' : 'CENA'}</Typography>
                            </div>
                            <TableContainer>
                                <Table className="menu-table">
                                    <TableHead>
                                        <TableRow>
                                            {DAYS.map((day) => (
                                                <TableCell key={day} align="center">{day}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {DAYS.map((_, index) => {
                                                const dayMenu = menuData[menuType][index];
                                                return (
                                                    <TableCell key={index} className="menu-cell">
                                                        <div className="course-section">
                                                            <Typography variant="subtitle2" className="course-title">Primero</Typography>
                                                            {dayMenu.first.map((dish) => (
                                                                <Typography key={dish.id} variant="body2">{dish.name}</Typography>
                                                            ))}
                                                        </div>
                                                        <div className="course-section">
                                                            <Typography variant="subtitle2" className="course-title">Segundo</Typography>
                                                            {dayMenu.second.map((dish) => (
                                                                <Typography key={dish.id} variant="body2">{dish.name}</Typography>
                                                            ))}
                                                        </div>
                                                        <div className="course-section garnish">
                                                            <Typography variant="subtitle2" className="course-title">Guarnición</Typography>
                                                            {dayMenu.garnish.map((dish) => (
                                                                <Typography key={dish.id} variant="body2">{dish.name}</Typography>
                                                            ))}
                                                        </div>
                                                        <div className="course-section dessert">
                                                            <Typography variant="subtitle2" className="course-title">Postre</Typography>
                                                            <Typography variant="body2">Fruta de temporada</Typography>
                                                            <Typography variant="body2">Natillas de vainilla</Typography>
                                                        </div>
                                                        <div className="bread-section">
                                                            <Typography variant="subtitle2">Pan 60g</Typography>
                                                        </div>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className="menu-footer">
                                <div className="nutrition-info">
                                    <Typography variant="body2">Kcal</Typography>
                                    <Typography variant="body1">815</Typography>
                                </div>
                                <div className="nutrition-info">
                                    <Typography variant="body2">Prot</Typography>
                                    <Typography variant="body1">35g</Typography>
                                </div>
                                <div className="nutrition-info">
                                    <Typography variant="body2">L.Sat</Typography>
                                    <Typography variant="body1">25g</Typography>
                                </div>
                                <div className="nutrition-info">
                                    <Typography variant="body2">H.C.</Typography>
                                    <Typography variant="body1">50g</Typography>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </Paper>
        </Container>
    );
};

export default WeeklyMenu;
