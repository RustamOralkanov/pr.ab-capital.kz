interface DocumentWithFullscreen extends Document {
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    mozExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
}

interface HTMLElementWithFullscreen extends HTMLElement {
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
}

export const useFullScreen = () => {
    const handleFullscreen = () => {
        const doc = document as DocumentWithFullscreen;
        const element = document.documentElement as HTMLElementWithFullscreen;

        if (doc.fullscreenElement || doc.fullscreenElement || doc.fullscreenElement || doc.fullscreenElement) {
            if (doc.exitFullscreen) {
                doc.exitFullscreen().catch((err) => console.error(err));
            } else if (doc.mozExitFullscreen) {
                doc.mozExitFullscreen().catch((err) => console.error(err));
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen().catch((err) => console.error(err));
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen().catch((err) => console.error(err));
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen().catch((err) => console.error(err));
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen().catch((err) => console.error(err));
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen().catch((err) => console.error(err));
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen().catch((err) => console.error(err));
            }
        }
    };

    return {
        handleFullscreen,
    };
};
