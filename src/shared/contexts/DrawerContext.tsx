import { createContext, useContext, useState, useCallback } from "react";
import { IDrawerContextData } from "../../@types/IDrawerContextData";
import { IAppDrawerProviderProps } from "../../@types/IAppDrawerProviderProps";
import { IDrawerOption } from "../../@types/IDrawerOption";

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
    return useContext(DrawerContext);
};

export const AppDrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawer: isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOption: handleSetDrawerOptions }}>
            {children}
        </DrawerContext.Provider>
    );
};
