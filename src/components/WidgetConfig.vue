<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item label="标题" v-if="data.type!='grid' && data.type !='buttons' && data.type !='table'">
        <el-input v-model="data.name"></el-input>
        <!----新增---->
        <div style="text-align: right;" v-if="Object.keys(data).indexOf('hideTitle')>=0">
          <el-checkbox v-model="data.hideTitle">隐藏标题</el-checkbox>
        </div>
        <!---------->
      </el-form-item>
      <!--按钮相关属性-->
      <div v-if="data.type == 'buttons'">
        <el-form-item label="显示文字" >
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item label="按钮尺寸" >
          <el-select v-model="data.options.btnSize">
            <el-option label="默认尺寸" value="default"></el-option>
            <el-option label="中等按钮" value="medium"></el-option>
            <el-option label="小型按钮" value="small"></el-option>
            <el-option label="超小按钮" value="mini"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="按钮类型" >
          <el-select v-model="data.options.type">
            <el-option label="默认按钮" value="default"></el-option>
            <el-option label="主要按钮" value="primary"></el-option>
            <el-option label="成功按钮" value="success"></el-option>
            <el-option label="信息按钮" value="info"></el-option>
            <el-option label="警告按钮" value="warning"></el-option>
            <el-option label="危险按钮" value="danger"></el-option>
            <el-option label="文字按钮" value="text"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标类名" >
          <el-input v-model="data.options.icon"></el-input>
        </el-form-item>
        <el-form-item label="属性" >
          <el-checkbox v-model="data.options.plain">朴素按钮</el-checkbox>
          <el-checkbox v-model="data.options.round">圆角按钮</el-checkbox>
          <el-checkbox v-model="data.options.circle">圆形按钮</el-checkbox>
          <el-checkbox v-model="data.options.disabled">禁用</el-checkbox>
        </el-form-item>
      </div>
      <!--表格相关属性-->
      <div v-if="data.type =='table'">
        <el-form-item label="表格显示字段">
          <span v-if="fields.length == 0" style="color: grey;padding-left: 15px;">请先选择online表单</span>
          <el-checkbox-group v-else v-model="data.table.selectFields" @change="handleTableFieldsChange">
            <el-checkbox v-for="(item,index) in fields"
                         :key="`table_field_${index}`"
                         :label="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="翻页控件设置">
          <el-checkbox style="display: block;" v-model="data.pagination.background">添加背景色</el-checkbox>
          <el-checkbox style="display: block;" v-model="data.pagination.hideOnSinglePage">只有一页时是否隐藏</el-checkbox>
          <el-input-number style="display: block;" v-model="data.pagination.pageSize">每页条数</el-input-number>
        </el-form-item>
      </div>
      <el-form-item label="宽度" v-if="Object.keys(data.options).indexOf('width')>=0">
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item label="控制按钮" v-if="Object.keys(data.options).indexOf('controls')>=0">
        <el-switch v-model="data.options.controls"></el-switch>
      </el-form-item>
      <el-form-item label="控制按钮位置" v-if="Object.keys(data.options).indexOf('controls')>=0">
        <el-select v-model="data.options.controlsPosition">
          <el-option label="两侧" value=""></el-option>
          <el-option label="右侧" value="right"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="高度" v-if="Object.keys(data.options).indexOf('height')>=0">
        <el-input v-model="data.options.height"></el-input>
      </el-form-item>

      <el-form-item label="大小" v-if="Object.keys(data.options).indexOf('size')>=0">
        宽度：<el-input style="width: 90px;" type="number" v-model.number="data.options.size.width"></el-input>
        高度：<el-input style="width: 90px;" type="number" v-model.number="data.options.size.height"></el-input>
      </el-form-item>


      <el-form-item label="占位内容" v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="布局方式" v-if="Object.keys(data.options).indexOf('inline')>=0">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">块级</el-radio-button>
          <el-radio-button :label="true">行内</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示输入框" v-if="Object.keys(data.options).indexOf('showInput')>=0">
        <el-switch v-model="data.options.showInput" ></el-switch>
      </el-form-item>
      <el-form-item label="最小值" v-if="Object.keys(data.options).indexOf('min')>=0">
        <el-input-number v-model="data.options.min" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="最大值" v-if="Object.keys(data.options).indexOf('max')>=0">
        <el-input-number v-model="data.options.max" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="步长" v-if="Object.keys(data.options).indexOf('step')>=0">
        <el-input-number v-model="data.options.step" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="是否多选" v-if="data.type=='select' || data.type=='imgupload'">
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item label="是否可搜索" v-if="data.type=='select'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item label="允许半选" v-if="Object.keys(data.options).indexOf('allowHalf')>=0">
        <el-switch
            v-model="data.options.allowHalf"
          >
          </el-switch>
      </el-form-item>
      <el-form-item label="支持透明度选择" v-if="Object.keys(data.options).indexOf('showAlpha')>=0">
        <el-switch
            v-model="data.options.showAlpha"
          >
          </el-switch>
      </el-form-item>
      <el-form-item label="是否显示标签" v-if="Object.keys(data.options).indexOf('showLabel')>=0">
        <el-switch
            v-model="data.options.showLabel"
          >
        </el-switch>
      </el-form-item>
      <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options')>=0">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">远端数据</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input size="mini" style="" v-model="data.options.remoteFunc">
              <template slot="prepend">远端方法</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.value">
              <template slot="prepend">值</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.label">
              <template slot="prepend">标签</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type=='radio' || (data.type=='select'&&!data.options.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-radio
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable tag="ul" :list="data.options.options"
                v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-checkbox
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">添加选项</el-button>
          </div>
        </template>

      </el-form-item>

      <el-form-item label="远端数据" v-if="data.type=='cascader'">
        <div>
          <el-input size="mini" style="" v-model="data.options.remoteFunc">
            <template slot="prepend">远端方法</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.value">
            <template slot="prepend">值</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.label">
            <template slot="prepend">标签</template>
          </el-input>
          <el-input size="mini" style="" v-model="data.options.props.children">
            <template slot="prepend">子选项</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item label="默认值" v-if="Object.keys(data.options).indexOf('defaultValue')>=0 && (data.type == 'textarea' || data.type == 'input' || data.type=='rate' || data.type=='color' || data.type=='switch' || data.type=='slider')">
        <el-input v-if="data.type=='textarea'" type="textarea" :rows="5" v-model="data.options.defaultValue"></el-input>
        <el-input v-if="data.type=='input'" v-model="data.options.defaultValue"></el-input>
        <el-rate v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;" :max="data.options.max" :allow-half="data.options.allowHalf" v-model="data.options.defaultValue"></el-rate>
        <el-button type="text" v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;margin-left: 10px;" @click="data.options.defaultValue=0">清空</el-button>
        <el-color-picker
          v-if="data.type == 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        ></el-color-picker>
        <el-switch v-if="data.type=='switch'" v-model="data.options.defaultValue"></el-switch>
        <el-input-number  v-if="data.type=='slider'" v-model="data.options.defaultValue" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>

      <!--时间、日期类型-->
      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item label="显示类型" v-if="data.type == 'date'">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为范围选择" v-if="data.type == 'time'">
          <el-switch
            v-model="data.options.isRange"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="是否获取时间戳" v-if="data.type == 'date'">
          <el-switch
            v-model="data.options.timestamp"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="占位内容" v-if="(!data.options.isRange && data.type == 'time') || (data.type != 'time' && data.options.type != 'datetimerange' && data.options.type != 'daterange')">
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="开始时间占位内容" v-if="(data.options.isRange) || data.options.type=='datetimerange' || data.options.type=='daterange'">
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="结束时间占位内容" v-if="data.options.isRange || data.options.type=='datetimerange' || data.options.type=='daterange'">
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item label="默认值" v-if="data.type=='time' && Object.keys(data.options).indexOf('isRange')>=0">
          <el-time-picker
            key="1"
            style="width: 100%;"
            v-if="!data.options.isRange"
            v-model="data.options.defaultValue"
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
          <el-time-picker
            key="2"
            v-if="data.options.isRange"
            style="width: 100%;"
            v-model="data.options.defaultValue"
            is-range
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
        </el-form-item>
      </template>

      <!--文本-->
      <template v-if="data.type == 'text'">
        <el-form-item label="文本内容" >
          <el-input type="textarea" v-model="data.options.defaultValue"></el-input>
        </el-form-item>
        <el-form-item label="行高" >
          <el-input v-model="data.options.lineHeight"></el-input>
        </el-form-item>
        <el-form-item label="对齐方式" >
          <el-radio-group v-model="data.options.align">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="center">居中对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字体大小" >
          <el-input-number v-model="data.options.fontSize"></el-input-number>px
        </el-form-item>
        <el-form-item label="字体颜色" >
          <div style="display: flex;">
            <el-input v-model="data.options.fontColor"></el-input>
            <el-color-picker v-model="data.options.fontColor"></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="字体样式" >
          <el-checkbox v-model="data.options.fontBold">加粗</el-checkbox>
          <el-checkbox v-model="data.options.fontItalic">斜体</el-checkbox>
          <el-checkbox v-model="data.options.fontUnderline">下划线</el-checkbox>
          <el-checkbox v-model="data.options.fontLineThrough">删除线</el-checkbox>
        </el-form-item>
      </template>

      <!--图片类型-->
      <template v-if="data.type=='imgupload'">

        <el-form-item label="最大上传数">
          <el-input type="number" v-model.number="data.options.length"></el-input>
        </el-form-item>
        <el-form-item label="使用七牛上传">
          <el-switch v-model="data.options.isQiniu"></el-switch>
        </el-form-item>
        <template v-if="data.options.isQiniu">
          <el-form-item label="Domain" :required="true">
          <el-input v-model="data.options.domain"></el-input>
          </el-form-item>
          <el-form-item label="获取七牛Token方法" :required="true">
            <el-input v-model="data.options.tokenFunc"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="图片上传地址" :required="true">
            <el-input v-model="data.options.action"></el-input>
          </el-form-item>
        </template>
      </template>

      <!--自定义-->
      <template v-if="data.type=='blank'">
        <el-form-item label="绑定数据类型">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" label="字符"></el-option>
            <el-option value="Object" label="对象"></el-option>
            <el-option value="Array" label="数组"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!--栅格布局-->
      <template v-if="data.type == 'grid'">
        <el-form-item label="栅格间隔">
          <el-input type="number" v-model.number="data.options.gutter"></el-input>
        </el-form-item>
        <el-form-item label="列配置项">
          <draggable tag="ul" :list="data.columns"
            v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
            handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index" >
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
              <el-input placeholder="栅格值" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input>

              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddColumn">添加列</el-button>
          </div>
        </el-form-item>
        <el-form-item label="水平排列方式">
          <el-select v-model="data.options.justify">
            <el-option value="start" label="左对齐"></el-option>
            <el-option value="end" label="右对齐"></el-option>
            <el-option value="center" label="居中"></el-option>
            <el-option value="space-around" label="两侧间隔相等"></el-option>
            <el-option value="space-between" label="两端对齐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直排列方式">
          <el-select v-model="data.options.align">
            <el-option value="top" label="顶部对齐"></el-option>
            <el-option value="middle" label="居中"></el-option>
            <el-option value="bottom" label="底部对齐"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <!----新增---->
      <el-form-item label="css类名" v-if="data.type !== 'blank'">
        <el-input v-model="data.className"></el-input>
      </el-form-item>
      <!---------->

      <template v-if="data.type != 'grid' && data.type != 'buttons' && data.type !='table'">
        <el-form-item label="数据绑定Key" v-if="fields.length == 0">
          <el-input v-model="data.model"></el-input>
        </el-form-item>
        <el-form-item label="数据绑定Key" v-else>
          <el-select placeholder="请选择绑定的key" clearable v-model="data.model">
            <el-option  v-for="(item,index) in fields" :key="`fields_${index}`" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作属性">
          <el-checkbox v-model="data.options.readonly" v-if="Object.keys(data.options).indexOf('readonly')>=0">完全只读</el-checkbox>
          <el-checkbox v-model="data.options.disabled" v-if="Object.keys(data.options).indexOf('disabled')>=0">禁用</el-checkbox>
          <el-checkbox v-model="data.options.editable" v-if="Object.keys(data.options).indexOf('editable')>=0">文本框可输入</el-checkbox>
          <el-checkbox v-model="data.options.clearable" v-if="Object.keys(data.options).indexOf('clearable')>=0">显示清除按钮</el-checkbox>
          <el-checkbox v-model="data.options.arrowControl" v-if="Object.keys(data.options).indexOf('arrowControl')>=0">使用箭头进行时间选择</el-checkbox>
          <el-checkbox v-model="data.options.isDelete" v-if="Object.keys(data.options).indexOf('isDelete')>=0">删除</el-checkbox>
          <el-checkbox v-model="data.options.isEdit" v-if="Object.keys(data.options).indexOf('isEdit')>=0">编辑</el-checkbox>
        </el-form-item>
        <el-form-item label="校验">
          <div v-if="Object.keys(data.options).indexOf('required')>=0">
            <el-checkbox v-model="data.options.required">必填</el-checkbox>
          </div>
          <el-select v-if="Object.keys(data.options).indexOf('dataType')>=0" v-model="data.options.dataType" size="mini" >
            <el-option value="string" label="字符串"></el-option>
            <el-option value="number" label="数字"></el-option>
            <el-option value="boolean" label="布尔值"></el-option>
            <el-option value="integer" label="整数"></el-option>
            <el-option value="float" label="浮点数"></el-option>
            <el-option value="url" label="URL地址"></el-option>
            <el-option value="email" label="邮箱地址"></el-option>
            <el-option value="hex" label="十六进制"></el-option>
          </el-select>

          <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
            <el-input size="mini" v-model.lazy="data.options.pattern"  style=" width: 240px;" placeholder="填写正则表达式"></el-input>
          </div>
        </el-form-item>
      </template>

      <!----新增---->
      <el-form-item label="权限控制">
        <el-checkbox v-model="data.auth">开启权限控制</el-checkbox>
        <el-row style="margin: 8px 0;" v-if="data.auth">
          <el-col :span="6">权限名称:</el-col>
          <el-col :span="18">
            <el-input v-model="data.authTitle !=='' ? data.authTitle : data.name "></el-input>
          </el-col>
        </el-row>
        <el-row style="margin: 8px 0;" v-if="data.auth">
          <el-col :span="6">权限字段:</el-col>
          <el-col :span="18">
            <el-input v-model="data.authField !=='' ? data.authField : data.model"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <!---------->
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  props: ['data','fields'],
  data () {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      }
    }
  },
  computed: {
    show () {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    handleOptionsRemove (index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }

    },
    handleAddOption () {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: '新选项',
          label: '新选项'
        })
      } else {
        this.data.options.options.push({
          value: '新选项'
        })
      }

    },
    handleAddColumn () {
      this.data.columns.push({
        span: '',
        list: []
      })
    },
    generateRule () {
      this.data.rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key])
        }
      })
    },
    handleSelectMuliple (value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue]
        } else {
          this.data.options.defaultValue = []
        }

      } else {
        if (this.data.options.defaultValue.length>0){
          this.data.options.defaultValue = this.data.options.defaultValue[0]
        } else {
          this.data.options.defaultValue = ''
        }

      }
    },
    validateRequired (val) {
      if (val) {
        this.validator.required = {required: true, message: `${this.data.name}必须填写`}
      } else {
        this.validator.required = null
      }

      this.$nextTick(() => {
        this.generateRule()
      })
    },
    validateDataType (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.type = {type: val, message: this.data.name + '格式不正确'}
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    valiatePattern (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.pattern = {pattern: val, message: this.data.name + '格式不匹配'}
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    },
    // 表格字段
    handleTableFieldsChange(val){
      console.log(val)
      this.data.table.columns=[]
      val.forEach(obj=>{
        let item =this.fields.find(field=>field.value == obj)
        this.data.table.columns.push({
          title:item.label,
          key:item.value
        })
      })
    }
  },
  watch: {
    'data.options.isRange': function(val) {
      if (typeof val !== 'undefined') {
        if (val) {
          this.data.options.defaultValue = null
        } else {
          if (Object.keys(this.data.options).indexOf('defaultValue')>=0)
            this.data.options.defaultValue = ''
        }
      }
    },
    'data.options.required': function(val) {
      this.validateRequired(val)
    },
    'data.options.dataType': function (val) {
      this.validateDataType(val)
    },
    'data.options.pattern': function (val) {
      this.valiatePattern(val)
    },
    'data.name': function (val) {
      if (this.data.options) {
        this.validateRequired(this.data.options.required)
        this.validateDataType(this.data.options.dataType)
        this.valiatePattern(this.data.options.pattern)
      }
    }
  }
}
</script>
