import Icon, {
    CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const ArrowSvg = () => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: "pointer" }}
    >
        <path
            d="M1.58498 12L9.7585 3.82648V11.2075H12V0H0.792491V2.2415H8.17352L0 10.415L1.58498 12Z"
            fill="#C9D645"
        />
    </svg>
);

export const ArrowIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ArrowSvg} {...props} />
);
