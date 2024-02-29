import participation from "./Participation";

export default interface country {
    id: number;
    country: string;
    participations: Array<participation>;
}
