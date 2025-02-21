export type StockStatus = 'full' | 'partial' | 'empty';
export type MovementType = 'in' | 'out' | 'adjustment';

export interface StockMovement {
    id: number;
    delivery_note_item_id: number;
    dish_product_id?: number;
    movement_type: MovementType;
    quantity: number;
    remaining_quantity: number;
    movement_date: string;
    notes?: string;
    created_by: number;
    created_at: string;
    dish_name?: string;
}

export interface ProductStock {
    id: number;
    product_id: number;
    product_name: string;
    batch_number: string;
    quantity: number;
    remaining_quantity: number;
    unit_type: string;
    expiry_date: string;
    status: StockStatus;
    supplier_name: string;
    delivery_date: string;
}
