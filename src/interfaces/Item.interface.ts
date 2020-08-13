export interface Track {
    item: Item;
    is_playing: string;
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
}
