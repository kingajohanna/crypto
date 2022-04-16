import { useEffect } from "react";

export const useUpdateLogger = (value: string) => {
    useEffect(() => {
        console.log(value);
    }, [value]);
};
