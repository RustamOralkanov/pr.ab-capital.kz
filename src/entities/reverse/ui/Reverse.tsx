import { CompareIcon } from "@/shared/icons/HeaderIcons";
import { useAppDispatch, useAppSelector } from "@/shared/libs/redux";
import { handleReverse } from "../model/reverse.slice";
import { useEffect } from "react";

export const Reverse = () => {
    const { reverse } = useAppSelector((state) => state.reverse);
    const dispatch = useAppDispatch();

    const setReverse = () => {
        dispatch(handleReverse(!reverse));
    };

    useEffect(() => {
        if (localStorage.getItem("reverse") === "true") {
            setReverse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <button
            className="w-60 h-60 flex justify-center items-center !text-white !transition-all !duration-300 hover:!bg-green hover:!text-black max-lg:hidden"
            onClick={setReverse}
        >
            <CompareIcon />
        </button>
    );
};
