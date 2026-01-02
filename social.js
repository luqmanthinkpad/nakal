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
      background: 'rgba(0,0,0,0.5)'
    });

    // 2. Container Utama
    const fixedban = document.createElement('div');
    fixedban.id = 'fixedban';
    Object.assign(fixedban.style, {
      width: '320px',
      margin: 'auto',
      textAlign: 'center',
      position: 'fixed',
      top: '50%',
      left: '50%',
      zIndex: '999',
      transform: 'translate(-50%, -50%)',
      background: '#fff',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
    });

    // 3. Tombol Close
    const closeButton = document.createElement('div');
    closeButton.innerHTML = '×';
    Object.assign(closeButton.style, {
      position: 'absolute',
      top: '-15px',
      right: '-15px',
      width: '30px',
      height: '30px',
      background: '#333',
      color: '#fff',
      borderRadius: '50%',
      fontSize: '20px',
      lineHeight: '30px',
      cursor: 'pointer',
      textAlign: 'center',
      fontWeight: 'bold'
    });
    
    const closeAction = () => {
      fixedban.remove();
      overlay.remove();
    };

    overlay.onclick = closeAction;
    closeButton.onclick = closeAction;

    // 4. Konten Iklan
    const adContainer = document.createElement('div');
    adContainer.id = 'ad-content';
    
    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      width: '300px',
      height: '250px',
      border: 'none',
      overflow: 'hidden'
    });

    // 5. Menyusun Element
    fixedban.append(closeButton, adContainer);
    adContainer.append(iframe);
    document.body.append(overlay, fixedban);

    // 6. Inject Script ke dalam Iframe
    const iframeDoc = iframe.contentWindow.document;
    const adCode = `
      <body style="margin:0;padding:0;">
        <script>
		  atOptions = {
			'key' : 'a215683d2d0ce8fecd54e01b99606d75',
			'format' : 'iframe',
			'height' : 250,
			'width' : 300,
			'params' : {}
		  };
		</script>
		<script src="https://anguishgrandpa.com/a215683d2d0ce8fecd54e01b99606d75/invoke.js"></script>
      </body>
    `;
    
    iframeDoc.open();
    iframeDoc.write(adCode);
    iframeDoc.close();

    fixedban.onclick = (e) => e.stopPropagation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertAd);
  } else {
    insertAd();
  }
})();
