export function formatSecondsToHoursAndMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  if (hours) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

export function getHoursAndMinutesFromSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);

  return { hours, minutes };
}
