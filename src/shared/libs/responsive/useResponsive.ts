import { useMediaQuery } from "react-responsive";

interface ScreenSize {
    isDesktop: boolean;
    isMiddleLaptop: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isBigSmartphone: boolean;
    isSmartphone: boolean;
    smallScreen: boolean;
    mixedLaptop: boolean;
}

export const useResponsive = (): ScreenSize => {
    const isDesktop = useMediaQuery({ minWidth: 1600 });
    const isMiddleLaptop = useMediaQuery({ maxWidth: 1440, minWidth: 1200 });
    const isLaptop = useMediaQuery({ maxWidth: 1599, minWidth: 993 });
    const isTablet = useMediaQuery({ maxWidth: 992, minWidth: 769 });
    const isBigSmartphone = useMediaQuery({ maxWidth: 768, minWidth: 576 });
    const isSmartphone = useMediaQuery({ maxWidth: 575, minWidth: 0 });
    const smallScreen = isTablet || isBigSmartphone || isSmartphone;
    const mixedLaptop = isMiddleLaptop || isLaptop;

    return {
        isDesktop,
        isMiddleLaptop,
        mixedLaptop,
        isLaptop,
        isTablet,
        isBigSmartphone,
        isSmartphone,
        smallScreen,
    };
};
