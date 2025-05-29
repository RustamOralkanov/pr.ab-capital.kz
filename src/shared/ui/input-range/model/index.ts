export interface CustomInputRangeProps {
    points?: number[];
    onChange?: (value: number[]) => void;
    title?: string;
    min?: number;
    max?: number;
    unit?: string;
    disabled?: boolean;
}
