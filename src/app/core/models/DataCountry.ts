/**
 * Interface représentant les données d'un pays pour les Jeux olympiques.
 *
 * Cette interface définit la structure des données relatives à un pays, notamment le nombre de participations, le nombre de médailles
 * et le nombre d'athlètes pour les Jeux olympiques.
 *
 * @example
 * ```
 * const countryData: dataCountry = {
 *   numberOfParticipations: 5,
 *   numberOfMedals: 10,
 *   numberOfAthletes: 50,
 * };
 * ```
 *
 */
export default interface dataCountry {
    /**
     * Le nombre total de participations du pays aux Jeux olympiques.
     */
    numberOfParticipations: number;

    /**
     * Le nombre total de médailles remportées par le pays aux Jeux olympiques.
     */
    numberOfMedals: number;

    /**
     * Le nombre total d'athlètes représentant le pays aux Jeux olympiques.
     */
    numberOfAthletes: number;
}
