<template>
    <div>
      <el-dialog
        :title="formData.title"
        width="700px"
        v-bind="$attrs"
        v-on="$listeners"
        :visible.sync="visible"
        @open="onOpen"
        @close="onClose"
      >
        <el-row :gutter="15">
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="small"
            label-width="100px"
          >
            <el-col :span="24">
              <el-form-item label="默认值：" prop="default">
                <el-input
                  v-model.number="formData.default"
                  placeholder="请输入默认值"
                  type="number"
                  @input="handleEdit"
                  :maxlength="200"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import { getValidFormVal } from '../utils'
  export default {
    name: 'StringDialog',
    props: {
        initData: { type: Object, default: () => ({}) },
        visible: { type: Boolean, default: false },
    },
    data() {
      return {
        formData: {
          default: undefined,
        },
        rules: {
          default: [],
        },
      }
    },
    methods: {
      onOpen() {
        Object.assign(this.formData, { default: this.initData.default })
      },
      onClose() {
        this.$refs['elForm'].resetFields()
      },
      close() {
        this.$emit('update:visible', false)
      },
      handleConfirm() {
        this.$refs['elForm'].validate((valid) => {
          if (!valid) return
          const newData = getValidFormVal(this.formData)
          this.$jsEditorEvent.emit(`schema-update-${this.initData.editorId}`, {
            eventType: 'save-setting',
            ...this.initData, // 之前的参数
            newData, // 设置数据
          })
          this.close()
        })
      },
      handleEdit(e) {
        let value = e.replace(/[^\d]/g, ""); // 只能输入数字
        value = value.replace(/^0+(\d)/, "$1"); // 第一位0开头，0后面为数字，则过滤掉，取后面的数字
        value = value.replace(/(\d{15})\d*/, '$1') // 最多保留15位整数
        this.formData.default = value
      }
    },
  }
  </script>
  