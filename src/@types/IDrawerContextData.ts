import { IDrawerOption } from "./IDrawerOption";

export interface IDrawerContextData {
    isDrawer: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOption: (newDrawerOptions: IDrawerOption[]) => void;
}