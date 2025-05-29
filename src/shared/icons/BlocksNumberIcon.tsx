import Icon, {
    CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const BlocksNumberSvg = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_32_10890)">
            <path
                d="M13 18H12V7.641L9.559 10.149L8.842 9.452L12.202 6.001H13V18ZM24 12C24 5.383 18.617 0 12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12ZM23 12C23 18.065 18.065 23 12 23C5.935 23 1 18.065 1 12C1 5.935 5.935 1 12 1C18.065 1 23 5.935 23 12Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_32_10890">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export const BlocksNumberIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={BlocksNumberSvg} {...props} />
);
