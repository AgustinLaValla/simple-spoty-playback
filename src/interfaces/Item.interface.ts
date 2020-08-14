export interface Track {
    item: Item;
    is_playing: boolean;
    progress_ms: number;
    no_data: boolean;
}


export interface Item {
    album: {
        images: { url: string }[]
    };
    name: string;
    artists: { name: string }[];
    duration_ms: 0;
    track_number:number;
}
