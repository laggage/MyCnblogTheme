import { isDetailPage, loadExternalScript } from "./../../utils";
import { Utils } from "../../utils";
import "./index.less";
declare var hljs: any;

export const buildPostBody = () => {
  if (isDetailPage()) {
    Utils.postBodyEl.addClass("markdown-body");
    loadExternalScript(
      "hljs",
      "https://files.cnblogs.com/files/Laggage/highlight.min.js"
    ).then(() => {
      hljs.initHighlightingOnLoad();
    });
    loadExternalScript(
      "hljs-line-number",
      "https://blog-static.cnblogs.com/files/Laggage/highlightjs-line-numbers.min.js"
    ).then(() => {
      hljs.initLineNumbersOnLoad();
    });
  }
};
