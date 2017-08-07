module.exports = {
    template: `
        <div>
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-title-container">
                    <div class="dialog-title-text-single">提醒</div>
                </div>
                <div class="dialog-content-container">
                    <div class="dialog-item">
                        {{warningObject.text}}
                    </div>
                </div>
                <div class="dialog-btn-container">
                    <a href="javascript:void(0)" @click.stop.prevent='closeDialog()'>取消</a>
                    <a href="javascript:void(0)" @click.stop.prevent='submit()'>确定</a>
                </div>
            </div>
        </div>
    `,
    props: ['warningObject'],
    methods: {
        closeDialog: function (event) {
            this.$emit('closeAlertDialog');
        },
        submit: function (event) {
            this.$emit('submitData',[this.warningObject.type]);
        }
    }
};