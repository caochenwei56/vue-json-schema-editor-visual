<template>
    <div>
        <el-row>
            <el-col :span="6">
                <el-button size="mini" type="primary" @click="handleToggleSchema"
                >改变Schema111
                </el-button
                >
                <el-button size="mini" type="info" @click="handlePageParams"
                >Toggle 分页参数
                </el-button
                >
            </el-col>
            <el-col :span="18">
                <s-json-schema-editor
                        :key="schemaKey"
                        :schema="schema"
                        :show-default-value="true"
                        :show-raw="true"
                        :is-mock="false"
                        @schema-change="onSchemaChange"
                />
            </el-col>
        </el-row>
    </div>
</template>
<script>
// demo解释器无法兼容 import
// import { warningToast, deepClone } from '@sinokit/utils';
export default {
    data() {
        return {
            schemaKey: '1222',
            // schema 对象
            schema: {},
            atlasSchema: {
                type: "object",
                title: "title",
                properties: {
                    entityDefs: {
                        type: "array",
                        title: "title",
                        label: "实体类型",
                        property: 'entityDef',
                        subType: "object",
                        items: [
                            {
                                type: 'object',
                                title: 'title',
                                properties: {
                                    superTypes: {
                                        type: 'array',
                                        title: "title",
                                        label: "父类型",
                                        property: 'superType',
                                        subType: "String",

                                    },
                                    subTypes: {
                                        type: 'array',
                                        title: "title",
                                        label: "子类型",
                                        property: 'subType',
                                        subType: "String",
                                    },
                                    relationshipAttributeDefs: {
                                        type: 'array',
                                        title: "title",
                                        label: "关系属性定义",
                                        property: 'relationshipAttributeDef',
                                        subType: "object",
                                        items: [
                                            {
                                                type: 'object',
                                                title: "title",
                                                label: "关系属性定义",
                                                properties: {
                                                    relationshipTypeName: {
                                                        type: 'String',
                                                        title: "title",
                                                        label: "关系类型名称",
                                                    },
                                                    isLegacyAttribute: {
                                                        type: 'String',
                                                        title: "title",
                                                        label: "是否遗留属性",
                                                    },
                                                }

                                            }
                                        ]
                                    },
                                }
                            },

                        ]
                    },
                    // enumDefs: {
                    //     type: "array",
                    //     title: "title",
                    //     label: "枚举类型",
                    //     items: []
                    // },
                    // structDefs: {
                    //     type: "array",
                    //     title: "title",
                    //     label: "结构体类型",
                    //     items: []
                    // },
                    // classificationDefs: {
                    //     type: "array",
                    //     title: "title",
                    //     label: "分类类型",
                    //     items: []
                    // },
                    // relationshipDefs: {
                    //     type: "array",
                    //     title: "title",
                    //     label: "关系类型",
                    //     items: []
                    // },
                    // businessMetadataDefs: {
                    //     type: "array",
                    //     title: "title",
                    //     label: "业务类型",
                    //     items: []
                    // },
                }
            }
        }
    },
    created() {
    },
    mounted() {
        this.schema = this.atlasSchema
        this.schemaKey = Date.now()
    },
    methods: {
        handleToggleSchema() {
            this.schema = this.atlasSchema
            this.schemaKey = Date.now()
        },
        /**
         * 分页参数添加&删除
         */
        handlePageParams() {
            if (this.schema.type !== 'object') {
                /*  return warningToast(
                    '当前 Schema 不是对象类型，不能添加分页属性',
                    2000
                  ); */
            }
            const cloneSchema = this.schema
            // const cloneSchema = deepClone(this.schema);
            if (cloneSchema.properties.page) {
                delete cloneSchema.properties.page
                delete cloneSchema.properties.size
                this.$nextTick(() => {
                    this.schema = cloneSchema
                    this.schemaKey = Date.now() + ''
                })
                return
            }
            const pageInfo = {
                page: {
                    type: 'number',
                    default: 1,
                    description: '第几页',
                },
                size: {
                    type: 'number',
                    default: 10,
                    description: '每页记录数量',
                },
            }
            Object.assign(cloneSchema.properties, pageInfo)
            this.schema = cloneSchema
            this.schemaKey = Date.now() + ''
        },
        onSchemaChange(v) {
            this.schemaJsonString = JSON.stringify(v, null, 2)
        },
    },
}
</script>
