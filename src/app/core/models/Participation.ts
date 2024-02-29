/**
 * Interface représentant la participation d'un pays aux Jeux olympiques.
 *
 * Cette interface définit la structure des données pour la participation d'un pays à une édition spécifique des Jeux olympiques.
 * Elle inclut l'identifiant unique, l'année des Jeux olympiques, la ville hôte, le nombre de médailles remportées et le nombre d'athlètes.
 *
 * @example
 * ```
 * const participationData: participation = {
 *   id: 1,
 *   year: 2020,
 *   city: 'Tokyo',
 *   medalsCount: 39,
 *   athleteCount: 613,
 * };
 * ```

 */
export default interface participation {
    /**
     * L'identifiant unique de la participation.
     */
    id: number;

    /**
     * L'année des Jeux olympiques.
     */
    year: number;

    /**
     * La ville hôte des Jeux olympiques.
     */
    city: string;

    /**
     * Le nombre total de médailles remportées par le pays pendant ces Jeux olympiques.
     */
    medalsCount: number;

    /**
     * Le nombre d'athlètes représentant le pays lors de ces Jeux olympiques.
     */
    athleteCount: number;
}
