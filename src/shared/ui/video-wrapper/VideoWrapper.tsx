interface VideoWrapperProps {
    link: string;
    file: string;
}

export const VideoWrapper: React.FC<VideoWrapperProps> = ({ link, file }) => {
    if (link && !file)
        return (
            <iframe
                width="100%"
                height="100%"
                src={link}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        );

    if (link || file)
        return (
            <video controls className="w-full h-full object-cover">
                <source src={file} type="video/mp4" />
            </video>
        );
};
