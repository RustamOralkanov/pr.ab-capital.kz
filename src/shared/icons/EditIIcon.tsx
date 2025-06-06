import Icon, { type CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const EditSvg = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: "pointer" }}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.614 2.89131C12.4968 2.7741 12.3378 2.70825 12.1721 2.70825C12.0063 2.70825 11.8474 2.7741 11.7301 2.89131L4.06982 10.5516C3.9913 10.6302 3.93511 10.7282 3.90705 10.8356L3.07372 14.026C3.01764 14.2407 3.07959 14.469 3.23649 14.6259C3.39338 14.7828 3.6217 14.8447 3.83638 14.7886L7.02674 13.9553C7.13418 13.9272 7.2322 13.8711 7.31072 13.7925L14.971 6.13222C15.2151 5.88814 15.2151 5.49241 14.971 5.24833L12.614 2.89131ZM5.07361 11.3156L12.1721 4.21714L13.6452 5.69027L6.54675 12.7887L4.55278 13.3096L5.07361 11.3156Z"
            fill="#838383"
        />
        <path
            d="M3.33325 16.0416C2.98807 16.0416 2.70825 16.3214 2.70825 16.6666C2.70825 17.0118 2.98807 17.2916 3.33325 17.2916H15.8333C16.1784 17.2916 16.4583 17.0118 16.4583 16.6666C16.4583 16.3214 16.1784 16.0416 15.8333 16.0416H3.33325Z"
            fill="#838383"
        />
    </svg>
);

export const EditIcon = (props: Partial<CustomIconComponentProps> & { onClick?: () => void }) => <Icon component={EditSvg} {...props} />;
