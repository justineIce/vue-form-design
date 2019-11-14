export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    hideTitle:false,
    icon: 'icon-input',
    className:'form-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      readonly:false,
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'textarea',
    name: '多行文本',
    hideTitle:false,
    icon: 'icon-diy-com-textarea',
    className:'form-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      readonly:false,
      pattern: '',
      placeholder: ''
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'number',
    name: '计数器',
    icon: 'icon-number',
    hideTitle:false,
    className:'form-number',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      controls:true,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: 'right'
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'icon-radio-active',
    hideTitle:false,
    className:'form-radio',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
      dictCode:'',//数据字典
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'icon-check-box',
    hideTitle:false,
    className:'form-checkbox',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: '',
      disabled: false,
      dictCode:'',//数据字典
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'icon-time',
    hideTitle:false,
    className:'form-time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'icon-date',
    hideTitle:false,
    className:'form-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '',
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'rate',
    name: '评分',
    icon: 'icon-pingfen1',
    hideTitle:false,
    className:'form-rate',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'color',
    name: '颜色选择器',
    icon: 'icon-color',
    hideTitle:false,
    className:'form-color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'icon-select',
    hideTitle:false,
    className:'form-select',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '',
      options: [
        {
          value: '下拉框1'
        },
        {
          value: '下拉框2'
        },{
          value: '下拉框3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'icon-switch',
    hideTitle:false,
    className:'form-switch',
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'icon-slider',
    hideTitle:false,
    className:'form-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'text',
    name: '文字',
    icon: 'icon-wenzishezhi-',
    // hideTitle:false,
    hideLabel:true,
    className:'form-text',
    options: {
      defaultValue: '这是一段文本',
      customClass: '',
        width:"100%",
        align:"left",
        fontSize:16,
        lineHeight:"",
        fontColor:"#000000",
        fontBold:false,
        fontItalic:false,
        fontUnderline:false,
        fontLineThrough:false,
    },
      auth:false,
      authTitle:'',
      authField:''
  }
]

export const advanceComponents = [
  {
    type: 'blank',
    name: '自定义',
    icon: 'icon-zidingyishuju',
    hideTitle:false,
    className:'form-blank',
    options: {
      defaultType: 'String',
      required: false,
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'imgupload',
    name: '图片上传',
    icon: 'icon-tupian',
    hideTitle:false,
    className:'form-tupian',
    options: {
      required: false,
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: 'http://pfp81ptt6.bkt.clouddn.com/',
      disabled: false,
      length: 8,
      multiple: false,
      isQiniu: false,
      // isDelete: false,
      // min: 0,
      // isEdit: false,
      action: 'https://jsonplaceholder.typicode.com/photos/'
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: 'editor',
    name: '编辑器',
    icon: 'icon-fuwenbenkuang',
      hideTitle:false,
      className:'form-editor',
    options: {
      defaultValue: '',
      width: '',
        required: false,
        disabled: false,
    },
      auth:false,
      authTitle:'',
      authField:''
  },
  {
    type: 'cascader',
    name: '级联选择器',
    icon: 'icon-jilianxuanze',
    hideTitle:false,
    className:'form-cascader',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      disabled: false,
      required: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteFunc: ''
    },
    auth:false,
    authTitle:'',
    authField:''
  },
  {
    type: "buttons",
    name: "按钮",
    className: "form-buttons",
    hideLabel: true,
    icon: "icon-btn",
    hideTitle: true,
    options: {
      text: "按钮",
      icon: "",
      type: "default",
      btnSize: "default",
      plain: false,
      round: false,
      circle: false,
      disabled: false,
    },
    event: {
      click: ""
    },
    auth:false,
    authTitle:'',
    authField:''
  }
]

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    icon: 'icon-grid-',
    className:'form-grid',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    },
    auth:false,
    authTitle:'',
    authField:''
  }
]
