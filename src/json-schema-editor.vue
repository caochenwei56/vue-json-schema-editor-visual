<template>
    <div>
        <el-button
                v-if="showRaw"
                type="primary"
                size="mini"
                style="margin-bottom: 10px"
                @click="handleReqBodyRaw"
        >RAW查看
        </el-button
        >

        <div class="json-schema-vue-editor">
            <el-row type="flex" align="middle">
                <div>
                    <el-select v-model="typeDefModel" placeholder="请选择" @change="handleChange">
                        <el-option
                                v-for="item in typeDefList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button
                        type="primary"
                        size="mini"
                        style="margin-left: 10px"
                >提交
                </el-button
                >

            </el-row>
            <schema-json
                    :data="schemaData"
                    :is-mock="isMock"
                    :show-title="showTitle"
                    :show-default-value="showDefaultValue"
                    :editor-id="editorId"
            />
            <!-- RAW弹窗 -->
            <RawDialog
                    v-if="showRaw"
                    :visible.sync="rawDialogVisible"
                    :schema="schemaData"
            />
            <StringDialog
                    :visible.sync="stringDialogVisible"
                    :init-data="stringModalData"
            />
            <DateDialog
                    :visible.sync="dateDialogVisible"
                    :init-data="dateModalData"
            />
            <IntegerDialog
                    :visible.sync="integerDialogVisible"
                    :init-data="integerModalData"
            />
            <BooleanDialog
                    :visible.sync="booleanDialogVisible"
                    :init-data="booleanModalData"
            />
            <ArrayDialog4String
                    :visible.sync="arrayDialog4StringVisible"
                    :init-data="arrayModal4StringData"
            />
            <MapDialog
                    :visible.sync="mapDialogVisible"
                    :init-data="mapModalData"
            />
            <EnumDialog
                    :visible.sync="enumDialogVisible"
                    :init-data="enumModalData"
            />
            
        </div>
    </div>
</template>
<script>
import set from 'lodash/set'
import get from 'lodash/get'
import unset from 'lodash/unset'
import cloneDeep from 'lodash/cloneDeep'
import SchemaJson from './Schema'
import MockSelect from './MockSelect'
import './jsonschema.scss'
import {
    BasicDialog,
    StringDialog,
    DateDialog,
    NumberDialog,
    IntegerDialog,
    ArrayDialog,
    BooleanDialog,
    ObjectDialog,
    RawDialog,
    ArrayDialog4String,
    MapDialog,
    EnumDialog,
} from './dialog'
import {
    SCHEMA_TYPE,
    log,
    JSONPATH_JOIN_CHAR,
    defaultSchema,
    uuid,
    defaultInitSchemaData,
    handleSchemaRequired,
    cloneObject,
    deleteData,
} from './utils'

export default {
    name: 'SJsonSchemaEditor',
    components: {
        ArrayDialog4String,
        MockSelect,
        SchemaJson,
        BasicDialog,
        StringDialog,
        DateDialog,
        NumberDialog,
        IntegerDialog,
        ArrayDialog,
        BooleanDialog,
        ObjectDialog,
        RawDialog,
        MapDialog,
        EnumDialog
    },
    props: {
        isMock: {type: Boolean, default: false},
        showTitle: {type: Boolean, default: false},
        showDefaultValue: {type: Boolean, default: false},
        showRaw: {type: Boolean, default: false},
    },
    data() {
        const visibleObj = {}
        SCHEMA_TYPE.map((type) => {
            visibleObj[type] = false
        })
        const initSchema = this.schema || defaultInitSchemaData
        return {
            typeDefModel: [],
            typeDefList: [
                {
                    value: 0,
                    label: '枚举类型'
                }, {
                    value: 1,
                    label: '结构体类型'
                }, {
                    value: 2,
                    label: '分类类型'
                }, {
                    value: 3,
                    label: '实体类型'
                }, {
                    value: 4,
                    label: '关系类型'
                }, {
                    value: 5,
                    label: '业务类型'
                }
            ],
            editorId: uuid(),
            checked: false,
            disabled: false,
            show: true,
            schemaTypes: SCHEMA_TYPE,
            schemaData: {
                type: "object",
                title: "title",
                properties: {}
            },
            rawDialogVisible: false,
            basicDialogVisible: false,
            basicModalData: {title: '', value: ''},
            booleanDialogVisible: false,
            booleanModalData: {title: '', value: ''},
            arrayDialog4StringVisible: false,
            arrayModal4StringData: {title: '', value: ''},
            stringDialogVisible: false,
            stringModalData: {title: '', value: ''},
            dateDialogVisible: false,
            dateModalData: {title: '', value: ''},
            mapDialogVisible: false,
            mapModalData: {title: '', value: ''},
            integerDialogVisible: false,
            integerModalData: {title: '', value: ''},
            enumDialogVisible: false,
            enumModalData: {title: '', value: ''},

            settingDialogVisible: visibleObj,
            settingModalData: {},
        }
    },
    watch: {
        schemaData: {
            handler(newVal) {
                log(this, 'watch', newVal)
            },
            deep: true,
        },
    },
    mounted() {
        log(this, this.schemaData)
        this.$jsEditorEvent.on(
            `schema-update-${this.editorId}`,
            this.handleSchemaUpdateEvent
        )
    },
    beforeDestroy() {
        this.$jsEditorEvent.off(
            `schema-update-${this.editorId}`,
            this.handleSchemaUpdateEvent
        )
    },
    methods: {
        handleSchemaUpdateEvent(options) {
            const {eventType, ...opts} = options
            switch (eventType) {
                case 'add-field':
                    this.addFieldAction(opts)
                    break
                case 'delete-field':
                    this.deleteFieldAction(opts)
                    break
                case 'update-field-name':
                    this.updateFieldNameAction(opts)
                    break
                case 'schema-type':
                    this.handleChangeType(opts)
                    break
                case 'show-edit':
                    this.handleShowEdit(opts)
                    break
                case 'save-showedit':
                    this.handleSaveShowEdit(opts)
                    break
                case 'setting':
                    this.handleSettingAction(opts)
                    break
                case 'save-setting':
                    this.handleSaveSetting(opts)
                    break
                case 'toggle-required':
                    this.enableRequireAction(opts)
                    break
                default:
                    break
            }
        },
        handleClickIcon() {
            this.show = !this.show
        },
        changeCheckBox(e) {
            this.requireAllAction({required: e, value: this.schemaData})
        },
        requireAllAction(opts) {
            const {value, required} = opts
            const cloneSchema = cloneObject(value)
            handleSchemaRequired(cloneSchema, required)
            this.forceUpdate(cloneSchema)
            this.handleEmitChange(cloneSchema)
        },
        enableRequireAction(opts) {
            const {prefix, name, required} = opts
            const prefixCopy = cloneDeep(prefix)
            prefixCopy.pop()
            const parentKeys = [...prefixCopy]
            const parentPrefix = parentKeys.join(JSONPATH_JOIN_CHAR)
            const cloneSchema = cloneDeep(this.schemaData)
            let parentData = null
            if (!parentPrefix) {
                // 一级属性
                parentData = cloneSchema
            } else {
                parentData = get(cloneSchema, parentPrefix)
            }
            const requiredData = [].concat(parentData.required || [])
            const index = requiredData.indexOf(name)
            // 取消必填
            if (!required && index >= 0) {
                requiredData.splice(index, 1)
                parentKeys.push('required')
                if (requiredData.length === 0) {
                    deleteData(cloneSchema, parentKeys)
                } else {
                    set(cloneSchema, parentKeys, requiredData)
                }
            } else if (required && index === -1) {
                // 必填
                requiredData.push(name)
                parentKeys.push('required')
                set(cloneSchema, parentKeys, requiredData)
            }
            this.forceUpdate(cloneSchema)
            this.handleEmitChange(cloneSchema)
        },
        /**
         * 处理新增字段
         * @param isChild 新增子节点
         * @param action 字段和路径
         */
        addFieldAction(opts) {
            log(this, opts)
            const {isChild, name, prefix} = opts
            let parentPrefix = ''
            let requirePrefix = []
            if (isChild) {
                const tempArr = [].concat(prefix, name)
                if (opts.type === 'array') {
                    parentPrefix = tempArr.concat('items').join(JSONPATH_JOIN_CHAR)
                } else {
                    parentPrefix = tempArr.concat('properties').join(JSONPATH_JOIN_CHAR)
                }
                requirePrefix = [...tempArr]
            } else {
                parentPrefix = prefix.join(JSONPATH_JOIN_CHAR)
                const tempPrefix = [].concat(prefix)
                tempPrefix.pop()
                requirePrefix = tempPrefix
            }
            log('addFieldAction>>>', parentPrefix, '\n\t')
            let newPropertiesData = {}
            const ranName = 'field_' + uuid()
            let cloneSchema = null;
            const propertiesData = get(this.schemaData, parentPrefix)
            if (opts.type === 'array') {
                if (!propertiesData || propertiesData.length == 0) {
                    return
                }
                let singlePropertiesData = propertiesData[propertiesData.length - 1]
                propertiesData.push(singlePropertiesData)
                newPropertiesData = [...propertiesData]
                // newPropertiesData[ranName] = cloneDeep(defaultSchema.string)
                cloneSchema = cloneDeep(this.schemaData)
            } else {
                newPropertiesData = Object.assign({}, propertiesData)
                newPropertiesData[ranName] = cloneDeep(defaultSchema.string)
                cloneSchema = cloneDeep(this.schemaData)
            }

            set(cloneSchema, parentPrefix, newPropertiesData)


            // add required
            let pRequiredData = null
            if (!requirePrefix.length) {
                // 一级属性
                pRequiredData = cloneSchema
            } else {
                pRequiredData = get(cloneSchema, requirePrefix)
            }
            const requiredData = [].concat(pRequiredData.required || [])
            requiredData.push(ranName)
            requirePrefix.push('required')
            set(cloneSchema, requirePrefix, requiredData)
            // update schema
            this.schemaData = cloneSchema
            this.forceUpdate(cloneSchema)
            this.handleEmitChange(cloneSchema)
        },

        // 删除字段
        deleteFieldAction(opts) {
            const {name, prefix} = opts
            const position = opts.position
            const curFieldPath = [].concat(prefix, name).join(JSONPATH_JOIN_CHAR)
            if (opts.type && opts.type === 'array') {
                const propertiesData = get(this.schemaData, curFieldPath)

                if (propertiesData && propertiesData.length > position) {
                    propertiesData.splice(position, 1)
                    const cloneSchema = cloneDeep(this.schemaData)
                    this.schemaData = cloneSchema
                    this.forceUpdate()
                    this.handleEmitChange(cloneSchema)
                }

            } else {
                const cloneSchema = cloneDeep(this.schemaData)
                unset(cloneSchema, curFieldPath)
                this.schemaData = cloneSchema
                this.forceUpdate()
                this.handleEmitChange(cloneSchema)
            }


        },

        // 更新字段名称
        updateFieldNameAction(opts) {
            log(this, opts)
            const {value, name, prefix} = opts
            let requirePrefix = []
            const prefixCopy = cloneDeep(prefix)
            prefixCopy.pop()
            requirePrefix = prefixCopy // 上级 required路径
            const parentPrefix = prefix.join(JSONPATH_JOIN_CHAR)
            const curFieldPath = prefix.concat(name).join(JSONPATH_JOIN_CHAR)
            const cloneSchema = cloneDeep(this.schemaData)
            const propertiesData = get(cloneSchema, curFieldPath) // 原来的值
            unset(cloneSchema, curFieldPath) // 移除

            set(cloneSchema, `${parentPrefix}.${value}`, propertiesData) // 添加

            // update required name
            let pRequiredData = null
            if (!requirePrefix.length) {
                // 一级属性
                pRequiredData = cloneSchema
            } else {
                pRequiredData = get(cloneSchema, requirePrefix)
            }
            let requiredData = [].concat(pRequiredData.required || [])
            requiredData = requiredData.map((item) => {
                if (item === name) return value
                return item
            })
            requirePrefix.push('required')
            set(cloneSchema, requirePrefix, requiredData)

            this.schemaData = cloneSchema
            this.forceUpdate()
            this.handleEmitChange(cloneSchema)
        },
        // root
        handleChangeType2(value) {
            this.schemaData.type = value
            const parentDataItem = this.schemaData.description
                ? {description: this.schemaData.description}
                : {}
            const newParentDataItem = defaultSchema[value]
            const newParentData = Object.assign({}, newParentDataItem, parentDataItem)
            this.schemaData = newParentData
            this.handleEmitChange(this.schemaData)
        },
        // schema 类型变化
        handleChangeType(opts) {
            log(this, opts, 2)
            const {value, name, prefix} = opts
            const parentPrefix = [].concat(prefix, name)
            const cloneSchema = cloneDeep(this.schemaData)
            const parentData = get(cloneSchema, parentPrefix)
            const newParentDataItem = defaultSchema[value] // 重置当前 schema 为默认值
            // 保留备注信息
            const parentDataItem = parentData.description
                ? {description: parentData.description}
                : {}

            const newParentData = Object.assign({}, newParentDataItem, parentDataItem)
            set(cloneSchema, parentPrefix, newParentData)
            this.schemaData = cloneSchema
            this.forceUpdate()
            this.handleEmitChange(cloneSchema)
        },
        // title & description 编辑
        handleShowEdit(opts) {
            const {field, name, prefix, isRoot} = opts
            log(this, 'handleShowEdit', name, prefix)

            let parentData
            if (isRoot) {
                parentData = this.schemaData
            } else {
                const parentPrefix = [].concat(prefix, name)
                parentData = get(this.schemaData, parentPrefix)
            }
            // disable 的时候，return事件处理
            if (
                (field === 'default' && (parentData.type === 'array' && parentData.subType === 'object')) ||
                parentData.type === 'object'
            ) {
                return
            }

            if (parentData.type === 'array' && parentData.subType === 'string') {
                this.arrayDialog4StringVisible = true
                Object.assign(this.arrayModal4StringData, {
                    title:
                        field === 'title' ? '标题' : field === 'default' ? `${parentData.label} (数组)` : '描述',
                    value: parentData[field],
                    editorId: this.editorId,
                    ...opts,
                })
            }

            if (parentData.type === 'boolean') {
                this.booleanDialogVisible = true
                Object.assign(this.booleanModalData, {
                    title:
                        field === 'title' ? '标题' : field === 'default' ? `${parentData.label} (布尔})` : '描述',
                    value: parentData[field],
                    editorId: this.editorId,
                    ...opts,
                })
                return;
            }
            if(parentData.type === 'string') {
                this.stringDialogVisible = true
                Object.assign(this.stringModalData, {
                    title:
                        field === 'title' ? '标题' : field === 'default' ? `${parentData.label} (字符串)` : '描述',
                    value: parentData[field],
                    editorId: this.editorId,
                    ...opts,
                })
                return;
            }
            if(parentData.type === 'date') {
                this.dateDialogVisible = true
                Object.assign(this.dateModalData, {
                    title:
                        field === 'title' ? '标题' : field === 'default' ? `${parentData.label} (日期)` : '描述',
                    value: parentData[field],
                    editorId: this.editorId,
                    ...opts,
                })
                return;
            }
            if(parentData.type === 'long' || parentData.type === 'integer') {
                this.integerDialogVisible = true
                Object.assign(this.integerModalData, {
                    title:
                        field === 'title' ? '标题' : field === 'default' ? `${parentData.label} (整数)` : '描述',
                    value: parentData[field],
                    editorId: this.editorId,
                    ...opts,
                })
                return;
            }
            if(parentData.type === 'map') {
                Object.assign(this.mapModalData, {
                    title:
                        field === 'title' ? '标题' : field === 'default' ? `${parentData.label} (对象)` : '描述',
                    value:  parentData[field],
                    editorId: this.editorId,
                    ...opts,
                })
                console.log(JSON.stringify(this.mapModalData, null, 2))
                let temp = cloneDeep(this.mapModalData)
                this.mapModalData = {}
                this.$nextTick(() => {
                    this.mapModalData = temp
                    console.log(JSON.stringify(this.mapModalData, null, 2))
                    this.mapDialogVisible = true
                })

                return;
            }
            if(parentData.type === 'enum') {
                console.log('parentData---', parentData)
                console.log('enumModalData---', this.enumModalData)
                Object.assign(this.enumModalData, {
                    title:
                        field === 'title' ? '标题' : field === 'default' ? `${parentData.label} (枚举)` : '描述',
                    value:  parentData[field],
                    enumList: parentData.enumList,
                    editorId: this.editorId,
                    ...opts,
                })
                let temp = cloneDeep(this.enumModalData)
                this.enumModalData = {}
                this.$nextTick(() => {
                    this.enumModalData = temp
                    console.log('enumModalData---', this.enumModalData)
                })
                this.enumDialogVisible = true

                return;
            }


        },
        handleSaveShowEdit(opts) {
            console.log("---handleSaveShowEdit----")
            const {value, field, name, prefix, isRoot} = opts
            // console.log(field, value)
            let parentPrefix
            const cloneSchema = cloneDeep(this.schemaData)
            if (isRoot) {
                cloneSchema[field] = value
            } else {
                parentPrefix = [].concat(prefix, name, field)
                set(cloneSchema, parentPrefix, value)
            }

            this.schemaData = cloneSchema
            this.forceUpdate()
            this.handleEmitChange(cloneSchema)
        },
        // 高级设置
        handleSettingAction(opts) {
            const {schemaType, name, prefix, isRoot} = opts
            // console.log(schemaType)
            this.settingDialogVisible[schemaType] = true

            let parentData
            if (isRoot) {
                parentData = this.schemaData
            } else {
                const parentPrefix = [].concat(prefix, name)
                parentData = get(this.schemaData, parentPrefix)
            }

            this.settingModalData = {
                schemaType,
                name,
                isRoot,
                prefix,
                editorId: this.editorId,
                ...parentData,
            }
        },
        // 高级设置更新 schema
        handleSaveSetting(opts) {
            const {name, prefix, newData, isRoot} = opts
            const cloneSchema = cloneDeep(this.schemaData)
            console.log(isRoot)
            if (isRoot) {
                Object.assign(cloneSchema, {...newData})
            } else {
                const parentPrefix = [].concat(prefix, name)
                const oldData = get(cloneSchema, parentPrefix)
                set(cloneSchema, parentPrefix, {...oldData, ...newData})
            }
            this.schemaData = cloneSchema
            this.forceUpdate()
            this.handleEmitChange(cloneSchema)
        },
        handleChangeMock() {
        },
        handleReqBodyRaw() {
            this.rawDialogVisible = true
            this.forceUpdate()
        },
        // 解决嵌套对象属性无法刷新页面问题
        forceUpdate(data) {
            const temp = data || this.schemaData
            this.schemaData = {}
            this.$nextTick(() => {
                this.schemaData = temp
            })
        },
        handleEmitChange(schema) {
            // console.log(schema)
            this.$emit('schema-change', schema)
            this.$emit('update:schema', schema)
        },
        handleChange(e) {
            let schema = {
                type: "object",
                title: "title",
                properties: {}
            }
            if (e == 0) {
                schema.properties["enumDefs"] = defaultInitSchemaData["enumDefs"]
            }else if (e == 1) {
                schema.properties["structDefs"] = defaultInitSchemaData["structDefs"]
            }else if (e == 2) {
                schema.properties["classificationDefs"] = defaultInitSchemaData["classificationDefs"]
            }else if (e == 3) {
                schema.properties["entityDefs"] = defaultInitSchemaData["entityDefs"]
            }else if (e == 4) {
                schema.properties["relationshipDefs"] = defaultInitSchemaData["relationshipDefs"]
            }else if (e == 5) {
                schema.properties["businessMetadataDefs"] = defaultInitSchemaData["businessMetadataDefs"]
            }
            this.forceUpdate(schema)
            
        }
    },
}
</script>
<style lang="css">
.cus-label {
    height: 32px;
    line-height: 32px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    font-size: 13px;
}
.ellipsis {
    text-overflow :ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
    white-space :nowrap; /*让文字不换行*/
    overflow : hidden; /*超出要隐藏*/
}
</style>
