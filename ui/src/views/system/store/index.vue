<template>
  <div class="app-container">

    <el-card>
      <div slot="header"><span>整店搬家</span></div>
      <el-form ref="queryForm" :model="queryParams" size="small" :inline="false">
        <el-form-item label="商品地址" prop="deptName">
          <el-input
            v-model="form.address"
            type="textarea"
            :rows="6 "
            placeholder="请输入要复制的商品链接（格式如下），一次只能抓取一个店铺url，目前支持【天猫】【淘宝】【1688】，如：
https://shop.tmall.com
https://shop.taobao.com
https://shop5w6662w79w224.1688.com/"
          />
        </el-form-item>

      </el-form>
      <div class="operbtn">
        <el-button type="primary" :disabled="form.address.length==0" @click="next">获取商品</el-button>
      </div>
    </el-card>

    <el-card style="margin-top:10px;">
      <div slot="header"><span>商品信息</span></div>
      <el-form ref="queryForm" :model="queryParams" size="small" :inline="true">
        <el-form-item label="商品名称" prop="deptName">
          <el-input
            v-model="queryParams.deptName"
            placeholder="请输入商品名称"
            clearable
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="价格" prop="status">
          <el-select v-model="queryParams.status" placeholder="商品价格" clearable>
            <el-option
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <el-button type="primary" size="mini" @click="handleQuery">开始搬家</el-button>

        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        :data="goodsList"
        row-key="id"
      >
        <el-table-column prop="deptName" label="商品来源" width="260" />
        <el-table-column prop="orderNum" label="商品ID" width="200" />
        <el-table-column prop="orderNum" label="商品名称" width="200" />
        <el-table-column prop="orderNum" label="商品价格" width="200" />

        <el-table-column prop="status" label="商品图片" width="100">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="200">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['system:dept:edit']"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
            >修改</el-button>
            <el-button
              v-hasPermi="['system:dept:add']"
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAdd(scope.row)"
            >新增</el-button>
            <el-button
              v-if="scope.row.parentId != 0"
              v-hasPermi="['system:dept:remove']"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import { taskList, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from '@/api/system/goods'

export default {
  name: 'Dept',
  dicts: ['sys_normal_disable'],
  components: { },
  data() {
    return {
      step: 2,
      // 遮罩层
      loading: true,
      goodsList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层

      // 查询参数
      queryParams: {
        deptName: undefined,
        status: undefined
      },
      // 表单参数
      form: { address: '' },
      ruleForm: {
        name: '',
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
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
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
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      taskList(this.queryParams).then(response => {
        this.deptList = this.handleTree(response.data.rows, 'goodsId')
        this.loading = false
      })
    },
    // 下一步
    next() {
      const { address } = this.form
      const addrarr = address.split('\n')
      const params = {
        urls: addrarr
      }
      this.loading = true
    }

  }
}
</script>

<style scoped>
   .type{
      display: flex;
      align-items: center;
   }
    img{
      width: 20px;
      height: 20px;
      margin-left: 16px;
    }
    .operbtn{
      /* text-align: center; */
    }
  </style>

