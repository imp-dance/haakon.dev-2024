declare global {
  var Prism: Prism;
}

declare module "markdown-it-highlight-lines" {
  import { PluginSimple } from "markdown-it";
  declare const highlightLinesPlugin: PluginSimple;
  export default highlightLinesPlugin;
}
