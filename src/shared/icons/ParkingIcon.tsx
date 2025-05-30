import Icon, { type CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ParkingSvg = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_32_10851)">
            <path
                d="M12 0C5.383 0 0 5.383 0 12C0 18.617 5.383 24 12 24C18.617 24 24 18.617 24 12C24 5.383 18.617 0 12 0ZM12 23C5.935 23 1 18.065 1 12C1 5.935 5.935 1 12 1C18.065 1 23 5.935 23 12C23 18.065 18.065 23 12 23ZM13.5 5H9.5C8.8372 5.00079 8.20178 5.26444 7.73311 5.73311C7.26444 6.20178 7.00079 6.8372 7 7.5V19H8V14H13.5C15.981 14 18 11.981 18 9.5C18 7.019 15.981 5 13.5 5ZM13.5 13H8V7.5C8 6.673 8.673 6 9.5 6H13.5C15.43 6 17 7.57 17 9.5C17 11.43 15.43 13 13.5 13Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_32_10851">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export const ParkingIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={ParkingSvg} {...props} />;
