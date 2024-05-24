export interface IEditSupplierModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (id: number, name: string, email: string, phone: string) => void;
    supplier: { id: number, name: string, email: string, phone: string } | null;
}