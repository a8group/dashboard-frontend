<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="left" label="服务名称（唯一标识）">
        <template slot-scope="scope">
          <router-link :to="'/blocks/'+scope.row.metadata.name+'/edit'" class="link-type">
            <span>{{ scope.row.metadata.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="left" label="UUID">
        <template slot-scope="scope">
          <span>{{ scope.row.metadata.uid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.metadata.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <router-link :to="'/blocks/'+scope.row.metadata.name+'/edit'">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { fetchList } from "@/api/block";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "BlockList",
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 1000
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.items;
        this.total = response.items.length;
        this.listLoading = false;
      });
    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.total-container {
  background: #fff;
  padding: 32px 16px;
}
</style>
