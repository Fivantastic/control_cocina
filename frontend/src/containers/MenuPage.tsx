import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import WeeklyMenu from '../components/menu/WeeklyMenu';
import MenuStockNeeds from '../components/menu/MenuStockNeeds';
import FoodPortionsLegend from '../components/menu/FoodPortionsLegend';
import PatientMealsReport from '../components/menu/PatientMealsReport';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`menu-tabpanel-${index}`}
            aria-labelledby={`menu-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const MenuPage: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [selectedWeek, setSelectedWeek] = useState<number>(1);
    const [selectedDay, setSelectedDay] = useState<'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'>('Lunes');

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleWeekChange = (weekNumber: number) => {
        setSelectedWeek(weekNumber);
    };
    
    const handleDayChange = (day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo') => {
        setSelectedDay(day);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="menu tabs">
                    <Tab label="Menú Semanal" id="menu-tab-0" />
                    <Tab label="Informe de Comidas" id="menu-tab-1" />
                    <Tab label="Necesidades de Stock" id="menu-tab-2" />
                    <Tab label="Leyenda de Colores y Gramajes" id="menu-tab-3" />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <WeeklyMenu onWeekChange={handleWeekChange} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <PatientMealsReport dayOfWeek={selectedDay} weekNumber={selectedWeek} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <MenuStockNeeds weekNumber={selectedWeek} />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Leyenda de Colores y Gramajes para Platos
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Esta tabla muestra la relación entre los colores y las cantidades de comida en gramos según el tipo de plato.
                        Los colores se utilizan para indicar las diferentes porciones que se sirven a los pacientes.
                    </Typography>
                    <FoodPortionsLegend showTitle={false} />
                    
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Leyenda de Colores para Pan
                        </Typography>
                        <Paper sx={{ p: 3, mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Desayuno
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF0000', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Rojo - 1 bollo</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FFFF00', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Amarillo - 1 bollo y 1/2</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#0000FF', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Azul - 2 bollos</Typography>
                                </Box>
                            </Box>

                            <Typography variant="subtitle1" gutterBottom>
                                Merienda
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF0000', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Rojo - Medio bollo</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FFFF00', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Amarillo - Un poco más de la mitad del bollo</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#0000FF', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Azul - 1 bollo</Typography>
                                </Box>
                            </Box>

                            <Typography variant="subtitle1" gutterBottom>
                                Almuerzo y Cena
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF0000', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Rojo - Un poco menos de la mitad del bollo</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FFFF00', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Amarillo - Medio bollo</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#0000FF', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>Azul - 1 bollo</Typography>
                                </Box>
                            </Box>

                            <Typography variant="subtitle1" gutterBottom>
                                Extra
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#FF0000', border: '1px solid #ccc' }}></Box>
                                    <Typography variant="body2" sx={{ ml: 1 }}>EXT - No lleva pan ni en almuerzo ni cena</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </TabPanel>
        </Box>
    );
};

export default MenuPage;
