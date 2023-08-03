<template>
  <div class="array-type">
    <div
      class="option-formStyle"
      v-for="(item, index) in data.items"
      :key="index"
    >
      <template v-if="item.type === 'array'">
        <el-row type="flex" align="middle">
          <el-col
            :span="8"
            class="col-item name-item col-item-name"
            :style="tagPaddingLeftStyle"
          >
            <el-row type="flex" justify="space-around" align="middle">
              <el-col :span="2" class="down-style-col">
                <span class="down-style" @click="handleClickIcon(index)">
                  <i
                    v-if="showIcons[index]"
                    class="el-icon-caret-bottom icon-object"
                  ></i>
                  <i v-else class="el-icon-caret-right icon-object"></i>
                </span>
              </el-col>
              <el-col :span="20">
                <el-input disabled :value="data.label" size="small" />
              </el-col>
              <!-- <el-col :span="2" style="text-align: center">
                <el-tooltip placement="top" content="全选">
                  <el-checkbox disabled />
                </el-tooltip>
              </el-col> -->
            </el-row>
          </el-col>

          <el-col :span="3" class="col-item col-item-type">
            <el-select
              :value="data.subType"
              size="small"
              class="type-select-style"
              @change="handleChangeType"
              disabled
            >
              <el-option
                v-for="item in schemaTypes"
                :key="item"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-col>

          <el-col v-if="isMock" :span="3" class="col-item col-item-mock">
            <MockSelect
              :schema="items"
              @showEdit="handleAction({ eventType: 'mock-edit' })"
              @change="handleChangeMock"
            />
          </el-col>

          <el-col
            v-if="showTitle"
            :span="isMock ? 4 : 5"
            class="col-item col-item-mock"
          >
            <el-input v-model="data.title" placeholder="标题" size="small">
              <i
                slot="append"
                class="el-icon-edit"
                @click="
                  handleAction({ eventType: 'show-edit', field: 'title' })
                "
              ></i>
            </el-input>
          </el-col>
          <el-col
            v-if="!showTitle && showDefaultValue && data.subType != 'object'"
            :span="isMock ? 4 : 5"
            class="col-item col-item-mock"
          >
            <el-input v-model="data.default" placeholder="默认值" size="small">
              <i
                slot="append"
                class="el-icon-edit"
                @click="
                  handleAction({ eventType: 'show-edit', field: 'default' })
                "
              ></i>
            </el-input>
          </el-col>
        </el-row>
        <SchemaArray
          v-show="showIcons[index]"
          :prefix="getPrefixArray(index)"
          :data="item"
          :is-mock="isMock"
          :show-title="showTitle"
          :show-default-value="showDefaultValue"
          :editor-id="editorId"
        />
      </template>
      <template v-if="item.type === 'object'">
        <el-row type="flex" align="middle">
          <el-col
            :span="8"
            class="col-item name-item col-item-name"
            :style="tagPaddingLeftStyle"
          >
            <el-row type="flex" justify="space-around" align="middle">
              <el-col :span="2" class="down-style-col">
                <span class="down-style" @click="handleClickIcon(index)">
                  <i
                    v-if="showIcons[index]"
                    class="el-icon-caret-bottom icon-object"
                  ></i>
                  <i v-else class="el-icon-caret-right icon-object"></i>
                </span>
              </el-col>
              <el-col :span="20">
                <el-input disabled :value="data.label" size="small" />
              </el-col>
              <!-- <el-col :span="2" style="text-align: center">
                <el-tooltip placement="top" content="全选">
                  <el-checkbox disabled />
                </el-tooltip>
              </el-col> -->
            </el-row>
          </el-col>

          <el-col :span="3" class="col-item col-item-type">
            <el-select
              :value="data.subType"
              size="small"
              class="type-select-style"
              @change="handleChangeType"
              disabled
            >
              <el-option
                v-for="item in schemaTypes"
                :key="item"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-col>

          <el-col v-if="isMock" :span="3" class="col-item col-item-mock">
            <MockSelect
              :schema="items"
              @showEdit="handleAction({ eventType: 'mock-edit' })"
              @change="handleChangeMock"
            />
          </el-col>

          <el-col
            v-if="showTitle"
            :span="isMock ? 4 : 5"
            class="col-item col-item-mock"
          >
            <el-input v-model="data.title" placeholder="标题" size="small">
              <i
                slot="append"
                class="el-icon-edit"
                @click="
                  handleAction({ eventType: 'show-edit', field: 'title' })
                "
              ></i>
            </el-input>
          </el-col>
          <el-col
            v-if="!showTitle && showDefaultValue && data.subType != 'object'"
            :span="isMock ? 4 : 5"
            class="col-item col-item-mock"
            @click="
              handleAction({ eventType: 'show-edit', field: 'default' })
            "
          >
            <el-input v-model="data.default" placeholder="默认值" size="small">
              <i
                slot="append"
                class="el-icon-edit"
              ></i>
            </el-input>
          </el-col>
          <el-col :span="1" class="col-item col-item-setting">
            <span
              class="delete-item"
              :class="{ hidden: data.disabled }"
              @click="handleAction({ eventType: 'delete-field',position: index,type:data.type})"
            >
              <i class="el-icon-close close"></i>
            </span>
          </el-col>
        </el-row>
        <SchemaObject
          v-show="showIcons[index]"
          :prefix="getNameArray(index)"
          :data="item"
          :is-mock="isMock"
          :show-title="showTitle"
          :show-default-value="showDefaultValue"
          :editor-id="editorId"
        />
      </template>
    </div>
  </div>
</template>
<script>
import isUndefined from "lodash/isUndefined";
import MockSelect from "../MockSelect";
import SchemaObject from "./SchemaObject";
import { SCHEMA_TYPE } from "../utils";
import DropPlus from "./DropPlus.vue";
export default {
  name: "SchemaArray",
  components: { DropPlus, MockSelect, SchemaObject },
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
      default: () => {},
    },
    action: {
      type: Function,
      default: () => () => {},
    },
    position: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      tagPaddingLeftStyle: {},
      schemaTypes: SCHEMA_TYPE,
      items: this.data.items,
      showIcon: false,
      showIcons: [],
    };
  },

  computed: {
    nameArray() {
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
    let showIconsTmp = [];
    if (this.data && this.data.items && this.data.items.length > 0) {
      for (let i = 0; i < this.data.items.length; i++) {
        showIconsTmp.push(true);
      }
      this.showIcons = showIconsTmp;
    }
  },
  methods: {
    isUndefined() {
      return isUndefined;
    },
    handleClickIcon(index) {
      this.$set(this.showIcons, index, !this.showIcons[index]);
    },
    handleAction(opts) {
      const { prefix, name } = this;
      this.$jsEditorEvent.emit(`schema-update-${this.editorId}`, {
        prefix,
        name: name || "items",
        ...opts,
      });
    },
    handleChangeMock() {},
    handleChangeType(value) {
      console.log(value);
      this.handleAction({ eventType: "schema-type", value });
    },
    getNameArray(position) {
      return [].concat(this.prefix, "items", position, "properties");
    },
    getPrefixArray(position) {
      return [].concat(this.prefix, "items", position);
    },
  },
};
</script>
