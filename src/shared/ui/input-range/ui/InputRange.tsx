import { Slider, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { type CustomInputRangeProps } from "../model";
import "./CustomInputRange.scss";

export const InputRange: React.FC<CustomInputRangeProps> = ({ onChange, title, points, unit = "₸", min, max, disabled }) => {
    const [range, setRange] = useState<number[]>([]);

    // Синхронизация с родителем при обновлении props.points
    useEffect(() => {
        if (points) {
            if (points[0] !== range[0] || points[1] !== range[1]) {
                setRange(points);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateRange = (newRange: number[]) => {
        setRange(newRange);
        onChange?.(newRange);
    };

    const handleMinInputChange = (val: number | null) => {
        if (val === null) return;
        const newRange: [number, number] = [val, Math.max(val, range[1])];
        updateRange(newRange);
    };

    const handleMaxInputChange = (val: number | null) => {
        if (val === null) return;
        const newRange: [number, number] = [Math.min(val, range[0]), val];
        updateRange(newRange);
    };

    const handleSliderChange = (values: [number, number]) => {
        setRange(values);
    };

    const handleSliderAfterChange = (values: [number, number]) => {
        updateRange(values);
    };

    return (
        <div className="flex flex-col gap-4 relative">
            {title && (
                <h5 className="text-xs text-gray-2">
                    {title} {unit}
                </h5>
            )}
            <div className="grid grid-cols-2">
                <div className="col-span-1">
                    <InputNumber
                        value={range?.[0]}
                        formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        controls={false}
                        onChange={handleMinInputChange}
                        disabled={disabled}
                        className="!bg-[unset] !border-0 !text-white h-30 !flex items-center"
                    />
                </div>
                <div className="col-span-1">
                    <InputNumber
                        value={range?.[1]}
                        formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
                        controls={false}
                        onChange={handleMaxInputChange}
                        disabled={disabled}
                        className="!bg-[unset] !border-0 !text-white h-30 !flex items-center"
                        rootClassName="input-right"
                    />
                </div>
                <div className="col-span-12">
                    <Slider
                        range
                        value={range}
                        className="custom-input-range-slider"
                        onChange={(values) => handleSliderChange(values as [number, number])}
                        onChangeComplete={(values) => handleSliderAfterChange(values as [number, number])}
                        min={min}
                        max={max}
                        tooltip={{ open: false }}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
};
