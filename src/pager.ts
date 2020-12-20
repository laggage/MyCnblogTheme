export const buildPager = () => {
  if (/page=[2-9]{1,100}/.test(window.location.search)) {
    $('#nav_next_page').hide();
  }
}
