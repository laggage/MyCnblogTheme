import './catalog.less';
import { isDetailPage } from './../utils';

const getCatalog = () => {
  return document.querySelector("body>#catalog") as HTMLElement;
};

const getToolbar = () => {
  return document.querySelector('#catalogToggleBtn');
}

const catalogStartTag = 'h2';

const getTotalOffsetLeft = (element) => {
  let p = element;
  let left = 0;
  while (p) {
    left += p.offsetLeft;
    p = p.offsetParent;
  }
  return left;
}

const resizeCatalog = () => {
  if (!isDetailPage()) return;

  let catalog = getCatalog();
  const topics = document.getElementById('topics');
  let offsetTop = 0;
  setTimeout(() => {
    offsetTop = topics.offsetTop;
    if (window.scrollY > offsetTop) {
      catalog.style.top = '32px';
    } else if (window.scrollY >= 0 && window.scrollY < offsetTop) {
      catalog.style.top = `${offsetTop - window.scrollY}px`;
    }
    catalog.style.display = 'block';
    catalog.style.left = topics.offsetLeft + topics.clientWidth + 20 +'px';
  }, document.getElementById('topics').offsetTop < 100 ? 500 : 0);
  document.addEventListener('scroll', () => {
    if (window.scrollY > offsetTop && catalog.offsetTop !== 32) {
      catalog.style.top = '32px';
    } else if (window.scrollY > 0 && window.scrollY < offsetTop) {
      catalog.style.top = `${offsetTop - window.scrollY}px`;
    }
  })
};

export const buildCatalog = () => {
  $(() => {
    if (isDetailPage()) {
      let details = document.querySelector("#post_detail .postBody");
      if (details == null || details == undefined) setTimeout(buildCatalog);
      else {
        let li = new Array();
        let tags = ["h1", "h2", "h3", "h4", "h5", "h6"];
        let startIndex = tags.findIndex(
          (x) => x === catalogStartTag
        );
        tags.splice(0, startIndex);
        let tagEles = details.querySelectorAll(tags.join(","));
        let location = window.location.pathname;
        tagEles.forEach((x) => {
          let tab = Number(x.tagName[1]) - startIndex - 1;
          li.push(
            `<li><a style="display: inline-block;margin: auto ${
              tab * Number.parseInt((1.0).toFixed(2))
            }rem;" href="${location}#${x.id}">${x.textContent.trim()}</a></li>`
          );
        });
        let html = `<div id="catalog"><h1>本文目录</h1><ul>${li.join(
          ""
        )}</ul></div>`;
        $('body').append(html);
        resizeCatalog();
  
        let calCatalogLeft = () => {
          let topic = document.querySelector("#topics");
          return getTotalOffsetLeft(topic) + topic.clientWidth + 20 + "px";
        };
        //console.log(this.catalog);
        let scrollHandler = () => {
          let catalog = getCatalog();
          if (
            window.pageYOffset > 165 &&
            !catalog.classList?.contains("catalog-fixed")
          ) {
            catalog.classList?.add("catalog-fixed");
            catalog.style.left = calCatalogLeft();
          } else if (
            window.pageYOffset <= 165 &&
            catalog.classList?.contains("catalog-fixed")
          ) {
            catalog.classList?.remove("catalog-fixed");
          }
        };
        let onResize = () => {
          let catalog = getCatalog();
          let toolBar = getToolbar();
          if (window.innerWidth < 768) {
            window.onscroll = () => {};
            catalog.classList?.add("catalog-fixed");
            catalog.classList?.add("catalog-btn-hide");
            toolBar.classList?.add("catalog-btn-show");
            toolBar.classList?.remove("catalog-btn-hide");
          } else {
            catalog.classList?.remove("catalog-btn-hide");
            catalog.classList?.add("catalog-btn-show");
            catalog.style.top = "";
            catalog.style.left = calCatalogLeft();
            // catalog.classList.add('catalog-fixed');
            window.onscroll = scrollHandler;
            toolBar.classList?.add("catalog-btn-hide");
            toolBar.classList?.remove("catalog-btn-show");
          }
        };
        onResize();
        window.onscroll = scrollHandler;
        window.onresize = onResize;
      }
    }
  })
};
