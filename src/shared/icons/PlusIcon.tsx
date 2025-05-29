import Icon, {
    CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const PlusSvg = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 17V7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M7 12L17 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

export const PlusIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={PlusSvg} {...props} />
);
