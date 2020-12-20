import { isDetailPage } from './../utils';
import './index.less';

const navs: {
  title: string,
  url: string,
  icon: string,
  target: '_blank'|''
}[] = [
  {
    title: '首页',
    url: 'https://www.cnblogs.com/Laggage/',
    icon: '',
    target: '_blank'
  },
  {
    title: '联系',
    url: 'https://msg.cnblogs.com/send/Laggage',
    icon: '',
    target: '',
  },
  {
    title: '管理',
    url: 'https://i.cnblogs.com/',
    icon: '',
    target: '',
  },
  {
    title: '博客园',
    url: 'https://www.cnblogs.com/',
    icon: '',
    target: '_blank',
  },
]

class HeadBuilder {
  get blogTitle(): {
    title: string,
    href: string
  } {
    return {
      title: $('#blogTitle a').text().toLowerCase(),
      href: $('#blogTitle a').attr('href')
    }
  }

  get avatarUrl() {
    return 'https://pic.cnblogs.com/avatar/1596066/20201124214721.png';
  }

  get blogSign() {
    return 'less is more';
  }

  get postTitle(): {
    title: string,
    url: string
  } {
    return {
      title: $('.post .postTitle').text(),
      url: $('.post a.postTitle').attr('href')
    }
  }

  get postCatalog(): string {
    return $('#BlogPostCategory a').text();
  }

  get postTags(): {
    title: string,
    url: string
  }[] {
    return Array.from($('#EntryTag a')).map(x => Object.assign({
      title: x.innerText,
      href: x.getAttribute('href')
    }));
  }

  get postDate(): string {
    return $('#post-date').text();
  }

  get postViewCount() {
    return $('#post_view_count').text();
  }

  get postCommentCount() {
    return $('#post_comment_count');
  }

  buildBannerContent() {
    if (isDetailPage()) {
      const catalogHTML = builder.postCatalog ? `
        分类: <span class="la-banner-post-catalog"> ${builder.postCatalog} </span>
      ` : '';
      const tags = builder.postTags.map(tag => `<span><a href="${tag.url}">#&nbsp;${tag.title}</a></span>`);
      return `
      <div class="la-banner-content">
        <span class="la-banner-post-title">${builder.postTitle.title}</span>
        <span class="la-banner-post-published-date">
          <span>Published on ${builder.postDate} in 分类: ${builder.postCatalog} </span>
        </span>

        <span class="la-banner-post-published-tags">
          ${tags.join('')}
        </span>
      </div>
      `;
    } else {
      return `
        <div class="la-banner-content">
          <span class="la-banner-blog-title">${builder.blogTitle.title}</span>
          <span class="la-banner-blog-sign">#&nbsp;${builder.blogSign}</span>
        </div>
      `
    }
  }

  buildNav() {
    let html = '';
    for (let i = 0; i < navs.length; i++) {
      const nav = navs[i];
      html += `<span>
        <a href="${nav.url}" target="${nav.target}">
          <i class="iconfont">${nav.icon}</i>${nav.title}
        </a>
      </span>`
    }
    return html;
  }

  constructor() {
  }
}


const builder = new HeadBuilder();
const headerHTML = `
<header class="la-header" custom>
  <div class="container-md la-header-top">
    <div class="la-blog-title">
      <span>
        <img class="la-avatar" src="${builder.avatarUrl}"/>
      </span>
      <span>
        <a href="${builder.blogTitle.href}">${builder.blogTitle.title}'s</a>
      </span>
    </div>
  
    <nav>
      ${builder.buildNav()}
    </nav>
  </div>

  <div class="la-banner">
    <div>
      <div class="container-md">
        ${builder.buildBannerContent()}
      </div>
    </div>
  </div>
  
</header>
`;

export const buildHeader = () => {
  $(() => {
    $('#header').append(headerHTML);
  });
};
