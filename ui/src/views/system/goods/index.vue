<template>
  <div class="app-container">
    <div v-show="step == 1">
      <el-card>
        <div slot="header"><span>批量复制</span></div>
        <el-form ref="queryForm" :model="queryParams" size="small" :inline="false">
          <el-form-item label="商品地址" prop="deptName">
            <el-input v-model="form.urls" type="textarea" :rows="12" placeholder="请输入要复制的url地址（格式如下），一行一个连接地址最多支持100行，目前支持【天猫】【淘宝】【1688】，如：
  https://detail.tmall.com/item.htm?id=578706970733
  https://item.taobao.com/item.htm?id=587849464926
  https://detail.1688.com/offer/123456789.html" />
          </el-form-item>

        </el-form>
        <div class="type">
          <label>支持平台</label>
          <img
            src="data:image/png;base64,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"></img>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAI8ElEQVRYhcWYeXBW1RmHn3PO/e69X/YEQggJhkCQxLBpQQioIxYUHaSlWLSi1K06dWS6uNRqtbaOS5epBYMtaKmdCiqdWgaLC0ulgKRQApSCJrIJIQGSkC8k+ba7nf6RL5RSlVDF/v65c+85932fOct7zvuKrsIZnKVKgauAS4AKoATITLV1AgeB94GNwNvAgbMxLnoJpIBZwD1AFSB6aV8DNUA1sAzwz/SD7IXRycAuYCkw4SxgSPWdkPp3V8rW/wxkAwuB1UD5WUB8nMpTthambJ8VUD6wHrjzMwA5XXembOf3Figf2ACMPQcwPRqb8vFfUKcDpQGvA8POIUyPhqV8pX0S0Dxg3OcA06NxKZ8ndSrQZOCOzxGmR3dwyu6Tpzzn/x9gevQs3bEOAwDDuJ4TXRV0tCOKBqA9F+n66EgXWoPMy0YLjbZD6EAjQiF0awQZiyOLC/EkiNYT6FgcMbAAPB+EAAGysZWAJJqPCmAajUBm55XrzIxZ+N7LoqvoOlTL8Y1eSeHE5IThWK+sIQDEgFy8kcPQIYm5dTdBaxSZkY5IuviROvyyi3BHDCX0p9ewSMe7rAonJw1rxUoUYbSdi04zcMaW41VVgh+ggqA7dgNaCDANRFMr5orNGE5iU2CaEw2cRKmTEZ7g3/BFzO/OIrF1N8bsafgZIWRJP1QohDNmKKJfH+TtT+COqYTrZmJOGktoRBlOdQXu8nfwRw8lfd5c9ENlqGgS7+1N+I6L/P1DhNZsR7kaX6SAAk3IMnGbW+DWOQTjK9G3/aiK/kWDDX0iMjWYOVWom6YQMiB5782oC8/He/pFlBiBCNskN9eR9vO70Xm5qGgcf0Ahsk8+pgoRDCshSMtGXTIa9/VNxL0WwvO+j3oyHb3kL7BhF87La5ArazDKSgiqRsCRo0RXrUeNH4NGkFYxCI0pgKsMmZs/0Vi2lsAO4c6ZhLjtCdSmRTCkGK/LQyWjGIV90a6Hn5WB/d6HxJatxYl0IHOy8P62G6kM0l2f+C9eItl0AMoqsVf/AyM3g+BYhLSqCtxvzUQKSbD4dUJfn4p64EZUQzPe9r3d67Z7Jica2lCVyk+iP2hE5+VjPHUnfn4G0hfYFw1BZdjEmjsJonGEk0ASIjzqfJxsC90RJVw1HLWngeTs27CWvoDtuAS3fA+DDLyZV2AV5xO7bwHp0dU4W3YhllSj4pD+x8eITppLkGGjr6nqWeUXSCHUQJ9OEhZYI0tR/fqif/BrVF8bMXQgDC3GT/fRD7+IfayTaEE2Rp9csgOLTBR2RjrEHQwysb92BcJxEXSihIkONH5WOsSOQmMb5qE2bGyCXftIAqGDEYycLLQ+eSspkRxrzEzMmonx55+iN9fh3v4Tui4azolIJ/H1O+l4awtqSBHWI7eQDCkY1J9EIoorNWLoAJxt7xMdkIs78XIcxyc5cjAMGIXUSRCgG5pRxRVQlEci2yJBDG9UCRJIjh5E0NSKMoweoAyJHcZoiiCef4NkRzsiLHEPHkXMmIRfuxv/73WIaybhb9kJBNj1jfhb6gkSDl7IoPPDI5gbt2PdeDnRZ16FHfsxZl2JTzMy4eHaCuOVh+l64Fe4DS24j89H3zCZ2P3VBLOn4N71ZURDy8nIZJDfr9PauLKPE2lDrZ2PJxUFzz0NQwrR87+DCXR++1mceT8knfNxq0ZizJ2FXllD0BkndPlYrHEjcPvnYs1/AVE1nPjNV2L+0kQEAar8PPyFKzGq/4AcU0ly+gTEq+vQy5ahh5QjFjwE6WEgAOiSHG1uiFVOxFv+FF5tHW5BDu7yZbgVpcSnP0hk2n0Y08ahVq0hOracIB7FX7cdb/pYRJqF8fTztE0agRNzUPV74JVV6JxM3BlfgY5O/GSArl6ClZOD2nWA8KMLsZetwBx5MeH7byKtsgT3yHGC7tvtIfWwXXYZxf1HqE4H/8eLsbOz8WyL4PHfEqrdjrWnDu+NnYicTEKH25E1tYit+zA8iXpuOVZjA8GGeuS6HaR3JbESUZw1O1Ceh7ljH97WDzC0gmgUnZsFlg1JjcjJRQ8bhLtiA371a5jhNFBqrega+NVvyq6u53SkDZnRF09qHO2i8jIJRZJ4w4oIGo9D015E/8FQnIc42IhsOYZ39RR8RxOu2YqKxeksHQSXDsd+95+I/U3Erx2PsfswxpEWvNICzMMRfNvE7ZOFfaQNP9KMREBePqTZ4Pt3i67CGYOBvRotEKBaOvGmj8PLz0G/fxB3dBl21EVF2nH6ZuLEPKy4j7YNksOKsPc0YK54F79PNrE7pqHb2jG27UEV5JMYVIAKW6ia95DfmIZ8cBGha8bjjStH3/AgRmFxNxCguw+VMgnsBzYJBCIQ6D6ZBGtqcUyb4NE5hN/YjGhsIXHv9YR2HcY42EJ8fAVieCnWI9WEXn4H0Z5ETBiFNaiIzJ89g7l+J9EpF2I+uYS0DbuRX5qATDgkHptD5JILoKkVExOhBZqT520NsL8nACwAJiJAC4lxIoIZNvDbY6g9u/FCJrothty2l2DaF1AbdyLiMeSSp4i9uQXjSCvWvib0X7fh/2YBwdJVhF96C/G7B/GPx/CXvo0uKYIJFxCKezjrdmCEM1IXEt2z46vh34miojtvKgcQgSYwQ+jAQyUdtGEhTUUQT+BnhjFiLn6kAznlYvShIwRaoNq7CCIR9NQq5HsHCOoOIiaPR7d3QG09xsACdHsnWCbYIXTS67kyoaEOGA74p2auk+nOm0BKRCyJ8H38rHSk60Esjs5MRyZckBCYIWiNIDPCgMRXAiUUOtKBzk5DWDYcj4CSkJOFjiUQUiKCAIQgsE3QJ0fnyh7fp6fSi4Fb+dT6j6k4kxYDt/e8nJ513ANs/vRAvYbZDMw99cPpQDHgWqD+00OdUfUpX7FPAgJoAS4Das8hTG3KR8vpDR+X2zcDlwKLzgHMIrprS80f1fhJ1Y84cBfdO+CzmML6lK27gMTHdepNfWg1UAncSHc07fWKTakGmJ2ysfpMnXtbQTtVpcDVdA97OXAekJVq6wAO0R3oNgJvcpYlvX8B4QuiI4C/dmIAAAAASUVORK5CYII="></img>
          <img
            src="data:image/png;base64,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"></img>
          <img
            src="data:image/png;base64,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"></img>
          <img src="../../../assets/images/jd.jpg"></img>
          <img src="../../../assets/images/yamaxun.jpg"></img>
        </div>
        <div class="operbtn">
          <el-button type="primary" :disabled="form.urls.length == 0" @click="next">下一步：搬家设置</el-button>
        </div>
      </el-card>
    </div>

    <div v-show="step == 2">
      <el-card>
        <div slot="header"><span>搬家配置</span></div>
        <div class="el-table el-table--enable-row-hover el-table--medium">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" size="mini"
            class="demo-ruleForm">
            <el-form-item label="品牌名称" prop="name">

              <el-col :span="8">
                <el-input v-model="ruleForm.name" />
              </el-col>
            </el-form-item>
            <el-form-item label="商品分类" prop="category">
              <el-select v-model="ruleForm.category" filterable placeholder="请选择一级分类" @change="categoryChange">
                <el-option v-for="item in categoryList" :key="item.categoryId" :label="item.categoryName"
                  :value="item.categoryId" />
              </el-select>
              <el-select v-model="ruleForm.category1" style="margin-left:5px" filterable placeholder="请选择"
                @change="categoryChange1">
                <el-option v-for="item in categoryList1" :key="item.categoryId" :label="item.categoryName"
                  :value="item.categoryId" />
              </el-select>
              <el-select v-model="ruleForm.category2" style="margin-left:5px" filterable placeholder="请选择"
                @change="categoryChange2">
                <el-option v-for="item in categoryList2" :key="item.categoryId" :label="item.categoryName"
                  :value="item.categoryId" />
              </el-select>
              <el-select v-model="ruleForm.category3" style="margin-left:5px" filterable placeholder="请选择"
                @change="categoryChange3">
                <el-option v-for="item in categoryList3" :key="item.categoryId" :label="item.categoryName"
                  :value="item.categoryId" />
              </el-select>
            </el-form-item>
            <el-form-item label="运费模版" prop="region">
              <el-select v-model="ruleForm.express" placeholder="请选择运费模版">
                <el-option v-for="item in expressList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
              <el-button @click="onRefreshTemp()">刷新</el-button>
            </el-form-item>
            <el-form-item label="价格设置" prop="price">
              <el-col :span="8" style="display: flex;">
                销售价格=抓取价格 x
                <el-input v-model="ruleForm.name" style="width:100px" /> +
                <el-input v-model="ruleForm.name" style="width:100px" /> 元
              </el-col>
              <el-col :span="8" style="display: flex;">
                市场价格=抓取价格
                <el-select v-model="ruleForm.operator" style="margin-left:5px;width:80px" filterable placeholder="请选择">
                  <el-option key="1" label="+" value="+" />
                  <el-option key="2" label="-" value="-" />
                  <el-option key="3" label="*" value="*" />
                  <el-option key="4" label="/" value="/" />

                </el-select>
                <el-input v-model="ruleForm.marketPrice" style="width:100px" />
              </el-col>
            </el-form-item>
            <el-form-item label="详情图处理" prop="detailPic">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="详情图抓取前20张" />
                <el-radio label="去除广告图" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="退款规则" prop="rules">
              <el-col :span="4" style="display:flex">
                <el-select v-model="ruleForm.rules" style="width:150px" placeholder="请选择退款规则">
                  <el-option key="1" label="支持7天无理由退货" value="1" />
                  <el-option key="4" label="不支持7天无理由退货" value="4" />
                  <el-option key="5" label="支持7天无理由退货(拆封后不支持)" value="5" />
                  <el-option key="6" label="支持7天无理由退货(激活后不支持)" value="6" />
                  <el-option key="7" label="支持7天无理由退货(安装后不支持)" value="7" />
                  <el-option key="8" label="支持7天无理由退货(定制类不支持)" value="8" />
                  <el-option key="9" label="支持7天无理由退货(使用后不支持)" value="9" />
                </el-select>
              </el-col>
              <el-col :span="4" style="display:flex;">
                承诺发货时间：
                <el-select style="width:100px">
                  <el-option key="24" label="24小时" value="24" />
                  <el-option key="48" label="48小时" value="48" />
                  <el-option key="3" label="3天" value="3" />
                  <el-option key="4" label="4天" value="4" />
                  <el-option key="5" label="5天" value="5" />
                  <el-option key="6" label="6天" value="6" />
                  <el-option key="7" label="7天" value="7" />
                  <el-option key="8" label="8天" value="8" />
                  <el-option key="9" label="9天" value="9" />
                  <el-option key="10" label="10天" value="10" />
                  <el-option key="11" label="11天" value="11" />
                  <el-option key="12" label="12天" value="12" />
                  <el-option key="13" label="13天" value="13" />
                  <el-option key="14" label="14天" value="14" />
                  <el-option key="15" label="15天" value="15" />
                </el-select>
              </el-col>

              <el-col :span="12" style="display:flex">

                <el-checkbox v-model="ruleForm.presell" label="是否预售" style="width: 80px;" name="type" />
                <el-date-picker v-if="ruleForm.presell" v-model="ruleForm.time" style="width:120px" type="date"
                  placeholder="预售时间" />
                <el-checkbox style="margin-left:10px" label="补全属性（匹配不上的随机填）" name="type" />

              </el-col>
            </el-form-item>

            <el-form-item label="库存过滤" prop="stock">
              当原商品库存小于
              <el-input-number v-model="ruleForm.stock" :min="1" :max="1000" @change="handleChange" />置为0
            </el-form-item>

            <el-form-item>
              <el-button @click="goback">返回</el-button>
              <el-button type="primary" @click="submitFormStep2('ruleForm')">开始搬家</el-button>

            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-alert title="提交成功，商品正在后台搬家中..." type="success" description="您可以关闭提示，或者直接查看复制记录哦！" :closable="false" show-icon>
      </el-alert>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="copyLog">查看复制记录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { categoryList, expressList, addDept, updateDept, submitTask } from '@/api/system/goods'

export default {
  name: 'Dept',
  dicts: ['sys_normal_disable'],
  components: {},
  data() {
    return {
      step: 1,
      // 遮罩层
      dialogVisible: false,
      loading: true,

      // 弹出层标题
      title: '',
      // 是否显示弹出层

      // 查询参数
      queryParams: {
        urls: [],
        categoryId: ''
      },
      // 表单参数
      form: { urls: '' },
      categoryAll: [], // 所有分类
      categoryList: [],
      categoryList1: [],
      categoryList2: [],
      categoryList3: [],
      expressList: [],
      options: [],
      ruleForm: {
        operator: '+',
        marketPrice: 15,
        name: '',
        category: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        num: 1
      },
      // 表单校验
      rules: {

        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择商品类目', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCategoryList()
    this.getExpressList()
  },
  methods: {
    onRefreshTemp() {

    },
    // 获取类目
    getCategoryList() {
      categoryList().then(res => {
        const list = res.data
        this.categoryAll = res.data
        const newList = []
        for (let i = 0; i < list.length; i++) {
          if (list[i].categoryPid === 0) {
            newList.push(list[i])
          }
        }
        this.categoryList = newList
      })
    },
    // 获取运费模版
    getExpressList() {
      expressList().then(res => {
        this.expressList = res.data.expressTemplateDetailVOS
      })
    },
    goback() {
      this.step = 1
    },
    categoryChange(e) {
      const newList = []
      for (let i = 0; i < this.categoryAll.length; i++) {
        if (this.categoryAll[i].categoryPid === e) {
          newList.push(this.categoryAll[i])
        }
      }
      if (newList.length > 0) {
        this.queryParams.categoryId = ''
      } else {
        this.queryParams.categoryId = e
      }
      this.ruleForm.category1 = ''
      this.ruleForm.category2 = ''
      this.ruleForm.category3 = ''
      this.categoryList1 = newList
    },
    categoryChange1(e) {
      const newList = []
      for (let i = 0; i < this.categoryAll.length; i++) {
        if (this.categoryAll[i].categoryPid === e) {
          newList.push(this.categoryAll[i])
        }
      }
      if (newList.length > 0) {
        this.queryParams.categoryId = ''
      } else {
        this.queryParams.categoryId = e
      }
      this.ruleForm.category2 = ''
      this.ruleForm.category3 = ''
      this.categoryList2 = newList
    },
    categoryChange2(e) {
      const newList = []
      for (let i = 0; i < this.categoryAll.length; i++) {
        if (this.categoryAll[i].categoryPid === e) {
          newList.push(this.categoryAll[i])
        }
      }
      if (newList.length > 0) {
        this.queryParams.categoryId = ''
      } else {
        this.queryParams.categoryId = e
      }
      this.ruleForm.category3 = ''
      this.categoryList3 = newList
    },
    categoryChange3(e) {
      this.queryParams.categoryId = e
    },

    handleChange() { },
    // 下一步
    next() {
      const { urls } = this.form
      if (!urls.trim()) {
        this.$modal.msgError('请输入要复制的地址')
        return
      }
      const addarr = urls.split('\n')
      this.step = 2
      this.queryParams.urls = addarr
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: '0'
      }
      this.resetForm('form')
    },
    // 查看记录
    copyLog() {
      this.$router.push('/copy/record')
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.deptId !== undefined) {
            updateDept(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addDept(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    submitFormStep2(formName) {
      console.log(this.queryParams.categoryId)
      if (!this.queryParams.categoryId) {
        this.$modal.msgError('商品分类没有选择完全')
        return
      }
      submitTask(this.queryParams).then(res => {
        this.dialogVisible = true
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }

  }
}
</script>

<style scoped>
.type {
  display: flex;
  align-items: center;
}

img {
  width: 20px;
  height: 20px;
  margin-left: 16px;
  border-radius: 50%;
}

.operbtn {
  margin-top: 50px;
  text-align: center;
}

.el-alert {
  padding: 41px 16px;
}

/deep/ .el-alert__title {
  font-size: 18px !important;
}

/deep/ .el-alert__description {
  font-size: 15px !important
}
</style>

