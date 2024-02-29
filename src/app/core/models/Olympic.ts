/**
 * Interface représentant un pays aux Jeux olympiques.
 *
 * Cette interface définit la structure des données pour un pays, comprenant son identifiant, son nom et un tableau de participations.
 * Chaque participation est représentée par l'interface `participation`.
 *
 * @example
 * ```
 * const countryData: country = {
 *   id: 1,
 *   country: 'USA',
 *   participations: [
 *     { id: 1, year: 2020, city: 'Tokyo', medalsCount: 39, athleteCount: 613 },
 *     { id: 2, year: 2016, city: 'Rio de Janeiro', medalsCount: 46, athleteCount: 554 },
 *   ],
 * };
 * ```

 */
import participation from './Participation';

export default interface country {
    /**
     * L'identifiant unique du pays.
     */
    id: number;

    /**
     * Le nom du pays aux Jeux olympiques.
     */
    country: string;

    /**
     * Un tableau de participations représentant les performances du pays aux différents Jeux olympiques.
     */
    participations: Array<participation>;
}
