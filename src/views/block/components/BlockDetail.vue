<template>
  <div>
    <div v-if="isCreate">
      <el-form
        ref="postForm"
        :model="postForm"
        label-width="80px"
        style="margin: 30px 100px 0px 6px;"
      >
        <el-form-item label="服务名称">
          <el-input v-model="postForm.metadata.name" placeholder="唯一标识一个服务，不可更改，小写字母、数字、半角点与横杆" />
        </el-form-item>
        <el-form-item label="服务简介">
          <el-input
            v-model="postForm.metadata.annotations.description"
            type="textarea"
            :rows="3"
            placeholder="描述服务提供的能力"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="isEdit" class="components-container">
      <div class="editor-container">
        <el-button type="primary" style="margin: 0 0 20px 0" @click="updateForm">保存</el-button>
        <router-link :to="'/blocks/list'">
          <el-button type="primary">取消</el-button>
        </router-link>
        <json-editor ref="jsonEditor" v-model="postForm" />
      </div>
    </div>
  </div>
</template>

<script>
import { createBlock, fetchBlock, updateBlock } from '@/api/block'
import JsonEditor from '@/components/JsonEditor'

const defaultForm = {
  api_version: 'v1',
  kind: 'block',
  metadata: {
    name: '',
    annotations: {
      description: ''
    }
  },
  spec: {}
}

export default {
  name: 'BlockDetail',
  components: { JsonEditor },
  props: {
    isCreate: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    isView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }

    return {
      postForm: Object.assign({}, defaultForm),
      rules: {
        'metadata.name': [{ validator: validateRequire }]
      }
    }
  },
  created() {
    console.log(this.action)
    if (this.isView || this.isEdit) {
      const name = this.$route.params && this.$route.params.name
      this.fetchData(name)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(name) {
      fetchBlock(name)
        .then(response => {
          this.postForm = response
        })
        .catch(err => {
          console.log(err)
        })
    },
    submitForm() {
      console.log(this.postForm)

      createBlock(this.postForm).then(() => {
        this.$notify({
          title: '成功',
          message: '创建服务成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateForm() {
      console.log(this.postForm)

      updateBlock(this.$route.params.name, this.postForm).then(() => {
        this.$notify({
          title: '成功',
          message: '保存服务成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style scoped>
.editor-container {
  position: relative;
  height: 100%;
}
</style>
