<template>
  <page-header-layout
    title="修改植物信息"
    content="请编写植物信息"
    v-bind="$attrs"
  >
    <el-card>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        :style="{marginTop: '8px'}"
        label-width="30%"
        class="form"
        @submit.native="handleSubmit"
      >
        <el-form-item
          label="* 植物编号"
          prop="plant_number"
        >
          <el-input
            placeholder="请输入植物编号"
            v-model="plant_number"
          />
        </el-form-item>

        <el-form-item
          label="* 植物名"
          prop="plant_name"
        >
          <el-input
            placeholder="请输入植物名"
            v-model="plant_name"
          />
        </el-form-item>
        <el-form-item
          label="* 植物封面"
          prop="article_img"
        >
          <el-upload
            class="avatar-uploader"
            action=""
            accept="image/jpeg,image/png"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="plant_img" :src="plant_img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="color: #ffaa0f">* 上传图片必须是 jpg 或者 png 格式，大小不超过2M</p>
        </el-form-item>

        <el-form-item
          label="* 内容详情">
          <div>
            <div ref="editor" style="text-align:left"></div>
          </div>
        </el-form-item>

        <el-form-item
          :style="{marginTop: '32px'}"
        >
          <el-button
            type="primary"
            native-type="submit"
            :loading="submitting"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </page-header-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {
    Card,
    Form,
    FormItem,
    Input,
    DatePicker,
    Tooltip,
    InputNumber,
    Radio,
    RadioGroup,
    Select,
    Option,
    Button,
    Upload,
    TimePicker,
    Message
  } from 'element-ui'

  import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'

  import axios from 'axios'
  import {getQiniu} from 'services/api'
  import AntIcon from 'components/AntIcon'
  import E from 'wangeditor'

  Vue.use(Card)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(DatePicker)
  Vue.use(Tooltip)
  Vue.use(InputNumber)
  Vue.use(Radio)
  Vue.use(RadioGroup)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Button)
  Vue.use(AntIcon)
  Vue.use(Upload)
  Vue.use(TimePicker)

  export default Vue.extend({
    components: {
      PageHeaderLayout
    },
    data: function() {
      const imageUrl2: any[] = []
      const shop_banner: string = ''
      const editor: any = ''
      const _id: any = ''
      const plant_name: any = ''
      const plant_number: any = ''
      const plant_img: any = ''
      const plant_html: any = ''

      return {
        form: {},
        rules: {
          title: [{required: true, message: '请输入标题'}],
          date: [{required: true, message: '请选择起止日期'}],
          goal: [{required: true, message: '请输入目标描述'}],
          standard: [{required: true, message: '请输入衡量标准'}]
        },
        submitting: false,
        editorContent: '',
        img_url: '',
        qiniu_token: '',
        imageUrl2,
        shop_banner, // 轮播图
        editor,
        _id,
        plant_name,
        plant_number,
        plant_img,
        plant_html
      }
    },
    methods: {
      handleSubmit(e: any) {
        e.preventDefault()
        const formRef: any = this.$refs.form
        formRef.validate((valid: boolean) => {
          if (valid) {
            this.submitting = true
            let info: any = {}

            info._id = this._id
            info.plant_name = this.plant_name
            info.plant_number = this.plant_number
            info.plant_img = this.plant_img
            info.plant_html = this.editor.txt.html()
            console.log(info, 'infoinfoinfo')

            this.$store.dispatch('rule/updata', info)
              .then(() => {
                this.submitting = false
                Message.success('修改成功')
                this.$router.push('/list/table-list')
              })
              .catch(() => {
                this.submitting = false
                Message.error('修改失败')
              })
          }
        })
      },

      // 封面图上传
      beforeAvatarUpload(file: any) {
        const isIMG = file.type === 'image/jpeg' || file.type === 'image/png'

        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isIMG) {
          Message.error('上传图片只能是 JPG 或 png 格式!')
        }
        if (!isLt2M) {
          Message.error('上传图片大小不能超过 2MB!')
        }

        const formData = new FormData()
        getQiniu().then(response => {
          formData.append('file', file, file.name)
          formData.append('token', response.data.uploadToken)
          axios.post('https://up-z2.qiniup.com', formData).then(e => {
            this.plant_img = response.data.bucket_domain + e.data.key
          })
        })

        return isIMG && isLt2M
      },

      get_qiniu() {
        getQiniu().then(response => {
          this.img_url = response.data.bucket_domain
          this.qiniu_token = response.data.uploadToken
          this.upload_imgs()
        })
      },

      upload_imgs() {
        this.editor = new E(this.$refs.editor)
        this.editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
          'list',  // 列表
          'justify',  // 对齐方式
          'quote',  // 引用
          'image',  // 插入图片
          'table',  // 表格
          'undo',  // 撤销
          'redo'  // 重复
        ]
        this.editor.customConfig.uploadImgServer = 'http://up-z2.qiniu.com'
        this.editor.customConfig.showLinkImg = false
        this.editor.customConfig.uploadFileName = 'file'
        this.editor.customConfig.uploadImgParams = {token: this.qiniu_token}

        var that = this
        this.editor.customConfig.uploadImgHooks = {
          success: function(xhr: any, editor: any, result: any) {
            console.log('success', xhr, editor, result);
            that.editorContent = editor.txt.html()
            Message.success('上传图片成功')
          },
          fail: function(xhr: any, editor: any, result: any) {
            console.log('fail', xhr, editor, result);
            Message.error('上传图片失败')
          },
          error: function(xhr: any, editor: any) {
            console.log('error', xhr, editor);
            Message.error('上传图片失败')
          },
          timeout: function(xhr: any, editor: any) {
            console.log('timeout', xhr, editor);
            Message.error('上传图片超时(默认上传最大为5M)')
          },
          customInsert: function(insertImg: any, result: any, editor: any) {
            var url = that.img_url + result.hash
            insertImg(url)
            console.log('customInsert', insertImg, result, editor)
          }
        }
        this.editor.customConfig.zIndex = 1
        this.editor.create()
        this.editor.txt.html(localStorage.getItem('editor-plant_html'))
      },
    },
    mounted() {
      this.get_qiniu()

      this._id = localStorage.getItem('editor-_id')
      this.plant_name = localStorage.getItem('editor-plant_name')
      this.plant_number = localStorage.getItem('editor-plant_number')
      this.plant_img = localStorage.getItem('editor-plant_img')
      this.plant_html = localStorage.getItem('editor-plant_html')
    },
  })
</script>

<style lang="scss" scoped>
  @import '~theme/theme.scss';

  .form {
    /deep/ .el-form-item {
      &__content {
        width: 50%;
      }
    }

    .item-public {
      /deep/ .el-radio-group {
        line-height: inhert;

        .el-radio {
          margin-bottom: 0;
          line-height: inhert;
        }
      }

      /deep/ .el-form-item__content {
        width: 100%;
      }

      /deep/ .el-select {
        width: 100%;
      }
    }
  }

  .optional {
    color: $text-color-secondary;
    font-style: normal;
  }

  .form-explain {
    color: rgba(0, 0, 0, 0.45);
    line-height: 1.5;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  .avatar {
    width: 150px;
    height: 150px;
    display: block;
    overflow: hidden;
    float: left;
    margin-right: 30px;
    margin-bottom: 24px;
  }

  #account--editor {
    width: 100%;
    min-height: 330px;
    height: auto;
  }
</style>
