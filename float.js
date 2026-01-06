const fixedBan = document.createElement('div');
fixedBan.id = 'fixedban';
fixedBan.style.cssText = `
  width: 100%;
  margin: 0 auto;
  text-align: center;
  position: fixed;
  bottom: 0;
  z-index: 999;
  overflow: hidden;
  -webkit-transform: translateZ(0);
`;
const adContainer = document.createElement('div');
adContainer.style.cssText = `
  position: relative;
  display: inline-block;
  max-width: 728px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
  overflow: hidden;
`;
const closeBtn = document.createElement('button');
closeBtn.id = 'close-fixedban';
closeBtn.innerHTML = '&times;';
closeBtn.style.cssText = `
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.5em;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 0.8em;
  height: 0.8em;
  line-height: 1.8em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
`;
closeBtn.onmouseover = () => (closeBtn.style.background = 'rgba(0,0,0,0.8)');
closeBtn.onmouseout = () => (closeBtn.style.background = 'rgba(0,0,0,0.6)');
closeBtn.onclick = () => fixedBan.remove();
adContainer.appendChild(closeBtn);
const script1 = document.createElement('script');
script1.type = 'text/javascript';
script1.innerHTML = `
  atOptions = {
    'key': 'a215683d2d0ce8fecd54e01b99606d75',
    'format': 'iframe',
    'height': 250,
    'width': 300,
    'params': {}
  };
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = 'http' + (location.protocol === 'https:' ? 's' : '') +
          '://anguishgrandpa.com/a215683d2d0ce8fecd54e01b99606d75/invoke.js';
  document.currentScript.parentNode.appendChild(s);
`;
adContainer.appendChild(script1);
fixedBan.appendChild(adContainer);
document.body.appendChild(fixedBan);
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 600px) {
    #fixedban div {
      width: 95% !important;
    }
    #close-fixedban {
      top: 4px !important;
      right: 4px !important;
      font-size: 1.2em !important;
      width: 1.5em !important;
      height: 1.5em !important;
      line-height: 1.5em !important;
    }
  }
`;
document.head.appendChild(style);
