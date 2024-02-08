// TODO: create here a typescript interface for an olympic country

import participation from "./Participation";

export default interface country {
    id: number;
    country: string;
    participations: Array<participation>;
}
