import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface WeekSelectorProps {
    weeks: number[];
    selectedWeek: number | null;
    onWeekChange: (week: number) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ weeks, selectedWeek, onWeekChange }) => {
    const handleChange = (event: SelectChangeEvent<number>) => {
        onWeekChange(event.target.value as number);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="week-selector-label">Semana</InputLabel>
            <Select
                labelId="week-selector-label"
                id="week-selector"
                value={selectedWeek || ''}
                label="Semana"
                onChange={handleChange}
            >
                {weeks.map((week) => (
                    <MenuItem key={week} value={week}>
                        Semana {week}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default WeekSelector;
