class DeviceCluster extends HTMLElement {
  static get observedAttributes() {
    return ['show-phone', 'show-watch', 'phone-screen', 'watch-screen'];
  }

  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }

  get showPhone() { return this.getAttribute('show-phone') !== 'false'; }
  get showWatch() { return this.getAttribute('show-watch') !== 'false'; }
  get phoneScreen() { return this.getAttribute('phone-screen') || 'assets/screen-ios.png'; }
  get watchScreen() { return this.getAttribute('watch-screen') || 'assets/screen-watch.png'; }

  render() {
    const showPhone = this.showPhone;
    const showWatch = this.showWatch;
    const showBoth = showPhone && showWatch;
    const phoneOnly = showPhone && !showWatch;
    const watchOnly = !showPhone && showWatch;

    const watchFrameHTML = (size = '') => `
      <div style="position:relative;width:${size || 'clamp(118px,13vw,155px)'};aspect-ratio:560/880;filter:drop-shadow(0 16px 36px rgba(0,0,0,.55))">
        <img src="${this.watchScreen}" alt="Watch navigation"
          style="position:absolute;left:12%;top:21%;width:75%;height:57.5%;object-fit:cover;border-radius:12%;display:block">
        <img src="assets/watch-frame.png" alt="" aria-hidden="true"
          style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;display:block">
      </div>`;

    const phoneFrameHTML = (extraStyle = '') => `
      <div style="position:relative;width:clamp(210px,23vw,272px);padding:10px;background:linear-gradient(155deg,#2E2620,#0C0A09);border-radius:42px;box-shadow:0 36px 70px rgba(0,0,0,.5),inset 0 0 0 1.5px rgba(255,255,255,.06);${extraStyle}">
        <div style="position:absolute;top:50%;left:-3px;width:3px;height:50px;background:#3D332B;border-radius:3px 0 0 3px;transform:translateY(-80px)"></div>
        <div style="position:absolute;top:50%;right:-3px;width:3px;height:66px;background:#3D332B;border-radius:0 3px 3px 0;transform:translateY(-24px)"></div>
        <div style="position:relative;border-radius:33px;overflow:hidden;background:#000;aspect-ratio:9/19.5">
          <img src="${this.phoneScreen}" alt="iPhone screen" style="width:100%;height:100%;object-fit:cover;display:block">
          <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:34%;height:20px;background:#000;border-radius:999px"></div>
        </div>
      </div>`;

    let inner = '';
    if (showBoth) {
      inner = `
        <div style="position:relative;z-index:2;display:flex;align-items:flex-end;justify-content:center">
          ${phoneFrameHTML('transform:rotate(-3deg);z-index:1')}
          <div style="margin-left:-44px;margin-bottom:-14px;z-index:2">
            ${watchFrameHTML()}
          </div>
        </div>`;
    } else if (phoneOnly) {
      inner = `<div style="position:relative;z-index:2">${phoneFrameHTML('transform:rotate(-2.5deg)')}</div>`;
    } else if (watchOnly) {
      inner = `<div style="position:relative;z-index:2">${watchFrameHTML('clamp(200px,22vw,260px)')}</div>`;
    }

    this.innerHTML = `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;min-height:460px;width:100%">
        <div style="position:absolute;inset:8% 12%;background:radial-gradient(circle,rgba(237,106,30,.46),rgba(237,106,30,0) 65%);filter:blur(10px);pointer-events:none;z-index:0"></div>
        ${inner}
      </div>`;
  }
}

customElements.define('device-cluster', DeviceCluster);
