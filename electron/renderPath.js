import { app } from "electron";
import { join, resolve } from "path";

const basePath = app.getAppPath();
const isPackaged = app.isPackaged;

let addProjectPath = "http://localhost:5173/addproject";
let mainPath = "http://localhost:5173";

if (isPackaged) {
  addProjectPath = join(basePath, "dist", "render", "addproject", "index.html");
  mainPath = join(basePath, "dist", "render", "index.html");
}
export { addProjectPath, mainPath };
