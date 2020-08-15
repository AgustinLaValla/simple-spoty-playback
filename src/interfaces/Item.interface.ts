export interface Track {
    track_window: TrackWindow;
    paused: boolean;
    position: number;
    duration: number;
}


export interface TrackWindow {
    current_track: {
        album: {
            images: { url: string, name?: string }[]
        };
        name: string;
        artists: { name: string }[];
        duration_ms: 0;
    }
}
