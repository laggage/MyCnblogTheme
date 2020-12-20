import { buildCatalog } from './catalog';
import './index.less';
import "./post-body/index";
import { buildPostBody } from "./post-body/index";

export class PostDetailBuilder {
  build = () => {
    buildPostBody();
    buildCatalog();
  };
}
