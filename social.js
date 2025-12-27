(function () {
  if (document.getElementById('fixedban')) return;

  function insertAd() {
    // 1. Overlay
    const overlay = document.createElement('div');
    overlay.id = 'ad-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '998',
      background: 'rgba(0,0,0,0)'
    });

    // 2. Container
    const fixedban = document.createElement('div');
    fixedban.id = 'fixedban';
    Object.assign(fixedban.style, {
      width: '100%',
      margin: 'auto',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'fixed',
      top: '50%',
      left: '50%',
      bottom: 'auto',
      zIndex: '999',
      transform: 'translate(-50%, -50%)',
      webkitTransform: 'translate(-50%, -50%) translateZ(0)'
    });

    // 3. Tombol Close
    const closeWrapper = document.createElement('div');
    const closeButton = document.createElement('a');
    closeButton.id = 'close-fixedban';
    closeButton.style.cursor = 'pointer';
    
    const closeAction = () => {
      fixedban.style.display = 'none';
      overlay.style.display = 'none';
    };

    overlay.onclick = closeAction;
    closeButton.onclick = closeAction;

    // 4. Konten Iklan
    const adContent = document.createElement('div');
    adContent.id = 'ad-content';
    Object.assign(adContent.style, {
      textAlign: 'center',
      display: 'block',
      maxWidth: '728px',
      height: 'auto',
      overflow: 'hidden',
      margin: 'auto'
    });

    // 5. Script Adsterra
    const conf = document.createElement('script');
    conf.type = 'text/javascript';
    conf.text = `
      var atOptions = {
        'key' : 'a215683d2d0ce8fecd54e01b99606d75',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    const invoke = document.createElement('script');
    invoke.type = 'text/javascript';
    invoke.src = 'https://anguishgrandpa.com/a215683d2d0ce8fecd54e01b99606d75/invoke.js';

    // 6. Menyusun Element (Append)
    closeWrapper.append(closeButton);
    adContent.append(conf, invoke); // Append script ke dalam box iklan
    fixedban.append(closeWrapper, adContent);
    
    // Tambah ke Body
    document.body.append(overlay, fixedban);

    // Mencegah klik di area iklan menutup overlay
    fixedban.onclick = function (e) {
      e.stopPropagation();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertAd);
  } else {
    insertAd();
  }
})();
