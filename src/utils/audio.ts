export const playAudio = (src: string) => {
  const audio = new Audio(`/audios/${src}`);
  audio.volume = 0.15;
  audio.play().catch(() => {
    // Can't play audio
  });
};
