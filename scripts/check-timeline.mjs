import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const entryMatch = html.match(/src="\/lure_for_fitness\/(assets\/[^\"]+\.js)"/);

if (!entryMatch) {
  throw new Error("index.html 中未找到游戏脚本入口");
}

const entryPath = path.join(root, entryMatch[1]);
const source = fs.readFileSync(entryPath, "utf8");

const required = [
  "2024-11-02 20:10",
  "2024年10月31日",
  "08-09 14:30",
  "09-18 09:15",
  "10-25 20:45",
  "团课后的变化",
  "2024-10-30",
  "9 月 12 日 星期四",
  "10 月 20 日 星期日",
  "今天 19:30",
  '["室友","学妹","吕健","秦妙妙","文件传输助手"]',
  '"2个月前",frequency:"每周1次",duration:"60分钟",intensity:"中强度"',
];

const forbidden = [
  "2025-10-30 22:30",
  "2024年11月15日",
  "2024-11-28",
  "2023-12-01",
  "9 月 12 日 星期二",
  "10 月 20 日 星期五",
  "今天 21:30",
  '"2个月前",frequency:"每周1次",duration:"3小时",intensity:"高强度"',
];

const protectedAnchors = [
  "2024年7月21日",
  "2024年3月30日",
  "生日照片",
  "2024-03-30",
  "040721",
];

for (const value of [...required, ...protectedAnchors]) {
  if (!source.includes(value)) {
    throw new Error(`缺少必要时间线或谜题锚点：${value}`);
  }
}

for (const value of forbidden) {
  if (source.includes(value)) {
    throw new Error(`仍存在冲突时间：${value}`);
  }
}

console.log(`时间线检查通过：${path.relative(root, entryPath)}`);
