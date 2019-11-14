<template>
  <fm-making-form ref="makingForm"
                  upload
                  preview
                  generate-code
                  generate-json
                  clearable
                  :onlineForms="onlineForms">
    <template slot="action">
    </template>
  </fm-making-form>
</template>

<script>
export default {
  data(){
    return{
      onlineForms:[
        {
          label:'学生',
          value:'student',
          children:[
            {
              label:'name',
              value:'name',
            },
            {
              label:'sex',
              value:'sex',
            },
          ]
        },
        {
          label:'教师',
          value:'teacher',
          children:[
            {
              label:'name',
              value:'name',
            },
            {
              label:'age',
              value:'age',
            },
          ]
        }
      ]
    }
  },
  mounted () {
  }
}
</script>
