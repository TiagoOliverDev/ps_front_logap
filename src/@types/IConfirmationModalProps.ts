export interface IConfirmationModalProps {
    message: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}