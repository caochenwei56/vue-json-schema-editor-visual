<template>
    <div>
        <el-dialog :title="initData.title" :visible.sync="visible" width="30%" @close="handleDialogClose">
            <div>
                <el-form ref="form" :model="formData" label-width="80px">
                    <el-form-item label="数组长度" style="text-align: left">
                        <el-input-number v-model="formData.length" @change="handleChange4length" :min="1" :max="10"
                                         label="数组长度"></el-input-number>
                    </el-form-item>
                    <div style="height: 200px;overflow-y: auto">
                        <div v-for="(item,index) in formData.data" :key="index">
                            <el-form-item style="text-align:left" :label="index +''">
                                <el-input :key="index+'input'" style="width: 300px" v-model="formData.data[index]"></el-input>
                                <i @click="handleDelete(index)" style="margin-left: 16px" class="el-icon-delete"></i>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'ArrayDialog4String',
    props: {
        visible: {type: Boolean, default: false},
        initData: {
            type: Object,
            default: () => ({
                title: '提示',
                value: '',
            }),
        },
    },

    data() {
        return {
            dialogVisible: this.visible,
            data: '',
            formData: {
                length: 1,
                data: ['']
            }
        }
    },

    watch: {
        initData: {
            handler() {
                console.log("---initData---")
                this.data = this.initData.value
                if (this.initData.value && this.initData.value.length > 0) {
                    this.formData.data = this.initData.value
                    this.formData.length = this.initData.value.length
                } else {
                    this.formData = {
                        length: 1,
                        data: ['']
                    }
                }

            },
            deep: true,
        },
    },
    created() {
    },
    methods: {
        close() {
            this.$emit('update:visible', false)
        },
        handleOk() {
            this.initData.value = this.formData.data
            this.$jsEditorEvent.emit(`schema-update-${this.initData.editorId}`, {
                eventType: 'save-showedit',
                ...this.initData,
            })
            this.close()
        },
        handleChange4length(value) {
            console.log("handleChange4length")
            let array = []
            for (let i = 0; i < value; i++) {
                if (this.formData.data[i]) {
                    array.push(this.formData.data[i])
                } else {
                    array.push("")
                }
            }
            this.formData.data = array
        },
        handleDelete(index) {
            console.log("handleDelete")
            if (this.formData.data.length > 1) {
                this.formData.data.splice(index, 1)
            }
        },
        handleDialogClose(){
            this.$emit("update:visible",this.dialogVisible)
        }
    },

}
</script>

<style lang="scss" scoped>
</style>
