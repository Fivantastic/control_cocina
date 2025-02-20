export interface DeliveryNoteItem {
    id: number;
    delivery_note_id: number;
    product_id: number;
    supplier_product_code: string;
    product_family: string;
    product_category: string;
    description: string;
    unit_type: string;
    quantity: number;
    weight_per_unit: number;
    total_weight: number;
    unit_price: number;
    net_price: number;
    tax_rate: number;
    mer_rate: number;
    total_price: number;
    batch_number: string;
    expiry_date: string;
    ean13_code: string;
    temperature_requirements: string;
    product_name?: string;
    internal_product_code?: string;
}

export interface TaxSummary {
    id: number;
    delivery_note_id: number;
    tax_base: number;
    tax_rate: number;
    tax_amount: number;
    mer_amount: number;
}

export interface DeliveryNote {
    id: number;
    supplier_id: number;
    supplier_name?: string;
    supplier_type?: string;
    supplier_delivery_note_number: string;
    external_reference: string;
    expedition_number: string;
    client_number: string;
    delivery_date: string;
    delivery_location: string;
    total_packages: number;
    total_weight: number;
    temperature_zone: string;
    delivery_schedule: string;
    payment_method: string;
    sales_rep_id: string;
    total_net_amount: number;
    total_tax_amount: number;
    total_mer_amount: number;
    total_amount: number;
    notes: string;
    items?: DeliveryNoteItem[];
    tax_summary?: TaxSummary[];
    created_at: string;
    updated_at: string;
}
