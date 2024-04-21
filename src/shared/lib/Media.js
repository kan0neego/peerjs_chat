class Media {
  constructor() {
    this.mediaStream = null;
    this.displayStream = null;
  }

  getVideoStream(cb) {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      })
      .then((stream) => {
        this.mediaStream = stream;
        cb(null, stream);
      })
      .catch((reason) => {
        cb(reason, null);
      });
  }

  getDisplayStream(cb) {
    navigator.mediaDevices
      .getDisplayMedia()
      .then((stream) => {
        this.displayStream = stream;
        cb(null, stream);
      })
      .catch((reason) => {
        cb(reason, null);
      });
  }
}

export default Media;
