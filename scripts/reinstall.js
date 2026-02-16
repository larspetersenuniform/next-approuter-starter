import { execSync } from "child_process";
import { rmSync } from "fs";

console.log("Removing node_modules...");
rmSync("node_modules", { recursive: true, force: true });

console.log("Running npm install...");
execSync("npm install", { stdio: "inherit" });

console.log("Done! All dependencies reinstalled.");
