import "csstype";
declare module "markdown-it-highlight-lines" {
  import { PluginSimple } from "markdown-it";
  declare const highlightLinesPlugin: PluginSimple;
  export default highlightLinesPlugin;
}
declare module "csstype" {
  interface Properties {
    [index: `--${string}`]: string | number;
  }
}
