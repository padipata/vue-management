<template>
  <page-header-layout
    title="植物列表"
    v-bind="$attrs"
  >
    <el-card>
      <div class="table-list">
        <div class="table-list-form">
          <el-form
            v-if="expandForm"
            ref="form"
            :model="form"
            inline
            @submit.native="handleSearch"
          >
            <el-row :gutter="8" style="margin-top: 24px">
              <el-col :xs="24" :sm="4">
                <el-form-item
                  label="植物名"
                  prop="plant_name"
                >
                  <el-input
                    v-model="form.plant_name"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <div :style="{overflow: 'hidden'}">
              <span :style="{float: 'left'}">
                <el-button
                  type="primary"
                  native-type="submit"
                >
                  查询
                </el-button>
                <el-button
                  :style="{marginLeft: '8px'}"
                  @click="handleFormReset"
                >
                  重置
                </el-button>
                <span v-if="selectedRows.length > 0" style="margin-left: 10px;">
                  <el-button><a id='excel_export' @click="exportExcelFunction('targetTable','商家列表')"><span
                    class="el-icon-download"></span>&nbsp;&nbsp;批量导出</a></el-button>
                </span>
              </span>
            </div>
          </el-form>
          <el-form
            v-else
            ref="form"
            :model="form"
            inline
            @submit.native="handleSearch"
          >
          </el-form>
        </div>

        <el-table
          ref="selectedRows"
          :data="tableData.list.rows"
          :highlight-current-row="true"
          @selection-change="handleSelectRows"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            prop="plant_number"
            label="植物编号">
          </el-table-column>

          <el-table-column
            prop="plant_name"
            label="植物名">
          </el-table-column>

          <el-table-column
            label="植物图片">
            <template slot-scope="scope">
              <img :src="scope.row.plant_img" style="height: 70px"/>
            </template>
          </el-table-column>

          <el-table-column
            prop="plant_html"
            label="内容详情">
            <template slot-scope="scope">
              <el-popover
                placement="left"
                width="400"
                trigger="click">
                <div style="width: 375px;height: 550px;overflow-y: scroll;: scroll" class="popover"
                     v-html="scope.row.plant_html"></div>
                <el-button slot="reference">预览</el-button>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column
            label="添加日期"
            width="170">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{scope.row.create_at | toDateTime}}</span>
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button @click="editorClick(scope.row)" size="mini">编辑</el-button>
              <!--<br/>-->
              <el-button @click="handleClick(scope.row)" type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <br/>
        <el-pagination
          style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: end;-ms-flex-pack: end;justify-content: flex-end;"
          background
          layout="total, prev, pager, next, sizes"
          :total="tableData.list.count"
          @size-change="sizeChange"
          @current-change="currentChange"
        >
        </el-pagination>

      </div>
    </el-card>

    <!-- Excel表格 -->
    <table id="targetTable" style="display:none;">
      <tr align="center">
        <th>商家名称</th>
        <th>标签</th>
        <th>人均价格</th>
        <th>打卡数</th>
        <th>联系方式</th>
        <th>地区</th>
        <th>详细地址</th>
        <th>营业时间</th>
        <th>入驻时间</th>
      </tr>
      <tr align="center" v-for='(item,index) in selectedRows'>
        <td>{{item.shop_name}}</td>
        <td>{{item.label}}</td>
        <td>{{item.capita_price}}</td>
        <td>{{item.clock_num}}</td>
        <td>{{item.shop_mobile}}</td>
        <td>{{item.shop_area}}</td>
        <td>{{item.shop_site}}</td>
        <td>{{item.operating_start}}~{{item.operating_end}}</td>
        <td>{{created_arr[index]}}</td>
      </tr>
    </table>

  </page-header-layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {
    Card,
    Form,
    FormItem,
    Row,
    Col,
    Input,
    Select,
    Option,
    InputNumber,
    DatePicker,
    Message,
    Dialog,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Table,
    TableColumn,
    Pagination,
    Checkbox,
    Tag,
    MessageBox
  } from 'element-ui'
  import * as moment from 'moment'

  import {Badge} from 'vue-antd-ui'

  import PageHeaderLayout from 'layouts/PageHeaderLayout/index.vue'
  import AntIcon from 'components/AntIcon'
  import StandardTable from 'components/StandardTable'
  import Divider from 'components/Divider'

  declare function unescape(s: string): string

  declare function escape(s: string): string

  Vue.use(Card)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Input)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(InputNumber)
  Vue.use(DatePicker)
  Vue.use(Dialog)
  Vue.use(Dropdown)
  Vue.use(DropdownItem)
  Vue.use(DropdownMenu)
  Vue.use(AntIcon)
  Vue.use(StandardTable)
  Vue.use(Divider)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Pagination)
  Vue.use(Checkbox)
  Vue.use(Tag)

  Vue.component(Badge.name, Badge)

  const getValue = (obj: any) =>
    Object.keys(obj).map(key => obj[key]).join(',')

  export default Vue.extend({
    components: {
      PageHeaderLayout
    },
    data() {
      const tableData: any[] = []
      const created_arr: any[] = []
      const excelContent: any = ''
      const excelFile: any = ''
      const table: any = ''
      const selectedRows: any[] = []

      return {
        tableData,
        excelContent,
        created_arr,
        excelFile,
        table,
        expandForm: true,
        limit: 10,
        offset: 0,
        form: {
          plant_name: ''
        },
        selectedRows,
        loading: false
      }
    },
    computed: {
      rule(): any {
        this.tableData = this.$store.state.rule
        return this.$store.state.rule
      }
    },
    mounted() {
      this.$store.dispatch('rule/fetch')
      this.tableData = this.rule
    },
    methods: {
      toTime(val: any) {
        let times = new Date(val).getTime()
        if (times == null) {
          return ''
        }
        let d = new Date(times)
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let day = d.getDate()
        let realMonth = month >= 10 ? month : "0" + month
        let realDay = day >= 10 ? day : "0" + day
        let hour = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours()
        let minute = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes()
        let second = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds()
        let str = year + "-" + realMonth + "-" + realDay + " " + hour + ":" + minute + ":" + second

        return str
      },
      handleFormReset() {
        const formRef: any = this.$refs.form
        formRef.resetFields()
        this.$store.dispatch('rule/fetch', {})
      },
      handleSelectRows(rows: any) {
        console.log(rows, '选中内容')
        this.selectedRows = rows
        this.created_arr = []
        this.selectedRows.forEach(item => {
          this.created_arr.push(this.toTime(item.created_at))
        })
        console.log(this.created_arr, 'this.created_arr')
      },
      handleSearch(e: any) {
        e.preventDefault()
        const formRef: any = this.$refs.form
        formRef.validate((valid: boolean) => {
          if (valid) {
            this.loading = true
            const vaules: any = {
              ...this.form
            }
            this.$store
              .dispatch('rule/fetch', vaules)
              .then(() => {
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          }
        })
      },
      moment(value: any) {
        return moment(value)
      },
      handleClick(row: any) {
        console.log(row);
        MessageBox.confirm('此操作将永久删除该店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('rule/remove', row._id)
          this.$store.dispatch('rule/fetch', {})
            .then(() => {
              Message({
                type: 'success',
                message: '删除成功!'
              })
            })
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      editorClick(row: any) {
        console.log(row)
        localStorage.setItem('editor-_id', row._id)
        localStorage.setItem('editor-plant_name', row.plant_name)
        localStorage.setItem('editor-plant_number', row.plant_number)
        localStorage.setItem('editor-plant_img', row.plant_img)
        localStorage.setItem('editor-plant_html', row.plant_html)
        this.$router.push('/form/editor-table')
      },
      sizeChange(row: any) {
        let info: any = {}
        this.limit = row
        info.limit = row
        info.offset = this.offset
        this.$store.dispatch('rule/fetch', info)
      },
      currentChange(row: any) {
        console.log(row)
        let info: any = {}
        this.offset = row
        info.offset = row
        info.limit = this.limit
        this.$store.dispatch('rule/fetch', info)
      },
      // 导出 Excel
      exportExcelFunction(tableID: any, fName: any) {
        console.log('开始导出Excel')
        let dom: any = {}
        dom = document.getElementById('excel_export')
        let type = 'excel'
        this.table = document.getElementById(tableID)
        this.excelContent = this.table.innerHTML
        this.excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:" + type + "' xmlns='http://www.w3.org/TR/REC-html40'>"
        this.excelFile += "<head>"
        this.excelFile += "<meta http-equiv=Content-Type; content=text/html;charset=UTF-8>"
        this.excelFile += "<!--[if gte mso 9]>"
        this.excelFile += "<xml>"
        this.excelFile += "<x:ExcelWorkbook>"
        this.excelFile += "<x:ExcelWorksheets>"
        this.excelFile += "<x:ExcelWorksheet>"
        this.excelFile += "<x:Name>"
        this.excelFile += "{worksheet}"
        this.excelFile += "</x:Name>"
        this.excelFile += "<x:WorksheetOptions>"
        this.excelFile += "<x:DisplayGridlines/>"
        this.excelFile += "</x:WorksheetOptions>"
        this.excelFile += "</x:ExcelWorksheet>"
        this.excelFile += "</x:ExcelWorksheets>"
        this.excelFile += "</x:ExcelWorkbook>"
        this.excelFile += "</xml>"
        this.excelFile += "<![endif]-->"
        this.excelFile += "</head>"
        this.excelFile += "<body><table>"
        this.excelFile += this.excelContent
        this.excelFile += "</table></body>"
        this.excelFile += "</html>";
        let base64data = "base64," + window.btoa(unescape(encodeURIComponent(this.excelFile)))
        dom.href = 'data:application/vnd.ms-' + type + ';' + base64data // 必须是a标签，否则无法下载改名
        dom.download = fName
      }
    }
  })
</script>

<style lang="scss" scoped>
  .table-list {
    &-operator {
      margin-bottom: 16px;
      button {
        margin-right: 8px;
      }
    }
  }

  .table-list-form {
    /deep/ .el-form-item {
      &__label {
        margin-bottom: 0;
      }
    }
  }
</style>
