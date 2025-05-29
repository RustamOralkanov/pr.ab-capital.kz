import Icon, {
    CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const PlaygroundSvg = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_32_10884)">
            <path
                d="M23 8V10H19V0H18V2H15V0H14V2H10V0H9V2H6V0H5V10H1V8H0V21.5C0 22.879 1.122 24 2.5 24H9V18C9 16.346 10.346 15 12 15C13.654 15 15 16.346 15 18V24H21.5C22.878 24 24 22.879 24 21.5V8H23ZM6 3H18V10H14V7C14 5.897 13.103 5 12 5C10.897 5 10 5.897 10 7V10H6V3ZM13 10H11V7C11.0115 6.74252 11.1219 6.49941 11.3082 6.32128C11.4945 6.14315 11.7423 6.04373 12 6.04373C12.2577 6.04373 12.5055 6.14315 12.6918 6.32128C12.8781 6.49941 12.9885 6.74252 13 7V10ZM21.5 23H16V18C16 15.794 14.206 14 12 14C9.794 14 8 15.794 8 18V23H2.5C1.673 23 1 22.327 1 21.5V11H23V21.5C23 22.327 22.327 23 21.5 23Z"
                fill="currentColor"
            />
        </g>
        <defs>
            <clipPath id="clip0_32_10884">
                <rect width="24" height="24" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export const PlaygroundIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={PlaygroundSvg} {...props} />
);
