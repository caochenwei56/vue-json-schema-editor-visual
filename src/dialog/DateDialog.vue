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
                <!-- <el-input
                  v-model="formData.default"
                  placeholder="请输入默认值"
                  :maxlength="200"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input> -->
                <el-date-picker
                    v-model="formData.default"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    clearable
                    :style="{ width: '100%' }"
                    placeholder="选择日期时间">
                </el-date-picker>
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
    name: 'DateDialog',
    props: {
        initData: { type: Object, default: () => ({}) },
        visible: { type: Boolean, default: true },
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
        Object.assign(this.formData, { default: this.initData.value })
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
    },
  }
  </script>
  