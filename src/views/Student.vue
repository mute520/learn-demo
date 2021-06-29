<template>
  <div class="student">
    <el-table :data="tableData" stripe :header-cell-style="{background:'#cdcbd4'}">
      <el-table-column prop="uid" label="学号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="address" label="住址"></el-table-column>
      <el-table-column prop="reg_date" label="时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="clickAdd" type="text" size="mini">增加</el-button>
          <el-button @click="deleteInfo(scope.row)" type="text" size="mini">删除</el-button>
          <el-button @click="clickUpdate(scope.row)" type="text" size="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible" :title="oTitle">
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-position="left" label-width="80px">
        <el-form-item prop="uid" label="学号">
          <el-input v-model="formData.uid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="formData.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="major" label="专业">
          <el-input v-model="formData.major"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="住址">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item prop="reg_date" label="时间">
          <el-date-picker v-model="formData.reg_date" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-button @click="visible = false" size="mini">取消</el-button>
      <el-button @click="save" type="primary" size="mini">确定</el-button>
    </el-dialog>
    <!-- <Progress/> -->
  </div>
</template>

<script>
import { getStudentInfo, addStudentInfo, deleteStudentInfo, udpateStudentInfo, createStudents } from '@/api'
// import Progress from '@/components/Progress'

export default {
  name: 'studentInfo',
  // components: { Progress },
  data() {
    const uidValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('学号不允许为空或输入值不符合'))
      } else {
        callback()
      }
    }
    const nameValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('姓名不允许为空或输入值不符合'))
      } else {
        callback()
      }
    }
    const majorValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('专业不允许为空或输入值不符合'))
      } else {
        callback()
      }
    }
    const addressValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('住址不允许为空或输入值不符合'))
      } else {
        callback()
      }
    }
    const timeValidator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('时间不允许为空或输入值不符合'))
      } else {
        callback()
      }
    }
    return {
      oType: 'add',
      tableData: [],
      visible: false,
      formData: {
        uid: '',
        name: '',
        sex: '男',
        major: '',
        address: '',
        reg_date: ''
      },
      rules: {
        uid: [{ validator: uidValidator }],
        name: [{ validator: nameValidator }],
        major: [{ validator: majorValidator }],
        address: [{ validator: addressValidator }],
        reg_date: [{ validator: timeValidator }],
      },
    }
  },
  computed: {
    oTitle() { return this.oType === 'add' ? '新增学生信息' : '修改学生信息' },
  },
  mounted() {
    this.getStudentInfo()
  },
  methods: {
    getStudentInfo() {
      getStudentInfo().then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
        }
      })
    },
    initData() {
      // this.formData = { uid: '', name: '', sex: '男', major: '', address: '' }
      this.$refs['ruleForm'] && this.$refs['ruleForm'].resetFields()
      console.log('formData: ', JSON.stringify(this.formData, null, 2))
    },
    clickAdd() {
      this.initData()
      this.visible = true
      this.oType = 'add'
      const uidList = this.tableData.map(_ => +_.uid)
      this.formData.uid = `${Math.max(...uidList) + 1}`
    },
    addInfo() {
      // createStudents()
      // return
      const param = {
        uid: this.formData.uid,
        name: this.formData.name,
        sex: this.formData.sex,
        major: this.formData.major,
        address: this.formData.address,
        reg_date: this.formData.reg_date,
      }
      addStudentInfo(param).then(res => {
        if (res.data.code === 200) {
          this.$message.success('新增成功，'+res.data.msg)
          this.getStudentInfo()
        }
      })
    },
    deleteInfo(row) {
      this.$confirm('确定要删除该学生信息吗？', '提示').then(() => {
        deleteStudentInfo({ uid: row.uid }).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            this.getStudentInfo()
          }
        })
      }).catch(() => {})
    },
    clickUpdate(row) {
      const { uid, name, sex, major, address, reg_date } = row
      this.visible = true
      this.oType = 'update'
      this.formData = { uid, name, sex, major, address, reg_date }
    },
    updateInfo() {
      const param = {
        uid: this.formData.uid,
        name: this.formData.name,
        sex: this.formData.sex,
        major: this.formData.major,
        address: this.formData.address,
        reg_date: this.formData.reg_date,
      }
      udpateStudentInfo(param).then(res => {
        if (res.data.code === 200) {
          this.$message.success('修改成功，' + res.data.msg)
          this.getStudentInfo()
        }
      })
    },
    save() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.oType === 'add' ? this.addInfo() : this.updateInfo()
          this.visible  = false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.student {
  height: 100%;
  overflow: auto;
}
</style>