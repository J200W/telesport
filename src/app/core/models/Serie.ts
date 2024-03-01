/**
 * Interface représentant une série de données.
 *
 * Cette interface définit la structure des données pour une série dans le graphique détaillé d'un pays.
 * Chaque élément de série est représenté par un objet contenant un nom et une valeur.
 *
 * @example
 * ```
 * const serieData: serie = {
 *   name: 'CountryName',
 *   series: [
 *     { name: '2020', value: 10 },
 *     { name: '2016', value: 15 },
 *   ],
 * };
 * ```
 * 
 */
export default interface serie {
    /**
     * Le nom de la série.
     */
    name: string;

    /**
     * Un tableau d'éléments de série représentant les données associées à cette série.
     * Chaque élément contient un nom et une valeur.
     */
    series: Array<{
        /**
         * Le nom de l'élément de série.
         */
        name: string;

        /**
         * La valeur associée à l'élément de série.
         */
        value: number;
    }>;
}
