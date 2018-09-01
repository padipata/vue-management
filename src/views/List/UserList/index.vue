<template>
  <page-header-layout
    title="用户列表"
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
              <el-form-item :style="{float: 'left'}"
                            label="用户名"
                            prop="nick_name"
              >
                <el-input style="float: left;"
                          v-model="form.nick_name"
                          placeholder="请输入用户名"
                />
              </el-form-item>

              <div :style="{float: 'left'}">
                <el-button :xs="24" :sm="6"
                           type="primary"
                           native-type="submit"
                >
                  查询
                </el-button>
                <span v-if="selectedRows.length > 0" style="margin-left: 10px">
                      <el-button><a id='excel_export2' @click="exportExcelFunction('targetTable2','用户列表')"><span
                        class="el-icon-download"></span>&nbsp;&nbsp;批量导出</a></el-button>
                    </span>
              </div>


            </el-row>

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
            label="用户头像">
            <template slot-scope="scope">
              <img :src="scope.row.headimg_url" style="height: 70px"/>
            </template>
          </el-table-column>

          <el-table-column
            prop="nick_name"
            label="用户名">
          </el-table-column>

          <el-table-column
            prop="vip"
            label="会员级别"
          >
            <template slot-scope="scope">
              <el-tag
                disable-transitions>
                {{scope.row.vip=='0'?'初级吃货':scope.row.vip=='1'?'中级吃货':scope.row.vip=='2'?'高级吃货':scope.row.vip=='3'?'会员吃货':'其他级别'}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="area"
            label="跨域地区数">
          </el-table-column>

          <el-table-column
            prop="restaurant"
            label="消费餐厅个数">
          </el-table-column>

          <el-table-column
            label="入驻日期"
            width="170">
            <template slot-scope="scope">
              <span style="margin-left: 5px">{{scope.row.created_at | toDateTime}}</span>
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
    <table id="targetTable2" style="display:none;">
      <tr align="center">
        <th>用户头像</th>
        <th>用户名</th>
        <th>会员级别</th>
        <th>跨域地区数</th>
        <th>消费餐厅个数</th>
        <th>入驻日期</th>
      </tr>
      <tr align="center" v-for='(item,index) in selectedRows'>
        <td>&nbsp;{{item.headimg_url}}</td>
        <td>{{item.nick_name}}</td>
        <td>{{item.vip=='0'?'初级吃货':item.vip=='1'?'中级吃货':item.vip=='2'?'高级吃货':'其他级别'}}</td>
        <td>{{item.area}}</td>
        <td>{{item.restaurant}}</td>
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
    Object.keys(obj)
      .map(key => obj[key])
      .join(',')

  const statusMap = ['default', 'processing', 'success', 'error']
  const status = ['关闭', '运行中', '已上线', '异常']

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
      const columns = [
        {
          prop: 'headimg_url',
          label: '用户头像'
        },
        {
          prop: 'nick_name',
          label: '用户名'
        },
        {
          prop: 'vip',
          label: '会员级别'
        },
        {
          prop: 'area',
          label: '跨域地区数'
        },
        {
          prop: 'restaurant',
          label: '消费餐厅个数'
        },
        {
          prop: 'created_at',
          label: '入驻时间',
          sortable: true,
          scopedSlot: 'created_at'
        }
      ]
      const selectedRows: any[] = []

      return {
        tableData,
        excelContent,
        created_arr,
        excelFile,
        table,
        modalVisible: false,
        expandForm: true,
        form: {
          nick_name: ''
        },
        selectedRows,
        loading: false,
        columns: columns,
        status,
        statusMap,
        addForm: {
          desc: ''
        },
        addFormRules: {
          desc: [{required: true, message: '请输入一些描述...'}]
        }
      }
    },
    computed: {
      rule(): any {
        this.tableData = this.$store.state.rule
        return this.$store.state.rule
      }
    },
    mounted() {
      this.$store.dispatch('rule/fetch2')
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
      handleStandardTableChange(pagination: any, filtersArg: any, sorter: any) {
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
          const newObj: any = {...obj}
          newObj[key] = getValue(filtersArg[key])
          return newObj
        }, {})

        const params = {
          currentPage: pagination.currentPage,
          pageSize: pagination.pageSize,
          ...this.form,
          ...filters
        }
        if (sorter.prop) {
          params.sorter = `${sorter.prop}_${sorter.order}`
        }

        this.$store.dispatch('rule/fetch2', params)
      },
      handleFormReset() {
        const formRef: any = this.$refs.form
        formRef.resetFields()
        this.$store.dispatch('rule/fetch2', {})
      },
      handleMenuClick(key: string) {
        const {selectedRows} = this

        if (!selectedRows) {
          return
        }

        switch (key) {
          case 'remove':
            this.$store
              .dispatch('rule/remove', {
                no: selectedRows.map(row => row.no).join(',')
              })
              .then(() => {
                this.selectedRows = []
              })
            break
          default:
            break
        }
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
            console.log(vaules, 'vaulesvaules')
            this.$store
              .dispatch('rule/fetch2', vaules)
              .then(() => {
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          }
        })
      },
      handleModalVisible(flag: boolean) {
        // this.modalVisible = !!flag
        this.$router.push('/form/basic-form')
      },
      handleModalOk() {
        const formRef: any = this.$refs.addForm
        formRef.validate((valid: boolean) => {
          if (valid) {
            this.handleAdd(this.addForm)
            formRef.resetFields()
          }
        })
      },
      handleAdd(fields: any) {
        this.$store.dispatch('rule/add', {
          description: fields.desc
        })
        Message.success('添加成功')
        this.modalVisible = false
      },
      moment(value: any) {
        return moment(value)
      },

      formatter(row: any, column: any) {
        return row.address
      },
      filterTag(value: any, row: any) {
        return row.tag === value
      },
      filterHandler(value: any, row: any, column: any) {
        const property = column['property']
        return row[property] === value
      },
      sizeChange(row: any) {
        let info: any = {}
        info.limit = row
        this.$store.dispatch('rule/fetch2', info)
      },
      currentChange(row: any) {
        console.log(row)
        let info: any = {}
        info.offset = row
        this.$store.dispatch('rule/fetch2', info)
      },
      // 导出 Excel
      exportExcelFunction(tableID: any, fName: any) {
        console.log('开始导出Excel')
        let dom: any = {}
        dom = document.getElementById('excel_export2')
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

</style>
