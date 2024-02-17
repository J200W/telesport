// TODO: Create an interface for the dataCountry model

export default interface serie {
    name: string;
    series: Array<{
        name: string;
        value: number;
    }>;
}
