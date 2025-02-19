export interface Dish {
    id: number;
    name: string;
    description: string;
    category: 'Primero' | 'Segundo' | 'Guarnición';
}

export interface DayMenu {
    first: Dish[];
    second: Dish[];
    garnish: Dish[];
}

export interface WeekMenu {
    lunch: DayMenu[];
    dinner: DayMenu[];
}

export interface MenuResponse {
    success: boolean;
    data: WeekMenu;
}

export interface WeeksResponse {
    success: boolean;
    data: number[];
}

export interface MenuFilters {
    weekNumber: number;
    menuType?: 'lunch' | 'dinner';
}
