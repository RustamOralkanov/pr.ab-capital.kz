import Icon, { type CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const PlaySvg = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19.266 13.5162C20.2579 12.7487 20.2579 11.2513 19.266 10.4838C16.2685 8.1644 12.9213 6.33625 9.34974 5.06777L8.69727 4.83603C7.449 4.39269 6.13049 5.23725 5.9615 6.5258C5.48934 10.126 5.48934 13.874 5.9615 17.4742C6.13048 18.7628 7.449 19.6073 8.69727 19.164L9.34974 18.9322C12.9213 17.6638 16.2685 15.8356 19.266 13.5162Z"
            fill="currentColor"
        />
    </svg>
);

export const PlayIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={PlaySvg} {...props} />;
