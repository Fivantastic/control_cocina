import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import WeeklyMenu from '../components/menu/WeeklyMenu';
import MenuStockNeeds from '../components/menu/MenuStockNeeds';

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
    const [selectedWeek, setSelectedWeek] = useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleWeekChange = (weekNumber: number) => {
        setSelectedWeek(weekNumber);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="menu tabs">
                    <Tab label="Menú Semanal" id="menu-tab-0" />
                    <Tab label="Necesidades de Stock" id="menu-tab-1" />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <WeeklyMenu onWeekChange={handleWeekChange} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <MenuStockNeeds weekNumber={selectedWeek} />
            </TabPanel>
        </Box>
    );
};

export default MenuPage;
