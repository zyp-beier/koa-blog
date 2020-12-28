window.onload = function() {
  let tag = document.getElementsByClassName('tag-wrap')[0]
  document.addEventListener('scroll', function (event) {
    let scrollDistance = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    console.log(event )
    console.log(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop)
    if (scrollDistance >= 533) {    // 触发的位置
      tag.style.cssText = 'position:fixed;top:0;';
    } else {
      tag.style.cssText = 'position:static;';
    }
  });
}

