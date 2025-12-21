(function () {
  if (document.getElementById('fixedban')) return;
  var html = ''
  + '<div id="fixedban" style="width:100%;margin:auto;text-align:center;float:none;overflow:hidden;display:scroll;position:fixed;bottom:0;z-index:999;-webkit-transform:translateZ(0);">'
  +   '<div>'
  +     '<a id="close-fixedban" style="cursor:pointer;" '
  +        'onclick="document.getElementById(\'fixedban\').style.display=\'none\';'
  +        'document.getElementById(\'ad-overlay\').style.display=\'none\'"></a>'
  +   '</div>'
  +   '<div id="ad-content" style="text-align:center;display:block;max-width:728px;height:auto;overflow:hidden;margin:auto"></div>'
  + '</div>';
  function insertAd() {
    var overlay = document.createElement('div');
    overlay.id = 'ad-overlay';
    overlay.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      z-index:998;
      background:rgba(0,0,0,0);
    `;
    overlay.onclick = function () {
      var fb = document.getElementById('fixedban');
      if (fb) fb.style.display = 'none';
      overlay.style.display = 'none';
    };
    document.body.appendChild(overlay);
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstChild);
    var fb = document.getElementById('fixedban');
    fb.style.top = '50%';
    fb.style.bottom = 'auto';
    fb.style.left = '50%';
    fb.style.transform = 'translate(-50%, -50%) translateZ(0)';
    fb.onclick = function (e) {
      e.stopPropagation();
    };
    /*iklan adsterra*/
    var conf = document.createElement('script');
    conf.type = 'text/javascript';
    conf.innerHTML = `
      var atOptions = {
        key : 'a215683d2d0ce8fecd54e01b99606d75',
        format : 'iframe',
        height : 250,
        width : 300,
        params : {}
      };
    `;
    var invoke = document.createElement('script');
    invoke.type = 'text/javascript';
    invoke.src = 'https://anguishgrandpa.com/a215683d2d0ce8fecd54e01b99606d75/invoke.js';
    var adBox = document.getElementById('ad-content');
    adBox.appendChild(conf);
    adBox.appendChild(invoke);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertAd);
  } else {
    insertAd();
  }
})();
