import { buildHeader } from './header/index';
import { buildScrollbar } from './scrollbar/index';
import { buildPager } from './pager';
import { PostDetailBuilder } from './post-detail/index';
import { buildSidebar } from './sidebar/index';

import './style.less';
import $ from 'jquery';

class PageBuilder {
  private options: any;
  constructor() {
    this.options = {
      avatarUrl: 'https://pic.cnblogs.com/avatar/1596066/20201124214721.png',
      catalogStartTag: 'h2',
    };
  }

  buildAvatar() {
    let avatar = `<span class="avatar"><img alt="avatar" src="${this.options.avatarUrl}"/></span>`;
    let blogTitle = document.querySelector(this.cnBlogs.blogTitle);
    if (blogTitle === undefined || blogTitle === null)
      setTimeout(this.buildAvatar, 1000);
    else blogTitle.innerHTML = avatar + blogTitle.innerHTML;
  }

  buildSign() {
    let h2 = $('#blogTitle>h2');
    let sign = $('#blogTitle>h2').text();
    h2.remove();
    let h1 = $('#blogTitle>h1').append(
      '<span class="sign">' + sign + '</span>'
    );
  }

  get isPostPage() {
    return /Laggage\/p\/\d{1,20}.html$/.test(window.location.pathname);
  }

  buildBlogPostCategory() {
    let postCategory = document.querySelector('#BlogPostCategory>a')
      ?.textContent;
    let postInfoEle = document.querySelector('.postInfo');
    if (
      postCategory == null ||
      postCategory == undefined ||
      postInfoEle == null ||
      postInfoEle == undefined
    )
      setTimeout(this.buildBlogPostCategory, 1000);
    else {
      let html = `<span class="postInfo-item icon text-muted">&#xe645;&nbsp;${postCategory}</span>`;
      postInfoEle.innerHTML += html;
    }
  }

  getTotalOffsetLeft(element) {
    let p = element;
    let left = 0;
    while (p) {
      left += p.offsetLeft;
      p = p.offsetParent;
    }
    return left;
  }

  getTotalOffsetTop(element) {
    let p = element;
    let top = 0;
    while (p) {
      top += p.offsetTop;
      p = p.offsetParent;
    }
    return top;
  }

  buildFixedToolBar() {
    let onCatalogClicked = () => {
      let catalog = this.catalog;
      let btn = document.querySelector('#catalogToggleBtn');
      catalog.classList?.add('catalog-fixed');
      if (catalog.classList?.contains('catalog-btn-hide')) {
        catalog.classList?.remove('catalog-btn-hide');
        catalog.classList?.add('catalog-btn-show');
        let top = this.getTotalOffsetTop(btn);
        let left = this.getTotalOffsetLeft(btn);

        catalog.style.top = top - catalog.clientHeight + 'px';
        catalog.style.left =
          left - catalog.clientWidth + btn.clientWidth + 'px';
      } else {
        catalog.classList?.add('catalog-btn-hide');
        catalog.classList?.remove('catalog-btn-show');
      }
    };
    let html =
      `<div id="fixed-toolbar"><a class="icon" href="#">&#xe862;</a>` +
      (this.isPostPage
        ? `<a id="catalogToggleBtn" href="javascript:void(0);" class="icon">&#xe614;</a>`
        : '') +
      `</div>`;
    document.body.innerHTML += html;
    if (this.isPostPage)
      document
        .querySelector('#catalogToggleBtn')
        .addEventListener('click', () => {
          onCatalogClicked();
        });
  }

  get catalog() {
    return document.querySelector('#catalog') as HTMLElement;
  }

  get toolBar() {
    return document.querySelector('#catalogToggleBtn');
  }

  build() {
    this.buildAvatar();
    this.buildBlogPostCategory();
    // this.buildFixedToolBar();
    this.buildSign();
  }

  get cnBlogs() {
    return {
      header: '#header',
      blogTitle: '#blogTitle',
      publicProfile: '#profile_block',
      navigator: '#navigator',
      navList: '#navList',
      sideBar: '#sideBar',
      sideBarMain: '#sideBarMain',
      forFlow: '.forFlow',
      postTitle: '#cb_post_title_url',
      postDetail: '#post_detail',
      postBody: '#cnblogs_post_body',
      postDigg: '#div_digg',
      postCommentBody: '.blog_comment_body',
      feedbackContent: '.feedbackItem > .feedbackCon',
      postSignature: '#MySignature',
      footer: '#footer',
    };
  }
}

$(() => {
  $('#mainContent').addClass('container-md');
})

main();
function main() {
  buildHeader();
  let build = new PageBuilder();
  build.build();
  new PostDetailBuilder().build();
  buildPager();
  buildSidebar();
  buildScrollbar();

  try {
    setCategry();
  } catch (e) {
    console.info('Custom js encouter an error when run setCategry method');
    console.error(e);
  }
  try {
    if (build.isPostPage) replacePostDesc();
  } catch (e) {
    console.info('Custom js encouter an error when run replacePostDate method');
    console.error(e);
  }
}

function getCommentCount() {
  return Number(
    document.querySelector('.postDesc #post_comment_count')?.textContent
  );
}

function getViewCount() {
  return Number(
    document.querySelector('.postDesc #post_view_count')?.textContent
  );
}

function getPostDate() {
  return new Date(document.querySelector('#post-date')?.textContent);
}

function replacePostDesc() {
  let postDate: Date | string = getPostDate();
  let viewCount = getViewCount();
  let commentCount = getCommentCount();

  if (postDate.getDate() === NaN || viewCount === NaN || commentCount === NaN)
    setTimeout(replacePostDesc, 1000);
  else {
    let div = document.createElement('div');
    div.classList?.add('postInfo');
    postDate =
      postDate.getFullYear() +
      '-' +
      postDate.getMonth() +
      '-' +
      postDate.getDate() +
      ' ' +
      postDate.getHours() +
      ':' +
      postDate.getMinutes();
    div.innerHTML =
      '<span class="postInfo-item">' +
      '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2738" width="16" height="16"><path fill="#8a8a8a" d="M512 0C228.92 0 0 228.92 0 512c0 282.358 228.92 512 512 512s512-228.92 512-512S794.358 0 512 0m174.037 706.257l-18.054 18.053c-10.11 10.11-25.997 10.11-36.107 0L465.783 558.217c-5.777-5.777-5.055-17.331-5.055-28.886V204.367c0-14.443 11.554-25.275 25.275-25.275h25.275c14.443 0 25.275 11.554 25.275 25.275v317.02L686.037 670.15c10.11 10.11 10.11 25.997 0 36.107m0 0z" p-id="2739"></path></svg>' +
      '<span class="text-muted"> ' +
      postDate +
      '</span></span>';
    let author =
      `<span class="postInfo-item">` +
      '<svg t="1592845358639" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4518" width="16" height="16"><path d="M727.744 606.976c124.288 78.976 210.688 217.664 222.464 378.496-43.52 5.888-120.896 12.288-231.296 12.288H263.168c-110.4 0-187.712-6.4-231.168-12.288 11.84-160.704 98.304-299.52 222.4-378.496 65.6 51.584 147.008 83.712 236.736 83.712 89.728 0 171.2-32 236.608-83.712zM491.136 0a307.392 307.392 0 0 1 307.072 307.008 307.456 307.456 0 0 1-307.072 306.944 307.328 307.328 0 0 1-307.008-306.944A307.392 307.392 0 0 1 491.136 0z" fill="#8a8a8a" p-id="4519"></path></svg>' +
      '<span class="text-muted"> ' +
      'laggage' +
      '</span></span>';
    let commentCountHtml =
      `<span class="postInfo-item">` +
      '<svg t="1592845935911" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10051" width="16" height="16"><path d="M512 64C229.2 64 0 250.2 0 480c0 99.2 42.8 190 114 261.4C89 842.2 5.4 932 4.4 933c-4.4 4.6-5.6 11.4-3 17.4S9.6 960 16 960c132.6 0 232-63.6 281.2-102.8 65.4 24.6 138 38.8 214.8 38.8 282.8 0 512-186.2 512-416S794.8 64 512 64z" p-id="10052" fill="#8a8a8a"></path></svg>' +
      '<span class="text-muted"> ' +
      commentCount +
      '</span></span>';
    let viewCountHtml =
      `<span class="postInfo-item">` +
      '<svg t="1592845607250" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8509" width="16" height="16"><path d="M512 159.904A550.4 550.4 0 0 0 0 508.992a550.016 550.016 0 0 0 1024 0A550.4 550.4 0 0 0 512 159.904z m0 581.824a232.736 232.736 0 1 1 232.736-232.736A232.8 232.8 0 0 1 512 741.824z m0-372.352a139.648 139.648 0 1 0 139.648 139.648A139.744 139.744 0 0 0 512 369.44z" fill="#8a8a8a" p-id="8510"></path></svg>' +
      '<span class="text-muted"> ' +
      viewCount +
      '</span></span>';
    div.innerHTML += author + viewCountHtml + commentCountHtml;

    let parent = document.querySelector('.postTitle').parentElement;
    let childRef = document.querySelector('.postBody');
    parent.insertBefore(div, childRef);
  }
}

function setCategry() {
  let c = getCategory();
  let parent = document.getElementById('category-dropdown');

  if (c == null || parent == null) setTimeout(setCategry, 1000);
  else {
    for (let i = 0; i < c.length; i++) {
      let anchor = document.createElement('a');
      anchor.href = c[i].href;
      anchor.innerText = c[i].categoryName;
      anchor.classList?.add('dropdown-item');
      parent.appendChild(anchor);
    }
  }
}

function getCategory() {
  let ul: any = document
    .getElementById('sidebar_postcategory')
    ?.getElementsByTagName('ul');
  if (ul === null || ul === undefined) return null;

  ul = ul[0];

  let liList = ul.children;
  let array = new Array();
  let a, categoryName, href;
  for (let i = 0; i < liList.length; i++) {
    a = liList[i].querySelector('a');
    categoryName = a.innerText;
    href = a.href;
    array.push({ categoryName, href });
  }
  return array;
}
