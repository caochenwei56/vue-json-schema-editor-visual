<template>
  <el-dialog
    :title="initData.title"
    width="600px"
    v-bind="$attrs"
    v-on="$listeners"
    :visible.sync="visible"
    @open="onOpen"
    @close="onClose"
  >
    <el-form ref="elForm" :model="formData" size="small" label-width="100px">
      <el-form-item label="默认值：" prop="default">
        <el-select
          v-model="formData.default"
          placeholder="请下拉选择"
          clearable
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="(item, index) in defaultOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getValidFormVal } from '../utils'
export default {
  name: 'BooleanDialog',
  inheritAttrs: false,
  props: {
      initData: { type: Object, default: () => ({}) },
      visible: { type: Boolean, default: false },
  },

  data() {
    return {
      formData: {
        default: undefined,
      },
      defaultOptions: [
        {
          label: 'true',
          value: true,
        },
        {
          label: 'false',
          value: false,
        },
      ],
    }
  },
  created() {},
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
