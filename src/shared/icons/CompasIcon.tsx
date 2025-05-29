import Icon, {
    CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const CompasSvg = () => (
    <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4.99463C7.99594 4.99463 4.75 8.24056 4.75 12.2446C4.75 16.2487 7.99594 19.4946 12 19.4946C16.0041 19.4946 19.25 16.2487 19.25 12.2446C19.25 8.24056 16.0041 4.99463 12 4.99463ZM3.25 12.2446C3.25 7.41214 7.16751 3.49463 12 3.49463C16.8325 3.49463 20.75 7.41214 20.75 12.2446C20.75 17.0771 16.8325 20.9946 12 20.9946C7.16751 20.9946 3.25 17.0771 3.25 12.2446Z"
            fill="currentColor"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.8498 9.55338C9.91622 10.3214 9.29253 11.4017 9.09417 12.5942L8.65623 15.227C8.42881 16.5942 10.0186 17.5121 11.0889 16.6315L13.15 14.9358C14.0836 14.1678 14.7073 13.0875 14.9056 11.895L15.3436 9.26219C15.571 7.89498 13.9813 6.97714 12.9109 7.8577L10.8498 9.55338ZM12 10.7446C11.1716 10.7446 10.5 11.4162 10.5 12.2446C10.5 13.0731 11.1716 13.7446 12 13.7446C12.8284 13.7446 13.5 13.0731 13.5 12.2446C13.5 11.4162 12.8284 10.7446 12 10.7446Z"
            fill="currentColor"
        />
    </svg>
);

export const CompasIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CompasSvg} {...props} />
);
