export class GameLoop {
  private onStep: () => void;
  private rafCallback: number | null;
    hasStopped: any ;
  constructor(onStep: () => void) {
    // onStep -> a callback fire on every single frame
    this.onStep = onStep;
    this.rafCallback = null;
    this.hasStopped = false;
    this.start();
  }

  start() {
    let previousMs: number | undefined;
    const step = 1 / 60;
    const tick = (timestampMs: number) => {
        if (this.hasStopped) {
            return; // 停止时退出循环
        }

        if (previousMs === undefined) {
            previousMs = timestampMs;
        }
        let delta = (timestampMs - previousMs) / 1000;
        while (delta >= step) {
            this.onStep(); // 游戏逻辑更新
            delta -= step;
        }
        previousMs = timestampMs - delta * 1000;

        // 记录当前的动画帧回调
        this.rafCallback = requestAnimationFrame(tick);
    };

    // 确保 start 之前已清理
    this.stop(); // 防止多次启动导致重复动画帧
    this.hasStopped = false; // 标记状态为运行中
    this.rafCallback = requestAnimationFrame(tick); // 启动动画帧
}

stop() {
    this.hasStopped = true; // 标记状态为停止
    if (this.rafCallback !== null) {
        cancelAnimationFrame(this.rafCallback); // 停止动画帧
        this.rafCallback = null; // 清空回调引用
    }
}

}
