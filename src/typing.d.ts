declare module "*.less" {
  const src: string;
  export default src;
}
interface Electron_Utils {
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
  openAddProject: () => void;
  closeAddProject: () => void;
  reloadMainWindow: () => void;
  startProcessOutSide: (data: any) => void;
}
// window上添加electron_view属性
interface Window {
  electron_view: {
    close: () => void;
    minimize: () => void;
    reStart: () => void;
  };
  electron_utils: Electron_Utils;
}
interface startProcessOutSideParams {
  cwd: string; // 项目路径
  projectName: string; // 项目名称
  scriptName: string; // 脚本名称
  command: string; // 脚本命令 vite dev ....
  type: string; // 脚本类型 scripts shell 
  nodePackageTools: string; // node包管理工具 pnpm yarn npm cnpm
}
interface settings {
  animationCustom: boolean;
  animationPath: string;
  animationSuffix: string;
  bgCustom: boolean;
  bgPath: string;
  bgSuffix: string;
  nodePackageTools: string;
}