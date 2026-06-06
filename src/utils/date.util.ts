/**
 * Vérifie si une date est à moins de 30 minutes de la date actuelle.
 * @param date - La date à comparer avec la date actuelle.
 * @returns `true` si la date est à moins de 30 minutes (dans le passé ou le futur) de la date actuelle, `false` sinon.
 */
export function lessThan30min(date: Date): boolean {
  const now = new Date();
  const timeDiffMs = now.getTime() - date.getTime(); // Différence en millisecondes
  const timeDiffMin = timeDiffMs / (1000 * 60); // Conversion en minutes
  return Math.abs(timeDiffMin) < 30;
}