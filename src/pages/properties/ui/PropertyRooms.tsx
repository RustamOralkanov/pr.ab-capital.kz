import { useState } from "react";

export const PropertyRooms: React.FC<{ rooms: string[]; onChange?: (value: string[]) => void }> = ({ rooms = [], onChange }) => {
    const [currentRoom, setCurrentRoom] = useState<string[]>([]);

    const handleRoom = (room: string) => {
        if (currentRoom.includes(room)) {
            const filteredRooms = currentRoom.filter((r) => r !== room);
            setCurrentRoom(filteredRooms);
            if (onChange) onChange(filteredRooms);
        } else {
            const rooms = [...currentRoom, room];
            setCurrentRoom(rooms);
            if (onChange) onChange(rooms);
        }
    };

    return (
        <div className="flex items-center gap-30">
            {rooms.map((room, index) => {
                return (
                    <div
                        className={[
                            currentRoom?.includes(room) ? "border-b-green" : "border-b-gray",
                            "w-full flex justify-center items-center h-60 cursor-pointer border-b-1 transition-all duration-300",
                        ].join(" ")}
                        key={index}
                        onClick={() => handleRoom(`${room}`)}
                    >
                        <span className={[currentRoom?.includes(room) ? "text-green" : "text-gray-2", "!font-semibold transition-all duration-300"].join(" ")}>{room}</span>
                    </div>
                );
            })}
        </div>
    );
};
