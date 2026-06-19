export function playAudio(url: string) {
  const audio = new Audio(url);
  audio.play();
}

export function stopAudio() {
  // No global audio handle; each component will stop its own instance.
}
