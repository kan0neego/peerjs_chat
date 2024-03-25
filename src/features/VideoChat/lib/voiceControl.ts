function switchVoice(stream: MediaStream) {
  const turnOn = stream.getAudioTracks()[0].enabled;
  stream.getAudioTracks()[0].enabled = !turnOn;

  return !turnOn;
}

export { switchVoice };
