export interface ISupplier {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface INewSupplier {
    name: string;
    email: string;
    phone: string;
}

export interface ISupplierFormModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (name: string, email: string, phone: string) => void;
}

