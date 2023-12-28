import * as fs from "fs";
import * as path from "path";

export const readFileFrom = directory => filename => {
    const filepath = path.join(directory, filename);
    return fs.readFileSync(filepath).toString("utf8");
}
