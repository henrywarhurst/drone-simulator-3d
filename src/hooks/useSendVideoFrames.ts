import { useEffect } from "react";

const MILLIS_PER_SECOND = 1000;
const FPS = 30;

export function useSendVideoFrames(
    canvasRef: React.RefObject<HTMLCanvasElement>
) {
    useEffect(() => {
        const interval = setInterval(() => {
            if (!canvasRef.current) return;
            canvasRef.current.toBlob((blob) => {
                if (blob == null) return;

                // Send this blob to the server
                const formData = new FormData();
                formData.append("frame", blob);
                fetch("YOUR_SERVER_ENDPOINT", {
                    method: "POST",
                    body: formData,
                });
            });
        }, MILLIS_PER_SECOND / FPS); // Capture 30 frames per second

        return () => clearInterval(interval);
    }, [canvasRef]);
}
