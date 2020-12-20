export class Utils {
  static get postBodyEl() {
    return $('.postBody');
  }
}

export const isDetailPage = () => {
  return $('.postBody').length > 0;
}

/**
 * 从外部加载指定脚本
 * @param tagId 脚本标签选择器
 * @param src 脚本来源
 */
export const loadExternalScript = (tagId: string, src: string) => {
  if (!document.head.querySelector('#' + tagId)) {
      return dynamicLoadResource(() => {
          const script = document.createElement('script');
          script.id = tagId;
          script.src = src;
          script.async = true;
          return script;
      });
  } else {
      return Promise.resolve('loaded');
  }
};

/**
* 加载外部样式文件
* @param tagId
* @param href
*/
export const loadExternalCss = (tagId: string, href: string) => {
  if (!document.head.querySelector('#' + tagId)) {
      return dynamicLoadResource(() => {
          const link = document.createElement('link');
          link.id = tagId;
          link.rel = 'stylesheet';
          link.href = href;
          return link;
      });
  } else {
      return Promise.resolve('loaded');
  }
};

export const dynamicLoadResource = <T extends HTMLElement>(creation: () => T) => {
  return new Promise((resolve, reject) => {
      const el = creation();
      if (el === null) {
          resolve('');
          return;
      }
      el.onload = (e) => {
          resolve('loaded');
      };
      el.onerror = (e) => {
          reject(e);
      };
      document.head.appendChild(el);
  });
};

