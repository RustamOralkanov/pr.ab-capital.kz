import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { type CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

interface FavoriteIconProps extends Partial<CustomIconComponentProps> {
    onClick?: () => void;
    active?: boolean;
}

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({ onClick, active, ...props }) => (
    <div onClick={onClick}>{active ? <HeartFilled {...props} /> : <HeartOutlined {...props} />}</div>
);
