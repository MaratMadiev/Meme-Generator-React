import { FabricImage } from "fabric";
import type { ImageSource } from "fabric/node";
import { giphyApi } from "./Giphy/GiphyAPI";
import { decodeFrames } from "modern-gif";

interface FabricGifProps {
  sources: ImageSource[];
  frameDuration: number;
  top: number;
  left: number;
}

export default class FabricGif extends FabricImage {
  private loadedImages: ImageSource[] = [];
  private lastFrameChangedTime = 0;
  private currentFrame = 0;
  private frameDuration = 100;
  private paused = false;
  private animationFrameId: number | null = null;

  constructor(props: FabricGifProps) {
    super(props.sources[0], {
      top: props.top,
      left: props.left,
    });
    this.frameDuration = props.frameDuration;
    this.loadedImages = props.sources;
  }

  static async fromUrl(urlGif: string) {
    try {
      const buffer = await giphyApi.getGifAsArrayBuffer(urlGif);
      const frames = decodeFrames(buffer);

      const canvases: HTMLCanvasElement[] = [];

      let delay = 100;
      frames.forEach((frame) => {
        const canvas = document.createElement("canvas");
        canvas.width = frame.width;
        canvas.height = frame.height;
        const data = frame.data as Uint8ClampedArray<ArrayBuffer>;
        const id = new ImageData(data, frame.width, frame.height);
        canvas.getContext('2d')?.putImageData(id,0,0);
        canvases.push(canvas);

        delay = frame.delay;
      });

      const res = new FabricGif({
        frameDuration: delay,
        sources: canvases,
        left: 0,
        top: 0,
      });

      return res;
    } catch (error) {
      console.error("Ошибка парсинга GIF:", error);
      throw error;
    }
  }

  private nextFrame() {
    if (!this.loadedImages) return;

    this.currentFrame = (this.currentFrame + 1) % this.loadedImages.length;

    const imgElement = this.loadedImages[this.currentFrame];

    this.setElement(imgElement, {});
    this.canvas?.renderAll();
    this.lastFrameChangedTime = performance.now();
  }

  tryNextFrame() {
    if (!this.loadedImages) return;
    if (performance.now() - this.lastFrameChangedTime < this.frameDuration)
      return;

    this.nextFrame();
  }

  loopPlay = () => {
    if (this.paused || !this.loadedImages || !this.loadedImages.length) {
      return;
    }

    this.tryNextFrame();

    this.animationFrameId = requestAnimationFrame(this.loopPlay);
  };

  pause() {
    this.paused = true;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  setSourceFromTime(time: number) {
    if (this.animationFrameId) this.stop();

    const index =
      Math.floor(time / this.frameDuration) % this.loadedImages.length;
    this.setElement(this.loadedImages[index], {});
    this.currentFrame = index;
  }

  play() {
    if (this.paused) {
      this.paused = false;

      if (!this.animationFrameId) {
        this.lastFrameChangedTime = performance.now();
        this.loopPlay();
      }
    }
  }

  stop() {
    this.pause();
    this.currentFrame = 0;
    if (this.loadedImages[0]) {
      this.setElement(this.loadedImages[0], {});
      this.canvas?.renderAll();
    }
  }

  dispose() {
    this.stop();
    this.loadedImages = [];
  }

  get type(): string {
    return 'gif'
  }
}
