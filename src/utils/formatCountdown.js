export const formatCountdown = (countdown) => {
  const minutesDivisor = countdown % (60 * 60);
  const secondsDivisor = minutesDivisor % 60;

  const minutes = Math.floor(minutesDivisor / 60);
  const seconds = Math.ceil(secondsDivisor);

  return `${minutes}:${seconds >= 10 ? seconds : `0${seconds}`}`;
};
