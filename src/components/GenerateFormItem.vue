<template>
  <el-form-item :label="widget.name" :prop="widget.model">
    <!--单行文本-->
    <template v-if="widget.type == 'input'" >
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        :type="widget.options.dataType"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
        :readonly="widget.options.readonly"
        :class="[widget.className]"
      ></el-input>
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :readonly="widget.options.readonly"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :class="[widget.className]"
      ></el-input>
    </template>
    <!--多行文本-->
    <template v-if="widget.type == 'textarea'">
      <el-input type="textarea" :rows="5"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :readonly="widget.options.readonly"
        :class="[widget.className]"
      ></el-input>
    </template>
    <!--计数器-->
    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :step="widget.options.step"
        :controls-position="widget.options.controlsPosition"
        :disabled="widget.options.disabled"
        :controls="widget.options.controls"
        :class="[widget.className]"
      ></el-input-number>
    </template>
    <!--单选框组-->
    <template v-if="widget.type == 'radio'">
      <el-radio-group v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
        :class="[widget.className]"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-radio>
      </el-radio-group>
    </template>
    <!--多选框组-->
    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
        :class="[widget.className]"
      >
        <el-checkbox

          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>
    <!--时间选择器-->
    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: widget.options.width}"
        :class="[widget.className]"
      >
      </el-time-picker>
    </template>
    <!--日期选择器-->
    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
        :class="[widget.className]"
      >
      </el-date-picker>
    </template>
    <!--评分-->
    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :allow-half="widget.options.allowHalf"
        :class="[widget.className]"
      ></el-rate>
    </template>
    <!--颜色选择器-->
    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :show-alpha="widget.options.showAlpha"
        :class="[widget.className]"
      ></el-color-picker>
    </template>
    <!--下拉选择框-->
    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :filterable="widget.options.filterable"
        :class="[widget.className]"
      >
        <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
      </el-select>
    </template>
    <!--开关-->
    <template v-if="widget.type=='switch'">
      <el-switch
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :class="[widget.className]"
      >
      </el-switch>
    </template>
    <!--滑块-->
    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: widget.options.width}"
        :class="[widget.className]"
      ></el-slider>
    </template>
    <!--图片-->
    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :style="{'width': widget.options.width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :length="widget.options.length"
        :is-qiniu="widget.options.isQiniu"
        :is-delete="widget.options.isDelete"
        :min="widget.options.min"
        :is-edit="widget.options.isEdit"
        :action="widget.options.action"
        :class="[widget.className]"
      >
      </fm-upload>
    </template>
    <!--编辑器-->
    <template v-if="widget.type == 'editor'">
      <vue-editor
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :class="[widget.className]"
      >
      </vue-editor>
    </template>
    <!--级联选择器-->
    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :options="widget.options.remoteOptions"
        :class="[widget.className]"
      >

      </el-cascader>
    </template>
    <!--文字-->
    <template v-if="widget.type == 'text'">
        <div :class="[widget.className]"
             :style="{
                'line-height': widget.options.lineHeight,
                'text-align':widget.options.align,
                'font-size':widget.options.fontSize,
                 color:element.options.fontColor,
                 'font-weight': widget.options.fontBold ? 'bold' :'normal',
                 'font-style': widget.options.fontItalic ? 'italic' :'normal',
                 'text-decoration': widget.options.fontUnderline ? (widget.options.fontLineThrough ? 'line-through':'underline') :'none'
                }"
        >
          <span >{{dataModel}}</span>
        </div>
    </template>
  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import { VueEditor } from "vue2-editor"

export default {
  props: ['widget', 'models', 'rules', 'remote'],
  components: {
    FmUpload,
    VueEditor
  },
  data () {
    return {
      dataModel: this.models[this.widget.model]
    }
  },
  created () {
    if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      this.remote[this.widget.options.remoteFunc]((data) => {
        this.widget.options.remoteOptions = data.map(item => {
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          }
        })
      })
    }

    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }
  },
  methods: {
  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>
