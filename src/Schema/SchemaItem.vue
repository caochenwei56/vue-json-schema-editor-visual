<template>
  <div>
    <el-row type="flex" align="middle">
      <el-col :span="8" class="col-item name-item col-item-name" :style="tagPaddingLeftStyle">
        <el-row type="flex" justify="space-around" align="middle">
          <el-col :span="2" class="down-style-col">
            <span
              v-if="value.type === 'object' || (value.type === 'array' && (value.subType === 'array' || value.subType === 'object'))"
              class="down-style" @click="handleClickIcon">
              <i v-if="showIcon" class="el-icon-caret-bottom icon-object"></i>
              <i v-if="!showIcon" class="el-icon-caret-right icon-object"></i>
            </span>
          </el-col>
          <el-col :span="20" class="el-input--small">
            <input size="small" class="el-input el-input__inner" :class="{ 'is-disabled': value.disabled }"
              :value="value.label" disabled @change="handleNameChange" />
          </el-col>
          <el-col :span="2" style="text-align: center">
            <el-tooltip placement="top" content="是否必须">
              <el-checkbox
                :checked="value.required"
              ></el-checkbox>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="3" class="col-item col-item-type">
        <el-select size="small" :value="value.type" :disabled="!value.canChangeType" class="type-select-style"
          @change="handleChangeType">
          <el-option v-for="item in schemaTypes" :key="item" :value="item" :label="item"></el-option>
        </el-select>
      </el-col>

      <el-col v-if="isMock" :span="3" class="col-item col-item-mock">
        <MockSelect :schema="value" @showEdit="handleAction({ eventType: 'mock-edit' })" @change="handleChangeMock" />
      </el-col>

      <el-col v-if="showTitle" :span="isMock ? 4 : 5" class="col-item col-item-mock">
        <el-input v-model="value.title" :disabled="value.disabled" size="small" placeholder="标题">
          <i slot="append" class="el-icon-edit" @click="handleAction({ eventType: 'show-edit', field: 'title' })"></i>
        </el-input>
      </el-col>
      <!-- 默认值输入框 -->
      <el-col v-if="!showTitle && showDefaultValue && value.subType != 'object'" :span="isMock ? 4 : 5"
        class="col-item col-item-mock">
        <div class="cus-label" style="display: flex;justify-content: space-between;align-items: center">
          <div class="ellipsis">{{ formatInput(value) }}</div>
          <i @click="handleAction({ eventType: 'show-edit', field: 'default' })" slot="append" class="el-icon-edit"></i>
        </div>
      </el-col>


      <el-col :span="1" class="col-item col-item-setting">
        <span v-if="data.properties[name].deleteFlg" class="delete-item" :class="{ hidden: value.disabled }"
          @click="handleAction({ eventType: 'delete-field' })">
          <el-tooltip placement="top" content="删除">
            <i class="el-icon-close close"></i>
          </el-tooltip>
        </span>
        <DropPlus v-if="value.type === 'object'" :prefix="prefix" :name="name" @add-field="handleAction" />
        <span v-if="data.properties[name].addFlg && value.type !== 'object'"
          @click="handleAction({ eventType: 'add-field', isChild: true })">
          <el-tooltip placement="top" content="添加子节点">
            <i class="el-icon-plus plus"></i>
          </el-tooltip>
        </span>
      </el-col>
    </el-row>
    <div class="option-formStyle">
      <!-- {mapping(prefixArray, value, showEdit, showAdv)} -->
      <template v-if="value.type === 'array' && (value.subType === 'object' || value.subType === 'array')">
        <schema-array v-show="showIcon" :prefix="prefixArray" :data="value" :is-mock="isMock" :show-title="showTitle"
          :show-default-value="showDefaultValue" :editor-id="editorId" />
      </template>
      <template v-if="value.type === 'object'">
        <schema-object v-show="showIcon" :prefix="nameArray" :data="value" :is-mock="isMock" :show-title="showTitle"
          :show-default-value="showDefaultValue" :editor-id="editorId" />
      </template>
    </div>
  </div>
</template>
<script>
import isUndefined from "lodash/isUndefined";
import MockSelect from "../MockSelect";
import DropPlus from "./DropPlus";
import SchemaObject from "./SchemaObject";
import SchemaArray from "./SchemaArray";
import { SCHEMA_TYPE } from "../utils";
export default {
  name: "SchemaItem",
  components: {
    MockSelect,
    DropPlus,
    "schema-array": SchemaArray,
    "schema-object": SchemaObject,
  },
  props: {
    isMock: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    showDefaultValue: { type: Boolean, default: false },
    editorId: {
      type: String,
      default: "editor_id",
    },
    name: {
      type: String,
      default: "",
    },
    prefix: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => { },
    },
    position: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      showIcon: true,
      tagPaddingLeftStyle: {},
      schemaTypes: SCHEMA_TYPE,
      value: this.data.properties[this.name],
    };
  },

  computed: {
    nameArray() {
      const prefixArray = [].concat(this.prefix, this.name);
      return [].concat(prefixArray, "properties");
    },
    prefixArray() {
      return [].concat(this.prefix, this.name);
      // return [].concat(this.prefix, 'items')
    },
  },
  beforeMount() {
    const length = this.prefix.filter((name) => name !== "properties").length;
    this.tagPaddingLeftStyle = {
      paddingLeft: `${20 * (length + 1)}px`,
    };
  },
  methods: {
    isUndefined() {
      return isUndefined;
    },
    handleClickIcon() {
      this.showIcon = !this.showIcon;
    },

    handleAction(options) {
      console.log("---------------------")
      options.type = this.data.properties[this.name].type;
      const { prefix, name } = this;
      this.$jsEditorEvent.emit(`schema-update-${this.editorId}`, {
        eventType: "add-field",
        prefix,
        name,
        ...options,
      });
    },

    handleNameChange(e) {
      this.handleAction({
        eventType: "update-field-name",
        value: e.target.value,
      });
    },
    handleEnableRequire(e) {
      const { prefix, name } = this;
      this.$jsEditorEvent.emit(`schema-update-${this.editorId}`, {
        eventType: "toggle-required",
        prefix,
        name,
        required: e,
      });
    },
    handleChangeMock() { },
    handleChangeType(value) {
      this.handleAction({ eventType: "schema-type", value });
    },
    formatTime(value) {
      const dateStr = value;
      const timestamp = Date.parse(dateStr);
      const dateObj = new Date(timestamp);
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      const hours = dateObj.getHours().toString().padStart(2, '0');
      const minutes = dateObj.getMinutes().toString().padStart(2, '0');
      const seconds = dateObj.getSeconds().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    },
    formatInput(value) {
      if(value.type === 'date') {
        return value.default ? this.formatTime(value.default) : ''
      }
      return value.default
    }

  },
};
</script>

