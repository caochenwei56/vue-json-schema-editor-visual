<template>
  <div class="array-type">
    <el-row type="flex" align="middle">
      <el-col :span="8" class="col-item name-item col-item-name" :style="tagPaddingLeftStyle">
        <el-row type="flex" justify="space-around" align="middle">
          <el-col :span="2" class="down-style-col">
            <span v-if="data.type === 'object'" class="down-style" @click="handleClickIcon">
              <i v-if="!showIcon" class="el-icon-caret-bottom icon-object"></i>
              <i v-else class="el-icon-caret-right icon-object"></i>
            </span>
          </el-col>
          <el-col :span="20">
            <el-input disabled :value="data.property" size="small" />
          </el-col>
          <!-- <el-col :span="2" style="text-align: center">
            <el-tooltip placement="top" content="全选">
              <el-checkbox disabled />
            </el-tooltip>
          </el-col> -->
        </el-row>
      </el-col>

      <el-col :span="3" class="col-item col-item-type">
        <el-select :value="data.subType" size="small" class="type-select-style" @change="handleChangeType" disabled>
          <el-option v-for="item in schemaTypes" :key="item" :value="item" :label="item"></el-option>
        </el-select>
      </el-col>

      <el-col v-if="isMock" :span="3" class="col-item col-item-mock">
        <MockSelect :schema="items" @showEdit="handleAction({ eventType: 'mock-edit' })" @change="handleChangeMock" />
      </el-col>

      <el-col v-if="showTitle" :span="isMock ? 4 : 5" class="col-item col-item-mock">
        <el-input v-model="data.title" placeholder="标题" size="small">
          <i slot="append" class="el-icon-edit" @click="handleAction({ eventType: 'show-edit', field: 'title' })"></i>
        </el-input>
      </el-col>
      <el-col v-if="!showTitle && showDefaultValue && data.subType != 'object'" :span="isMock ? 4 : 5"
        class="col-item col-item-mock">
        <el-input v-model="data.default" placeholder="默认值" size="small">
          <i slot="append" class="el-icon-edit" @click="handleAction({ eventType: 'show-edit', field: 'default' })"></i>
        </el-input>
      </el-col>
      <el-col :span="isMock ? 2 : 3" class="col-item col-item-setting">
        <span v-if="data.type === 'object'" @click="handleAction({ eventType: 'add-field', isChild: true })">
          <el-tooltip placement="top" content="添加子节点">
            <i class="el-icon-plus plus"></i>
          </el-tooltip>
        </span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import isUndefined from "lodash/isUndefined";
import MockSelect from "../MockSelect";
import SchemaObject from "./SchemaObject";
import { SCHEMA_TYPE } from "../utils";
export default {
  name: "SchemaArrayItem",
  components: { MockSelect, SchemaObject },
  props: {
    isMock: {
      type: Boolean,
      default: false,
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
    action: {
      type: Function,
      default: () => () => { },
    },
  },
  data() {
    return {
      tagPaddingLeftStyle: {},
      schemaTypes: SCHEMA_TYPE,
      items: this.data.items,
      showIcon: false,
    };
  },

  computed: {
    nameArray(position) {
      return [].concat(this.prefixArray, "properties");
    },
    prefixArray() {
      return [].concat(this.prefix, "items");
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
    handleAction(opts) {
      const { prefix, name } = this;
      this.$jsEditorEvent.emit(`schema-update-${this.editorId}`, {
        prefix,
        name: name || "items",
        ...opts,
      });
    },
    handleChangeMock() { },
    handleChangeType(value) {
      console.log(value);
      this.handleAction({ eventType: "schema-type", value });
    },
  },
};
</script>
