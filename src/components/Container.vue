<template>
  <el-container class="fm2-container">
    <el-main class="fm2-main">
      <el-container>
        <!--控件区域-->
        <el-aside width="250px">
          <div class="components-list">
            <template v-if="basicFields.length">
              <div class="widget-cate">基础字段</div>
              <draggable tag="ul" :list="basicComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove">
                <li v-if="basicFields.indexOf(item.type)>=0" class="form-edit-widget-label" :class="{'no-put': item.type == 'divider'}" v-for="(item, index) in basicComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>
            <template v-if="advanceFields.length">
              <div class="widget-cate">高级字段</div>
              <draggable tag="ul" :list="advanceComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove">
                <li v-if="advanceFields.indexOf(item.type) >= 0" class="form-edit-widget-label" :class="{'no-put': item.type == 'table'}" v-for="(item, index) in advanceComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>
            <template v-if="layoutFields.length">
              <div class="widget-cate">布局字段</div>
              <draggable tag="ul" :list="layoutComponents"
                v-bind="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                @end="handleMoveEnd"
                @start="handleMoveStart"
                :move="handleMove">
                <li v-if="layoutFields.indexOf(item.type) >=0" class="form-edit-widget-label no-put" v-for="(item, index) in layoutComponents" :key="index">
                  <a>
                    <i class="icon iconfont" :class="item.icon"></i>
                    <span>{{item.name}}</span>
                  </a>
                </li>
              </draggable>
            </template>
          </div>
        </el-aside>

        <!--内容区域-->
        <el-container class="center-container" direction="vertical">
          <el-header class="btn-bar" style="height: 45px;">
            <slot name="action">
            </slot>
            <el-button v-if="upload" type="text" size="medium" icon="el-icon-upload2" @click="handleUpload">导入JSON</el-button>
            <el-button v-if="clearable" type="text" size="medium" icon="el-icon-delete" @click="handleClear">清空</el-button>
            <el-button v-if="preview" type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
            <el-button v-if="generateJson" type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
            <el-button v-if="generateCode" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button>
          </el-header>
          <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
            <widget-form v-if="!resetJson"  ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
          </el-main>
        </el-container>

        <!--字段、表单设置区域-->
        <el-aside class="widget-config-container">
          <el-container>
            <el-header height="45px">
              <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
              <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
            </el-header>
            <el-main class="config-content">
              <widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :fields="widgetForm.config.fields "></widget-config>
              <form-config v-show="configTab=='form'" :data="widgetForm.config" :onlineForms="onlineForms" @on-change="handleFormChange"></form-config>
            </el-main>
          </el-container>
        </el-aside>

        <!--预览弹出框-->
        <cus-dialog :visible="previewVisible" @on-close="previewVisible = false" ref="widgetPreview" width="1000px" form>
          <generate-form insite="true" @on-change="handleDataChange" v-if="previewVisible" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs" ref="generateForm">
            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
          </generate-form>
          <template slot="action">
            <el-button type="primary" @click="handleTest">获取数据</el-button>
            <el-button @click="handleReset">重置</el-button>
          </template>
        </cus-dialog>

        <!--导入JSON弹出框-->
        <cus-dialog :visible="uploadVisible" @on-close="uploadVisible = false" @on-submit="handleUploadJson" ref="uploadJson" width="800px" form>
          <el-alert type="info" title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"></el-alert>
          <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
        </cus-dialog>

        <!--生成JSON弹出框-->
        <cus-dialog :visible="jsonVisible" @on-close="jsonVisible = false" ref="jsonPreview" width="800px" form>
          <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>
          <template slot="action">
            <el-button type="primary" class="json-btn" :data-clipboard-text="jsonCopyValue">复制数据</el-button>
          </template>
        </cus-dialog>

        <!--生成代码-->
        <cus-dialog :visible="codeVisible" @on-close="codeVisible = false" ref="codePreview" width="800px" form :action="false">
          <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
        </cus-dialog>
      </el-container>
    </el-main>
  </el-container>

</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './WidgetConfig'
import FormConfig from './FormConfig'
import WidgetForm from './WidgetForm'
import CusDialog from './CusDialog'
import GenerateForm from './GenerateForm'
import Clipboard from 'clipboard'
import {basicComponents, layoutComponents, advanceComponents} from './componentsConfig.js'
import {loadJs, loadCss} from '../util/index.js'
import request from '../util/request.js'
import generateCode from './generateCode.js'

export default {
  name: 'fm-making-form',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  props: {
    /**
     *是否显示预览按钮
     */
    preview: {
      type: Boolean,
      default: false
    },
    /**
     *是否显示生成代码按钮
     */
    generateCode: {
      type: Boolean,
      default: false
    },
    /**
     *是否显示生成JSON按钮
     */
    generateJson: {
      type: Boolean,
      default: false
    },
    /**
     *是否显示导入JSON按钮
     */
    upload: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示清空按钮
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     * 设计器左侧基础字段配置，如果不设置该字段默认展示所有基础字段组件
     * ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text']
     */
    basicFields: {
      type: Array,
      default: () => ['input', 'textarea', 'number', 'radio', 'checkbox', 'time', 'date', 'rate', 'color', 'select', 'switch', 'slider', 'text']
    },
    /**
     * 设计器左侧高级字段配置，如果不设置该字段默认展示所有高级字段组件
     *['blank' 'imgupload', 'editor', 'cascader']
     */
    advanceFields: {
      type: Array,
      default: () => ['blank', 'imgupload', 'editor', 'cascader','buttons']
    },
    /**
     * 设计器左侧布局字段配置，如果不设置该字段默认展示所有布局字段组件
     * ['grid', 'tabs', 'divider']
     */
    layoutFields: {
      type: Array,
      default: () => ['grid','table']
    },
    /**
     * 表单数据
     * [{label:'',value:'',children:[]}]
     */
    onlineForms:{
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      resetJson: false,
      widgetForm: {
        list: [],
        config: {
          onlineForm:'',
          fields:[],
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small',
          allowPrint:false,//允许打印
        },
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      uploadVisible: false,
      remoteFuncs: {
        func_test (resolve) {
          setTimeout(() => {
            const options = [
              {id: '1', name: '1111'},
              {id: '2', name: '2222'},
              {id: '3', name: '3333'}
            ]

            resolve(options)
          }, 2000)
        },
        funcGetToken (resolve) {
          request.get('http://tools-server.xiaoyaoji.cn/api/uptoken').then(res => {
            resolve(res.uptoken)
          })
        },
        upload_callback (response, file, fileList) {
          console.log('callback', response, file, fileList)
        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      uploadEditor: null,
      jsonCopyValue: '',
      jsonClipboard: null,
      jsonEg: `{
  "list": [
    {
      "type": "input",
      "name": "单行文本",
      "icon": "icon-input",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "dataType": "string",
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908864000_94322"
      },
      "key": "1540908864000_94322",
      "model": "input_1540908864000_94322",
      "rules": [
        {
          "type": "string",
          "message": "单行文本格式不正确"
        }
      ]
    },
    {
      "type": "textarea",
      "name": "多行文本",
      "icon": "icon-diy-com-textarea",
      "options": {
        "width": "100%",
        "defaultValue": "",
        "required": false,
        "pattern": "",
        "placeholder": "",
        "remoteFunc": "func_1540908876000_19435"
      },
      "key": "1540908876000_19435",
      "model": "textarea_1540908876000_19435",
      "rules": []
    }
  ],
  "config": {
    "labelWidth": 100,
    "labelPosition": "top",
    "size": "small"
  }
}`
    }
  },
  mounted () {

  },
  methods: {
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    //预览
    handlePreview () {
      console.log(this.widgetForm)
      this.previewVisible = true
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleReset () {
      this.$refs.generateForm.reset()
    },
    //生成JSON
    handleGenerateJson () {
      this.jsonVisible = true
      this.jsonTemplate = this.widgetForm
      console.log(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {

        const editor = ace.edit('jsoneditor')
        editor.session.setMode("ace/mode/json")

        if (!this.jsonClipboard) {
          this.jsonClipboard = new Clipboard('.json-btn')
          this.jsonClipboard.on('success', (e) => {
            this.$message.success('复制成功')
          })
        }
        this.jsonCopyValue = JSON.stringify(this.widgetForm)
      })
    },
    //生成代码
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        const editor = ace.edit('codeeditor')
        editor.session.setMode("ace/mode/html")
      })
    },
    //导入JSON
    handleUpload () {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.uploadEditor = ace.edit('uploadeditor')
        this.uploadEditor.session.setMode("ace/mode/json")
      })
    },
    handleUploadJson () {
      try {
        this.setJSON(JSON.parse(this.uploadEditor.getValue()))
        this.uploadVisible = false
      } catch (e) {
        this.$message.error(e.message)
        this.$refs.uploadJson.end()
      }
    },
    //清空
    handleClear () {
      this.widgetForm = {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small',
          customClass: '',
          onlineForm:'',
          fields:[],
        }
      }

      this.widgetFormSelect = {}
    },
    handleInput (val) {
      console.log(val)
      this.blank = val
    },
    handleDataChange (field, value, data) {
      console.log(field, value, data)
    },
    //表单值改变事件
    handleFormChange (data) {
      if(data.onlineForm !=""){
        let forms = this.onlineForms.find(obj => obj.value == data.onlineForm)
        this.widgetForm.config.fields = forms.children
      }
    },
    /**
     *设置设计器的配置信息
     */
    getJSON () {
      return this.widgetForm
    },
    /**
     *获取设计器生成的可以直接使用的HTML代码
     */
    getHtml () {
      return generateCode(JSON.stringify(this.widgetForm))
    },
    /**
     * 获取设计器配置的JSON数据
     * @param json
     */
    setJSON (json) {
      this.widgetForm = json

      if (json.list.length> 0) {
        this.widgetFormSelect = json.list[0]
      }
    },
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        console.log(this.$refs.widgetForm)
      }
    }
  }
}
</script>

<style lang="scss">
.widget-empty{
  background-position: 50%;
}

</style>
