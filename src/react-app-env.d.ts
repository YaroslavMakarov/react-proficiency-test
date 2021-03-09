// / <reference types="react-scripts" />
interface Location {
    name: string;
    url: string;
}

interface Origin {
    name: string;
    url: string;
}

interface Character {
    creacted: string;
    episode: Array<string>;
    id: number;
    image: string;
    location: Location;
    name: string;
    origin: Origin;
    species: string;
    status: string;
    type: string;
    url: string;
    gender: string;
}
