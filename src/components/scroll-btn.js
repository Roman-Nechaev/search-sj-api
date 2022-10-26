export default class ScrollBtn {
  constructor({ selector }) {
    this.refs = this._getRefs(selector);

    this._magic();
    this._foo();
    this._onClick();
  }

  _getRefs(selector) {
    const refs = {};
    refs.btn = document.querySelector(selector);
    refs.up = document.querySelector('.search-form');
    refs.opac = document.querySelector('.opacity-tes');

    return refs;
  }

  _onClick() {
    console.log(this.refs.up);
    this.refs.btn.onclick = function () {
      window.scrollTo({
        top: document.querySelector('.search-form'),
        behavior: 'smooth',
      });
    };
  }
  _magic() {
    // let yOffset = window.pageYOffset;
    // if (yOffset < 20) {
    //   console.log('20');
    //   // this.refs.opac.classList.add('opacity-tes');
    // } else {
    //   // this.refs.opac.classList.remove('opacity-tes');
    //   console.log('No');
    // }
    // console.log(yOffset);
  }

  _foo() {
    // console.log(window.onscroll);
    window.onscroll = this._magic;
    // console.log(this._magic);
  }
}
