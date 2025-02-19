import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { DayMenu as DayMenuType } from '../../types/menu';

interface DayMenuProps {
    menu: DayMenuType;
    dayName: string;
    menuType: 'lunch' | 'dinner';
}

const MENU_TYPE_LABELS = {
    lunch: 'Comida',
    dinner: 'Cena'
};

const DayMenu: React.FC<DayMenuProps> = ({ menu, dayName, menuType }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {dayName} - {MENU_TYPE_LABELS[menuType]}
                </Typography>

                <Typography variant="subtitle1" color="primary">
                    Primeros
                </Typography>
                <List dense>
                    {menu.first.map((dish) => (
                        <ListItem key={dish.id}>
                            <ListItemText primary={dish.name} secondary={dish.description} />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle1" color="primary">
                    Segundos
                </Typography>
                <List dense>
                    {menu.second.map((dish) => (
                        <ListItem key={dish.id}>
                            <ListItemText primary={dish.name} secondary={dish.description} />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle1" color="primary">
                    Guarniciones
                </Typography>
                <List dense>
                    {menu.garnish.map((dish) => (
                        <ListItem key={dish.id}>
                            <ListItemText primary={dish.name} secondary={dish.description} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default DayMenu;
