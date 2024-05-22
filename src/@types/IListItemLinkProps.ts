export interface IListItemLinkProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    onClick: (() => void) | undefined;
}
