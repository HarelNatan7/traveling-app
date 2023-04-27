export interface ApiCountry {
    flags: ApiFlags[];
    name: ApiNames[];
}

interface ApiFlags {
    svg: string[]
}

interface ApiNames {
    official: string[]
}