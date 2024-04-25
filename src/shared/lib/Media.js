class Media {
  constructor() {
    this.mediaStream = null;
    this.displayStream = null;
  }

  createMediaStream(videoTrack, audioTrack) {
    const stream = new MediaStream();
    videoTrack.forEach((track) => stream.addTrack(track));
    audioTrack.forEach((track) => stream.addTrack(track));
    return stream;
  }

  async getVideoStream(cb) {
    return await navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: {
          echoCancellation: true,
        },
      })
      .then((stream) => {
        cb(null, stream);
        return stream;
      })
      .catch((reason) => {
        cb(reason, null);
        return null;
      });
  }

  async getDisplayStream(cb) {
    return await navigator.mediaDevices
      .getDisplayMedia({
        video: { width: 1280, height: 720 },
      })
      .then((stream) => {
        cb(null, stream);
        return stream;
      })
      .catch((reason) => {
        cb(reason, null);
        return null;
      });
  }
}

export default Media;
