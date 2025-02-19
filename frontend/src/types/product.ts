export interface Product {
    id: number;
    code: string;
    name: string;
    type_id: number;
    type_name: string;
    purchase_unit_id: number;
    purchase_unit_name: string;
    purchase_unit_abbreviation: string;
    unit_quantity: number;
    base_unit_id: number;
    base_unit_name: string;
    base_unit_abbreviation: string;
    theoretical_stock: number;
    actual_stock: number | null;
    minimum_stock: number | null;
    price: number;
    last_count_date: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface ProductType {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Unit {
    id: number;
    name: string;
    abbreviation: string;
    created_at: string;
    updated_at: string;
}

export interface UpdateStockPayload {
    actualStock: number;
}

export interface UpdateMinimumStockPayload {
    minimumStock: number;
}

export interface ProductFilters {
    type?: number;
    search?: string;
    lowStock?: boolean;
}
