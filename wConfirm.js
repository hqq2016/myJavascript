; (function (window) {

  let winConfirm = function () {
    this.str = '';
  }

  let alertList = [];

  winConfirm.prototype = {
    show: function () {
      let index = alertList.indexOf(this);
      if (index === 0) {
        let str = this.str || '';
        let dialogText = document.createElement('div');
        dialogText.className = 'dialog-confirm';
        dialogText.innerHTML = `
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-title-container">
                    <div class="dialog-title-text-single">提醒</div>
                </div>
                <div class="dialog-content-container">
                    <div class="dialog-item">
                        ${str}
                    </div>
                </div>
                <div class="dialog-btn-container">
                    <a href="javascript:void(0)" class="btn-cancel">取消</a>
                    <a href="javascript:void(0)" class="btn-submit">确定</a>
                </div>
            </div>
        `
        document.body.appendChild(dialogText);
        dialogText.querySelector('.btn-submit').addEventListener('click', () => {
          dialogText.parentNode.removeChild(dialogText);
          if (this.callBack) this.callBack();
          // 删除本任务
          alertList.shift();
          // 继续队列
          if (alertList.length > 0) alertList[0].show(0);
        }, false)
        dialogText.querySelector('.btn-cancel').addEventListener('click', () => {
          dialogText.parentNode.removeChild(dialogText);
          if (this.failCallBack) this.failCallBack();
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
    },
    catch: function (fn) {
      if (typeof fn === 'function') {
        this.failCallBack = fn;
      } else {
        console.log('typeof Fn is error');
      }
      return this;
    }


  }

  let style = document.createElement('style');
  style.innerHTML = `
    /*微信提示框*/
    .dialog-mask {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 999;
      background: black;
      opacity: 0.36;
  }
  .dialog-box {
      position: fixed;
      background: white;
      z-index: 1000;
      top: 50%;
      left: 50%;
      width: 88%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      border-radius: 0.12rem;
      font-size: 0.28rem;
  }
  .dialog-title-container {
      line-height: 0.64rem;
      padding: 0.12rem 0.36rem;
      border-bottom: 1px solid #AAA;
  }

  .dialog-title-text {
      width: 80%;
      float: left;
  }
  .dialog-title-text-single{
      font-size: 0.32rem;
  }
  .dialog-content-container {
      padding: 0.12rem 0.36rem;
  }
  .dialog-item {
      margin: 0.36rem 0px;
  }
  .dialog-btn-container {
      display: table;
      width: 100%;
      border-top: 1px solid #CCC;
  }
  .dialog-btn-container {
      display: table;
      width: 100%;
      border-top: 1px solid #CCC;
  }

  .dialog-btn-container > a {
      display: table-cell;
      text-align: center;
      padding: 0.24rem 0px;
      color: inherit;
  }

  .dialog-btn-container > a:visited,
  .dialog-btn-container > a:active {
      color: #AAA;
  }

  .dialog-btn-container > a:first-child {
      border-right: 1px solid #CCC;
  }`

  document.head.appendChild(style);

  window.wConfirm = function (str) {
    return new winConfirm().init(str);
  }


})(window);

