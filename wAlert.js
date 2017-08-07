; (function (window) {

  let winAlert = function () {
    this.str = '';
  }

  let alertList = [];

  winAlert.prototype = {
    show: function () {
      let index = alertList.indexOf(this);
      if (index === 0) {
        let str = this.str || '';
        let fixed = document.createElement('div');
        fixed.className = 'weui_fixed';
        let dialogText = document.createElement('div');
        dialogText.className = 'weui_dialog weui_dialog_visible';
        dialogText.innerHTML = `
          <div class="weui_dialog_bd">${str}</div>
          <div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog primary">确定</a></div>
        `
        document.body.appendChild(fixed);
        document.body.appendChild(dialogText);
        dialogText.querySelector('.weui_btn_dialog').addEventListener('click', () => {
          dialogText.parentNode.removeChild(dialogText);
          fixed.parentNode.removeChild(fixed);
          if (this.callBack) this.callBack();
          // 删除本任务
          alertList.shift();
          // 继续队列
          if (alertList.length > 0) alertList[0].show(0);
        }, false)
      }
      return this;
    },
    init: function (str) {
      this.str = str;
      alertList.push(this);
      this.show()
      return this;
    },
    then: function (fn) {
      if (typeof fn === 'function') {
        this.callBack = fn;
      } else {
        console.log('typeof Fn is error');
      }
      return this;
    }


  }

  let style = document.createElement('style');
  style.innerHTML = `
    /*微信提示框*/
    .weui_dialog {
        position: fixed;
        z-index: 5000;
        width: 6rem;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #FFF;
        text-align: center;
        border-radius: .1rem;
        overflow: hidden;
    }

    .weui_dialog_hd {
        padding: .24rem 0 .1rem;
        font-size: .22rem;
    }

    .weui_dialog_bd {
        line-height: 1.4;
        padding: .6rem .3rem 0;
        font-size: .3rem;
        color: #333;
        word-wrap: break-word;
        word-break: break-all;
    }

    .weui_dialog_ft {
        position: relative;
        line-height: .9rem;
        margin-top: .36rem;
        font-size: .34rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }

    .weui_btn_dialog.primary {
        color: #0bb20c;
    }

    .weui_btn_dialog.primary:active {
      background-color: #f2f2f2;
    }

    .weui_dialog_ft a {
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        color: #3cc51f;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    .weui_dialog_ft:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        border-top: 1px solid #d5d5d6;
        color: #d5d5d6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }

    .weui_fixed {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }`

  document.head.appendChild(style);

  window.wAlert = function (str) {
    return new winAlert().init(str);
  }


})(window);

