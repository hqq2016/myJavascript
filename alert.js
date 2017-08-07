module.exports = {
    template: `
        <div>
            <div class="dialog-mask"></div>
            <div class="dialog-box">
                <div class="dialog-title-container">
                    <div class="dialog-title-text">提醒</div>
                </div>
                <div class="dialog-content-container">
                    <div class="dialog-item">
                        {{warningText}}
                    </div>
                </div>
                <div class="dialog-btn-container">
                    <a href="javascript:void(0)" @click.stop.prevent='closeDialog()'>确定</a>
                </div>
            </div>
        </div>
    `,
    props: ['warningText'],
    methods: {
        closeDialog: function (event) {
            this.$emit('closeAlertDialog');
        }
    }
};