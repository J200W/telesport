import country from './Olympic';

/**
 * Interface représentant la réponse des données olympiques.
 *
 * Cette interface définit la structure des données pour la réponse des données olympiques, comprenant le statut de la réponse
 * (par exemple, "success" ou "error") et un tableau de pays représentés par l'interface `country`.
 *
 * @example
 * ```
 * const responseData: response = {
 *   status: 'success',
 *   data: [
 *     { id: 1, country: 'USA', participations: [...] },
 *     { id: 2, country: 'Japan', participations: [...] },
 *   ],
 * };
 * ```
 * 
 */

export default interface response {
    /**
     * Le statut de la réponse des données olympiques.
     * Peut être "success" en cas de succès ou "error" en cas d'erreur.
     */
    status: string;

    /**
     * Un tableau de pays représentant les données olympiques.
     */
    data: Array<country>;
}
