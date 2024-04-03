declare module "*.less" {
  const src: string;
  export default src;
}
// window上添加electron_view属性
interface Window {
  electron_view: {
    close: () => void;
    minimize: () => void;
    reStart: () => void;
  };
  electron_utils: {
    chooseFolder: () => Promise<string[]>;
    loadProject: (path: string) => Promise<Record<string, any>>;
    openFolder: (path: string) => void;
    openTerminal: (path: string) => void;
    openVscode: (path: string) => void;
    onMessage: (cb: (msg: string) => void) => void;
    openDevTools: () => void;
    loadImgs: (data: { path: string; suffix: string }) => Promise<string[]>;
    openDevTools: () => void;
    openDev: () => void;
  };
}