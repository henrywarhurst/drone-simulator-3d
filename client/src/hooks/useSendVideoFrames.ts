import { useEffect, useRef } from "react";

const ENDPOINT = "ws://localhost:8080";
const MILLIS_PER_SECOND = 1000;
const FPS = 15;

export function useSendVideoFrames(
    canvasRef: React.RefObject<HTMLCanvasElement>
) {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket(ENDPOINT);

        socketRef.current.onopen = () => {
            console.log("WebSocket connection established");
        };

        const interval = setInterval(() => {
            if (
                !canvasRef.current ||
                socketRef.current?.readyState !== WebSocket.OPEN
            )
                return;

            canvasRef.current.toBlob((blob) => {
                if (!blob) return;

                const reader = new FileReader();
                reader.onload = () => {
                    const arrayBuffer = reader.result;
                    if (arrayBuffer && socketRef.current) {
                        socketRef.current.send(arrayBuffer);
                    }
                };
                reader.readAsArrayBuffer(blob);
            });
        }, MILLIS_PER_SECOND / FPS);

        return () => {
            clearInterval(interval);
            socketRef.current?.close();
        };
    }, [canvasRef]);

    return socketRef;
}
