import Icon, { type CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const CheckSvg = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_27_9684)">
            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 6.99997L19.59 5.58997L9 16.17Z" fill="#1D1D1D" />
        </g>
        <defs>
            <clipPath id="clip0_27_9684">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export const CheckIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={CheckSvg} {...props} />;
