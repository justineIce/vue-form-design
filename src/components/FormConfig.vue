<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="online表单">
        <el-select placeholder="请选择online表单" clearable v-model="data.onlineForm" @change="handleOnlineFormChange">
          <el-option :label="item.label" :value="item.value" v-for="(item,index) in onlineForms" :key="`student_${index}`"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="表单字段宽度">
        <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
      </el-form-item>

      <el-form-item label="组件尺寸">
        <el-radio-group v-model="data.size">
          <el-radio-button label="medium">大</el-radio-button>
          <el-radio-button label="small">中</el-radio-button>
          <el-radio-button label="mini">小</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['data','onlineForms'],
  methods:{
    /**
     * online表单值改变事件
     * @param val
     */
    handleOnlineFormChange(val){
      console.log(this.data)
      this.$emit("on-change", this.data)
    }
  }
}
</script>
