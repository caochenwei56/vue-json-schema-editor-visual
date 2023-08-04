import Vue from 'vue';

export const JSONPATH_JOIN_CHAR = '.';
export const lang = 'zh_CN';
export const format = [
    {name: 'date-time'},
    {name: 'date'},
    {name: 'email'},
    {name: 'hostname'},
    {name: 'ipv4'},
    {name: 'ipv6'},
    {name: 'uri'}
];
export const SCHEMA_TYPE = [
    'string',
    'number',
    'array',
    'object',
    'boolean',
    'integer'
];
export const defaultInitSchemaData = {
    entityDefs: {
        type: "array",
        title: "title",
        label: "实体类型",
        property: 'entityDef',
        subType: "object",
        deleteFlg: false,
        addFlg: true,
        items: [
            {
                type: 'object',
                title: 'title',
                properties: {
                    guid: {
                        type: 'string',
                        title: "title",
                        label: "唯一标识",
                    },
                    createdBy: {
                        type: 'string',
                        title: "title",
                        label: "创建人",
                    },
                    updatedBy: {
                        type: 'string',
                        title: "title",
                        label: "更新人",
                    },
                    createTime: {
                        type: 'date',
                        title: "title",
                        label: "创建时间",
                    },
                    updateTime: {
                        type: 'date',
                        title: "title",
                        label: "更新时间",
                    },
                    version: {
                        type: 'long',
                        title: "title",
                        label: "版本",
                    },
                    name: {
                        type: 'string',
                        title: "title",
                        label: "名称",
                    },
                    description: {
                        type: 'string',
                        title: "title",
                        label: "描述",
                    },
                    typeVersion: {
                        type: 'string',
                        title: "title",
                        label: "类型版本",
                    },
                    serviceType: {
                        type: 'string',
                        title: "title",
                        label: "服务类型",
                    },
                    options: {
                        type: 'map',
                        title: "title",
                        label: "选项",
                    },
                    AtlasAttributeDef: {
                        type: 'array',
                        title: "title",
                        label: "属性定义",
                        addFlg: true,
                        property: 'attributeDefs',
                        subType: "object",
                        items: [
                            {
                                type: 'object',
                                title: "title",
                                label: "属性定义",
                                properties: {
                                    name: {
                                        type: 'string',
                                        title: "title",
                                        label: "名称",
                                    },
                                    typeName: {
                                        type: 'string',
                                        title: "title",
                                        label: "类型名称",
                                    },
                                    isOptional: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否可选",
                                    },
                                    valuesMinCount: {
                                        type: 'integer',
                                        title: "title",
                                        label: "最小计数值",
                                    },
                                    valuesMaxCount: {
                                        type: 'integer',
                                        title: "title",
                                        label: "最大计数值",
                                    },
                                    isUnique: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否唯一",
                                    },
                                    isIndexable: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否索引",
                                    },
                                    includeInNotification: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "包含在通知",
                                    },
                                    defaultValue: {
                                        type: 'string',
                                        title: "title",
                                        label: "默认值",
                                    },
                                    description: {
                                        type: 'string',
                                        title: "title",
                                        label: "描述",
                                    },
                                    searchWeight: {
                                        type: 'integer',
                                        title: "title",
                                        label: "搜索权重",
                                        default: -1
                                    },
                                    options: {
                                        type: 'map',
                                        title: "title",
                                        label: "选项",
                                    },
                                    displayName: {
                                        type: 'string',
                                        title: "title",
                                        label: "显示名称",
                                    },
                                    constraints: {
                                        type: 'array',
                                        title: "title",
                                        label: "约束",
                                        addFlg: true,
                                        subType:"object",
                                        property:"constraint",
                                        items: [
                                            {
                                                type: 'object',
                                                title: "title",
                                                label: "约束",
                                                properties: {
                                                    type: {
                                                        type: 'string',
                                                        title: "title",
                                                        label: "类型",
                                                    },
                                                    params: {
                                                        type: 'map',
                                                        title: "title",
                                                        label: "参数",
                                                    },
                                                }
                                            }
                                        ]
                                    },
                                    indexType: {
                                        type: 'enum',
                                        title: "title",
                                        label: "索引类型",
                                        enumList: ['DEFAULT', 'STRING'],

                                    },
                                    cardinality: {
                                        type: 'enum',
                                        title: "title",
                                        label: "基数",
                                        enumList: ['SINGLE', 'LIST', 'SET'],

                                    },
                                }

                            }
                        ]

                    },
                    superTypes: {
                        type: 'array',
                        title: "title",
                        label: "父类型",
                        property: 'superType',
                        subType: "string",

                    },
                    subTypes: {
                        type: 'array',
                        title: "title",
                        label: "子类型",
                        property: 'subType',
                        subType: "string",
                    },

                    relationshipAttributeDefs: {
                        type: 'array',
                        title: "title",
                        label: "关系属性定义",
                        property: 'relationshipAttributeDef',
                        subType: "object",
                        deleteFlg: false,
                        addFlg: true,
                        items: [
                            {
                                type: 'object',
                                title: "title",
                                label: "关系属性定义",
                                properties: {
                                    relationshipTypeName: {
                                        type: 'string',
                                        title: "title",
                                        label: "关系类型名称",
                                    },
                                    isLegacyAttribute: {
                                        type: 'boolean',
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
    enumDefs: {
        type: "array",
        title: "title",
        label: "枚举类型",
        property: 'enumDef',
        subType: "object",
        deleteFlg: false,
        addFlg: true,
        items: [
            {
                type: 'object',
                title: 'title',
                properties: {
                    guid: {
                        type: 'string',
                        title: "title",
                        label: "唯一标识",
                    },
                    createdBy: {
                        type: 'string',
                        title: "title",
                        label: "创建人",
                    },
                    updatedBy: {
                        type: 'string',
                        title: "title",
                        label: "更新人",
                    },
                    createTime: {
                        type: 'date',
                        title: "title",
                        label: "创建时间",
                    },
                    updateTime: {
                        type: 'date',
                        title: "title",
                        label: "更新时间",
                    },
                    version: {
                        type: 'long',
                        title: "title",
                        label: "版本",
                    },
                    name: {
                        type: 'string',
                        title: "title",
                        label: "名称",
                    },
                    description: {
                        type: 'string',
                        title: "title",
                        label: "描述",
                    },
                    typeVersion: {
                        type: 'string',
                        title: "title",
                        label: "类型版本",
                    },
                    serviceType: {
                        type: 'string',
                        title: "title",
                        label: "服务类型",
                    },
                    options: {
                        type: 'map',
                        title: "title",
                        label: "选项",
                    },

                    defaultValue: {
                        type: 'string',
                        title: "title",
                        label: "默认值",
                    },
                    elementDefs: {
                        type: 'array',
                        title: "title",
                        label: "元素定义",
                        subType: "object",
                        addFlg: true,
                        property:"elementDef",
                        items: [
                            {
                                type: 'object',
                                title: 'title',
                                properties: {
                                    value: {
                                        type: 'string',
                                        title: "title",
                                        label: "值",
                                    },
                                    description: {
                                        type: 'string',
                                        title: "title",
                                        label: "描述",
                                    },
                                    ordinal: {
                                        type: 'integer',
                                        title: "title",
                                        label: "序数",
                                    },
                                }
                            }
                        ]
                    },
                }
            }
        ]
    },
    structDefs: {
        type: "array",
        title: "title",
        label: "结构体类型",
        property: 'structDef',
        subType: "object",
        deleteFlg: false,
        addFlg: true,
        items: [{
            type: 'object',
            title: 'title',
            properties: {
                guid: {
                    type: 'string',
                    title: "title",
                    label: "唯一标识",
                },
                createdBy: {
                    type: 'string',
                    title: "title",
                    label: "创建人",
                },
                updatedBy: {
                    type: 'string',
                    title: "title",
                    label: "更新人",
                },
                createTime: {
                    type: 'date',
                    title: "title",
                    label: "创建时间",
                },
                updateTime: {
                    type: 'date',
                    title: "title",
                    label: "更新时间",
                },
                version: {
                    type: 'long',
                    title: "title",
                    label: "版本",
                },
                name: {
                    type: 'string',
                    title: "title",
                    label: "名称",
                },
                description: {
                    type: 'string',
                    title: "title",
                    label: "描述",
                },
                typeVersion: {
                    type: 'string',
                    title: "title",
                    label: "类型版本",
                },
                serviceType: {
                    type: 'string',
                    title: "title",
                    label: "服务类型",
                },
                options: {
                    type: 'map',
                    title: "title",
                    label: "选项",
                },
                AtlasAttributeDef: {
                    type: 'array',
                    title: "title",
                    label: "属性定义",
                    property: 'attributeDefs',
                    subType: "object",
                    addFlg: true,
                    items: [
                        {
                            type: 'object',
                            title: "title",
                            label: "属性定义",
                            properties: {
                                name: {
                                    type: 'string',
                                    title: "title",
                                    label: "名称",
                                },
                                typeName: {
                                    type: 'string',
                                    title: "title",
                                    label: "类型名称",
                                },
                                isOptional: {
                                    type: 'boolean',
                                    title: "title",
                                    label: "是否可选",
                                },
                                valuesMinCount: {
                                    type: 'integer',
                                    title: "title",
                                    label: "最小计数值",
                                },
                                valuesMaxCount: {
                                    type: 'integer',
                                    title: "title",
                                    label: "最大计数值",
                                },
                                isUnique: {
                                    type: 'boolean',
                                    title: "title",
                                    label: "是否唯一",
                                },
                                isIndexable: {
                                    type: 'boolean',
                                    title: "title",
                                    label: "是否索引",
                                },
                                includeInNotification: {
                                    type: 'boolean',
                                    title: "title",
                                    label: "包含在通知",
                                },
                                defaultValue: {
                                    type: 'string',
                                    title: "title",
                                    label: "默认值",
                                },
                                description: {
                                    type: 'string',
                                    title: "title",
                                    label: "描述",
                                },
                                searchWeight: {
                                    type: 'integer',
                                    title: "title",
                                    label: "搜索权重",
                                    default: -1
                                },
                                options: {
                                    type: 'map',
                                    title: "title",
                                    label: "选项",
                                },
                                displayName: {
                                    type: 'string',
                                    title: "title",
                                    label: "显示名称",
                                },
                                constraints: {
                                    type: 'array',
                                    title: "title",
                                    label: "约束",
                                    property:"constraint",
                                    subType:"object",
                                    addFlg:true,
                                    items: [
                                        {
                                            type: 'object',
                                            title: "title",
                                            label: "约束",
                                            properties: {
                                                type: {
                                                    type: 'string',
                                                    title: "title",
                                                    label: "类型",
                                                },
                                                params: {
                                                    type: 'map',
                                                    title: "title",
                                                    label: "参数",
                                                },
                                            }
                                        }
                                    ]
                                },
                                indexType: {
                                    type: 'enum',
                                    title: "title",
                                    label: "索引类型",
                                    enumList: ['DEFAULT', 'STRING'],

                                },
                                cardinality: {
                                    type: 'enum',
                                    title: "title",
                                    label: "基数",
                                    enumList: ['SINGLE', 'LIST', 'SET'],

                                },
                            }

                        }
                    ]

                }
            }
        }]
    },
    classificationDefs: {
        type: "array",
        title: "title",
        label: "分类类型",
        property: 'classificationDef',
        subType: "object",
        deleteFlg: false,
        addFlg: true,
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
                        subType: "string",

                    },
                    subTypes: {
                        type: 'array',
                        title: "title",
                        label: "子类型",
                        property: 'subType',
                        subType: "string",
                    },
                    entityTypes: {
                        type: 'array',
                        title: "title",
                        label: "实体类型",
                        property: 'subType',
                        subType: "string",
                    },
                    guid: {
                        type: 'string',
                        title: "title",
                        label: "唯一标识",
                    },
                    createdBy: {
                        type: 'string',
                        title: "title",
                        label: "创建人",
                    },
                    updatedBy: {
                        type: 'string',
                        title: "title",
                        label: "更新人",
                    },
                    createTime: {
                        type: 'date',
                        title: "title",
                        label: "创建时间",
                    },
                    updateTime: {
                        type: 'date',
                        title: "title",
                        label: "更新时间",
                    },
                    version: {
                        type: 'long',
                        title: "title",
                        label: "版本",
                    },
                    name: {
                        type: 'string',
                        title: "title",
                        label: "名称",
                    },
                    description: {
                        type: 'string',
                        title: "title",
                        label: "描述",
                    },
                    typeVersion: {
                        type: 'string',
                        title: "title",
                        label: "类型版本",
                    },
                    serviceType: {
                        type: 'string',
                        title: "title",
                        label: "服务类型",
                    },
                    options: {
                        type: 'map',
                        title: "title",
                        label: "选项",
                    },
                    AtlasAttributeDef: {
                        type: 'array',
                        title: "title",
                        label: "属性定义",
                        property: 'attributeDefs',
                        subType: "object",
                        addFlg:true,
                        items: [
                            {
                                type: 'object',
                                title: "title",
                                label: "属性定义",
                                properties: {
                                    name: {
                                        type: 'string',
                                        title: "title",
                                        label: "名称",
                                    },
                                    typeName: {
                                        type: 'string',
                                        title: "title",
                                        label: "类型名称",
                                    },
                                    isOptional: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否可选",
                                    },
                                    valuesMinCount: {
                                        type: 'integer',
                                        title: "title",
                                        label: "最小计数值",
                                    },
                                    valuesMaxCount: {
                                        type: 'integer',
                                        title: "title",
                                        label: "最大计数值",
                                    },
                                    isUnique: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否唯一",
                                    },
                                    isIndexable: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否索引",
                                    },
                                    includeInNotification: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "包含在通知",
                                    },
                                    defaultValue: {
                                        type: 'string',
                                        title: "title",
                                        label: "默认值",
                                    },
                                    description: {
                                        type: 'string',
                                        title: "title",
                                        label: "描述",
                                    },
                                    searchWeight: {
                                        type: 'integer',
                                        title: "title",
                                        label: "搜索权重",
                                        default: -1
                                    },
                                    options: {
                                        type: 'map',
                                        title: "title",
                                        label: "选项",
                                    },
                                    displayName: {
                                        type: 'string',
                                        title: "title",
                                        label: "显示名称",
                                    },
                                    constraints: {
                                        type: 'array',
                                        title: "title",
                                        label: "约束",
                                        property:"constraint",
                                        subType:"object",
                                        addFlg:true,
                                        items: [
                                            {
                                                type: 'object',
                                                title: "title",
                                                label: "约束",
                                                properties: {
                                                    type: {
                                                        type: 'string',
                                                        title: "title",
                                                        label: "类型",
                                                    },
                                                    params: {
                                                        type: 'map',
                                                        title: "title",
                                                        label: "参数",
                                                    },
                                                }
                                            }
                                        ]
                                    },
                                    indexType: {
                                        type: 'enum',
                                        title: "title",
                                        label: "索引类型",
                                        enumList: ['DEFAULT', 'STRING'],

                                    },
                                    cardinality: {
                                        type: 'enum',
                                        title: "title",
                                        label: "基数",
                                        enumList: ['SINGLE', 'LIST', 'SET'],

                                    },
                                }

                            }
                        ]

                    }

                }
            },

        ]
    },
    relationshipDefs: {
        type: "array",
        title: "title",
        label: "关系类型",
        property: 'relationshipDef',
        subType: "object",
        deleteFlg: false,
        addFlg: true,
        items: [
            {
                type: 'object',
                title: 'title',
                properties: {
                    guid: {
                        type: 'string',
                        title: "title",
                        label: "唯一标识",
                    },
                    createdBy: {
                        type: 'string',
                        title: "title",
                        label: "创建人",
                    },
                    updatedBy: {
                        type: 'string',
                        title: "title",
                        label: "更新人",
                    },
                    createTime: {
                        type: 'date',
                        title: "title",
                        label: "创建时间",
                    },
                    updateTime: {
                        type: 'date',
                        title: "title",
                        label: "更新时间",
                    },
                    version: {
                        type: 'long',
                        title: "title",
                        label: "版本",
                    },
                    name: {
                        type: 'string',
                        title: "title",
                        label: "名称",
                    },
                    description: {
                        type: 'string',
                        title: "title",
                        label: "描述",
                    },
                    typeVersion: {
                        type: 'string',
                        title: "title",
                        label: "类型版本",
                    },
                    serviceType: {
                        type: 'string',
                        title: "title",
                        label: "服务类型",
                    },
                    options: {
                        type: 'map',
                        title: "title",
                        label: "选项",
                    },

                    AtlasAttributeDef: {
                        type: 'array',
                        title: "title",
                        label: "属性定义",
                        property: 'attributeDefs',
                        subType: "object",
                        addFlg:true,
                        items: [
                            {
                                type: 'object',
                                title: "title",
                                label: "属性定义",
                                properties: {
                                    name: {
                                        type: 'string',
                                        title: "title",
                                        label: "名称",
                                    },
                                    typeName: {
                                        type: 'string',
                                        title: "title",
                                        label: "类型名称",
                                    },
                                    isOptional: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否可选",
                                    },
                                    valuesMinCount: {
                                        type: 'integer',
                                        title: "title",
                                        label: "最小计数值",
                                    },
                                    valuesMaxCount: {
                                        type: 'integer',
                                        title: "title",
                                        label: "最大计数值",
                                    },
                                    isUnique: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否唯一",
                                    },
                                    isIndexable: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "是否索引",
                                    },
                                    includeInNotification: {
                                        type: 'boolean',
                                        title: "title",
                                        label: "包含在通知",
                                    },
                                    defaultValue: {
                                        type: 'string',
                                        title: "title",
                                        label: "默认值",
                                    },
                                    description: {
                                        type: 'string',
                                        title: "title",
                                        label: "描述",
                                    },
                                    searchWeight: {
                                        type: 'integer',
                                        title: "title",
                                        label: "搜索权重",
                                        default: -1
                                    },
                                    options: {
                                        type: 'map',
                                        title: "title",
                                        label: "选项",
                                    },
                                    displayName: {
                                        type: 'string',
                                        title: "title",
                                        label: "显示名称",
                                    },
                                    constraints: {
                                        type: 'array',
                                        title: "title",
                                        label: "约束",
                                        property:"constraint",
                                        subType:"object",
                                        addFlg:true,
                                        items: [
                                            {
                                                type: 'object',
                                                title: "title",
                                                label: "约束",
                                                properties: {
                                                    type: {
                                                        type: 'string',
                                                        title: "title",
                                                        label: "类型",
                                                    },
                                                    params: {
                                                        type: 'map',
                                                        title: "title",
                                                        label: "参数",
                                                    },
                                                }
                                            }
                                        ]
                                    },
                                    indexType: {
                                        type: 'enum',
                                        title: "title",
                                        label: "索引类型",
                                        enumList: ['DEFAULT', 'STRING'],

                                    },
                                    cardinality: {
                                        type: 'enum',
                                        title: "title",
                                        label: "基数",
                                        enumList: ['SINGLE', 'LIST', 'SET'],

                                    },
                                }

                            }
                        ]

                    },
                    relationshipCategory: {
                        type: 'enum',
                        title: "title",
                        label: "关系类型",
                        enumList: [ 'ASSOCIATION', 'AGGREGATION', 'COMPOSITION'],

                    },
                    relationshipLabel: {
                        type: 'string',
                        title: "title",
                        label: "关系标签",

                    },
                    propagateTags: {
                        type: 'enum',
                        title: "title",
                        label: "关系类型",
                        enumList: [  'NONE', 'ONE_TO_TWO', 'TWO_TO_ONE', 'BOTH'],
                    },
                    endDef1: {
                        type: 'object',
                        title: "title",
                        label: "端点1",
                        properties:{
                            type: {
                                type: 'string',
                                title: "title",
                                label: "类型",
                            },
                            name: {
                                type: 'string',
                                title: "title",
                                label: "名称",
                            },
                            isContainer: {
                                type: 'boolean',
                                title: "title",
                                label: "是否为容器",
                            },
                            cardinality: {
                                type: 'enum',
                                title: "title",
                                label: "基数",
                                enumList: ['SINGLE', 'LIST', 'SET'],
                            },
                            isLegacyAttribute: {
                                type: 'boolean',
                                title: "title",
                                label: "是否遗留属性",
                            },
                            description: {
                                type: 'string',
                                title: "title",
                                label: "描述",
                            },
                        }

                    },
                    endDef2: {
                        type: 'object',
                        title: "title",
                        label: "端点1",
                        properties:{
                            type: {
                                type: 'string',
                                title: "title",
                                label: "类型",
                            },
                            name: {
                                type: 'string',
                                title: "title",
                                label: "名称",
                            },
                            isContainer: {
                                type: 'boolean',
                                title: "title",
                                label: "是否为容器",
                            },
                            cardinality: {
                                type: 'enum',
                                title: "title",
                                label: "基数",
                                enumList: ['SINGLE', 'LIST', 'SET'],
                            },
                            isLegacyAttribute: {
                                type: 'boolean',
                                title: "title",
                                label: "是否遗留属性",
                            },
                            description: {
                                type: 'string',
                                title: "title",
                                label: "描述",
                            },
                        }

                    },
                }
            },

        ]
    },
    businessMetadataDefs: {
        type: "array",
        title: "title",
        label: "业务类型",
        property: 'businessMetadataDef',
        subType: "object",
        deleteFlg: false,
        addFlg: true,
        items: [{
            type: 'object',
            title: 'title',
            properties: {
                guid: {
                    type: 'string',
                    title: "title",
                    label: "唯一标识",
                },
                createdBy: {
                    type: 'string',
                    title: "title",
                    label: "创建人",
                },
                updatedBy: {
                    type: 'string',
                    title: "title",
                    label: "更新人",
                },
                createTime: {
                    type: 'date',
                    title: "title",
                    label: "创建时间",
                },
                updateTime: {
                    type: 'date',
                    title: "title",
                    label: "更新时间",
                },
                version: {
                    type: 'long',
                    title: "title",
                    label: "版本",
                },
                name: {
                    type: 'string',
                    title: "title",
                    label: "名称",
                },
                description: {
                    type: 'string',
                    title: "title",
                    label: "描述",
                },
                typeVersion: {
                    type: 'string',
                    title: "title",
                    label: "类型版本",
                },
                serviceType: {
                    type: 'string',
                    title: "title",
                    label: "服务类型",
                },
                options: {
                    type: 'map',
                    title: "title",
                    label: "选项",
                },
                AtlasAttributeDef: {
                    type: 'array',
                    title: "title",
                    label: "属性定义",
                    property: 'attributeDefs',
                    subType: "object",
                    addFlg:true,
                    items: [
                        {
                            type: 'object',
                            title: "title",
                            label: "属性定义",
                            properties: {
                                name: {
                                    type: 'string',
                                    title: "title",
                                    label: "名称",
                                },
                                typeName: {
                                    type: 'string',
                                    title: "title",
                                    label: "类型名称",
                                },
                                isOptional: {
                                    type: 'boolean',
                                    title: "title",
                                    label: "是否可选",
                                },
                                valuesMinCount: {
                                    type: 'integer',
                                    title: "title",
                                    label: "最小计数值",
                                },
                                valuesMaxCount: {
                                    type: 'integer',
                                    title: "title",
                                    label: "最大计数值",
                                },
                                isUnique: {
                                    type: 'boolean',
                                    title: "title",
                                    label: "是否唯一",
                                },
                                isIndexable: {
                                    type: 'boolean',
                                    title: "title",
                                    label: "是否索引",
                                },
                                includeInNotification: {
                                    type: 'boolean',
                                    title: "title",
                                    label: "包含在通知",
                                },
                                defaultValue: {
                                    type: 'string',
                                    title: "title",
                                    label: "默认值",
                                },
                                description: {
                                    type: 'string',
                                    title: "title",
                                    label: "描述",
                                },
                                searchWeight: {
                                    type: 'integer',
                                    title: "title",
                                    label: "搜索权重",
                                    default: -1
                                },
                                options: {
                                    type: 'map',
                                    title: "title",
                                    label: "选项",
                                },
                                displayName: {
                                    type: 'string',
                                    title: "title",
                                    label: "显示名称",
                                },
                                constraints: {
                                    type: 'array',
                                    title: "title",
                                    label: "约束",
                                    property:"constraint",
                                    subType:"object",
                                    addFlg:true,
                                    items: [
                                        {
                                            type: 'object',
                                            title: "title",
                                            label: "约束",
                                            properties: {
                                                type: {
                                                    type: 'string',
                                                    title: "title",
                                                    label: "类型",
                                                },
                                                params: {
                                                    type: 'map',
                                                    title: "title",
                                                    label: "参数",
                                                },
                                            }
                                        }
                                    ]
                                },
                                indexType: {
                                    type: 'enum',
                                    title: "title",
                                    label: "索引类型",
                                    enumList: ['DEFAULT', 'STRING'],

                                },
                                cardinality: {
                                    type: 'enum',
                                    title: "title",
                                    label: "基数",
                                    enumList: ['SINGLE', 'LIST', 'SET'],

                                },
                            }

                        }
                    ]

                }
            }
        }]
    },
}
export const defaultSchema = {
    string: {
        type: 'string'
    },
    number: {
        type: 'number'
    },
    array: {
        type: 'array',
        items: {
            type: 'string'
        }
    },
    object: {
        type: 'object',
        properties: {}
    },
    boolean: {
        type: 'boolean'
    },
    integer: {
        type: 'integer'
    }
};

// 防抖函数，减少高频触发的函数执行的频率
// 请在 constructor 里使用:

// this.func = debounce(this.func, 400);
export const debounce = (func, wait) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
};

export const getData = (state, keys) => {
    let curState = state;
    for (let i = 0; i < keys.length; i++) {
        curState = curState[keys[i]];
    }
    return curState;
};

export const setData = function (state, keys, value) {
    let curState = state;
    for (let i = 0; i < keys.length - 1; i++) {
        curState = curState[keys[i]];
    }
    curState[keys[keys.length - 1]] = value;
};

export const deleteData = function (state, keys) {
    let curState = state;
    for (let i = 0; i < keys.length - 1; i++) {
        curState = curState[keys[i]];
    }

    delete curState[keys[keys.length - 1]];
};

export const getParentKeys = function (keys) {
    if (keys.length === 1) return [];
    const arr = [].concat(keys);
    arr.splice(keys.length - 1, 1);
    return arr;
};

export const clearSomeFields = function (keys, data) {
    const newData = Object.assign({}, data);
    keys.forEach(key => {
        delete newData[key];
    });
    return newData;
};

function getFieldstitle(data) {
    const requiredtitle = [];
    Object.keys(data).map(title => {
        requiredtitle.push(title);
    });

    return requiredtitle;
}

export function handleSchemaRequired(schema, checked) {
    if (schema.type === 'object') {
        const requiredtitle = getFieldstitle(schema.properties);

        // schema.required = checked ? [].concat(requiredtitle) : [];
        if (checked) {
            schema.required = [].concat(requiredtitle);
        } else {
            delete schema.required;
        }

        handleObject(schema.properties, checked);
    } else if (schema.type === 'array') {
        handleSchemaRequired(schema.items, checked);
    } else {
        return schema;
    }
}

function handleObject(properties, checked) {
    for (var key in properties) {
        if (properties[key].type === 'array' || properties[key].type === 'object') {
            handleSchemaRequired(properties[key], checked);
        }
    }
}

export function cloneObject(obj) {
    if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
            var newArr = [];
            obj.forEach(function (item, index) {
                newArr[index] = cloneObject(item);
            });
            return newArr;
        } else {
            var newObj = {};
            for (var key in obj) {
                newObj[key] = cloneObject(obj[key]);
            }
            return newObj;
        }
    } else {
        return obj;
    }
}

export const uuid = () => {
    return Math.random()
        .toString(16)
        .substr(2, 5);
};

export const log = (...args) => {
    if (process && process.env && process.env.NODE_ENV !== 'production') {
        if (
            args[0] &&
            args[0] instanceof Vue &&
            args[0].$vnode['componentOptions']
        ) {
            console.log(
                `component[${args[0].$vnode['componentOptions']['tag']}]:`,
                ...args.slice(1)
            );
        } else {
            console.log(`LOG>>>`, ...args);
        }
    }
};

/**
 * val值不为空字符，null，undefined
 */
export const isNotNil = val => {
    const arr = [undefined, null, ''];
    return !arr.includes(val);
};

/**
 * form表单值校验是否为空，有值为空则返回true，值都正确则返回false
 */
export const isFormValid = obj => {
    if (typeof obj !== 'object') return true;
    const keys = Object.keys(obj);
    return keys.some(key => {
        return !isNotNil(obj[key]);
    });
};
/**
 * 只返回有值得属性新对象
 * @param {Object} formData 表单对象
 */
export const getValidFormVal = formData => {
    const obj = {};
    const keys = Object.keys(formData);
    keys.forEach(key => {
        if (isNotNil(formData[key])) {
            obj[key] = formData[key];
        }
    });

    return obj;
};


export const schemaToJson = data => {
    if (data.type === 'object') {
        let obj = {}
        let properties = data.properties
        for (let key in properties) {
            const value = schemaToJson(properties[key]);
            if(value) {
                obj[key] = value
            }
        }
        return obj
    } else if (data.type === 'array') {
        let arr = []
        data.items && data.items.forEach(item => {
            let obj = schemaToJson(item)
            arr.push(obj)
        })
        return arr
    } else {
        return data.default
    }
}