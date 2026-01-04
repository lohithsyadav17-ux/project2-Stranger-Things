/**
 * Interface representing a character in the Stranger Things universe.
 */
export interface Character {
    id: string;
    name: string;
    role: string;
    image: string;
    description: string;
    powers: string[];
    quote: string;
}

/**
 * Interface representing an episode of the show.
 */
export interface Episode {
    number: number;
    title: string;
    duration: string;
    description: string;
}

/**
 * Interface representing a season of the show.
 */
export interface Season {
    title: string;
    releaseDate: string;
    episodes: Episode[];
}

/**
 * Interface representing the organized episode data structure.
 */
export interface EpisodeData {
    [key: string]: Season;
}
