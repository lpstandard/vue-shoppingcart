<template>
    <div>
    <div>
        <loading :active.sync="isLoading"></loading>
    </div>
        <div class="text-right">
            <button class="btn btn-primary mt-4" @click="openModal(true)">Create New Products</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">Category</th>
                    <th>Name</th>
                    <th width="120">Original Price</th>
                    <th width="120">Sale Price</th>
                    <th width="100">Enabled</th>
                    <th width="80">Edit</th>
                    <th width="120">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-right">{{item.origin_price | currency}}</td>
                    <td class="text-right">{{item.price | currency}}</td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">Enabled</span>
                        <span v-else>Disable</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">Edit</button>
                    </td>
                    <td>
                        <button class="btn btn-outline-danger  btn-sm" @click="deleteModal(item)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
<!-- Pagination -->
        <!-- <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{'disabled': !pagination.has_pre}">
              <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active': pagination.current_page === page}"><a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a></li>
            <li class="page-item">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
            </li>
          </ul>
        </nav> -->
<!-- Modal -->
<div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>新增產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input v-model="tempProduct.image" type="text" class="form-control" id="image"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="customFile">或 上傳圖片
                <i class="fas fa-spinner" v-if="status.fileUploading"></i>
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change="uploadFile">
            </div>
            <!-- <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
              class="img-fluid" alt=""> -->
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input v-model="tempProduct.title" type="text" class="form-control" id="title"
                placeholder="請輸入標題">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input v-model="tempProduct.category" type="text" class="form-control" id="category"
                  placeholder="請輸入分類">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input v-model="tempProduct.unit" type="unit" class="form-control" id="unit"
                  placeholder="請輸入單位">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input v-model="tempProduct.origin_price" type="number" class="form-control" id="origin_price"
                  placeholder="請輸入原價">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input v-model="tempProduct.price" type="number" class="form-control" id="price"
                  placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea v-model="tempProduct.description" type="text" class="form-control" id="description"
                placeholder="請輸入產品描述"></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea v-model="tempProduct.content" type="text" class="form-control" id="content"
                placeholder="請輸入產品說明內容"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                v-model="tempProduct.is_enabled"
                :true-value="1"
                :false-value="0"
                  id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click="deleteProducts"
          >確認刪除</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      pagination: {},
      status: {
        fileUploading: false
      }
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products?page=${page}`;
      const vm = this;
      //   console.log(
      //     "A PATH",
      //     process.env.VUE_APP_APIPATH,
      //     process.env.VUE_APP_CUSTOMPATH
      //   );
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("A API", response.data);
        if (response.data.success) {
          vm.isLoading = false;
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },
    deleteModal(item) {
      this.tempProduct = item;
      $("#delProductModal").modal("show");
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/product`;

      let httpMethod = "post";

      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${
          process.env.VUE_APP_CUSTOMPATH
        }/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log("Message after update", response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("Update fail");
        }
      });
    },
    deleteProducts() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/product/${vm.tempProduct.id}`;
      let httpMethod = "delete";

      this.$http[httpMethod](api).then(response => {
        console.log("Message after delete", response.data);
        console.log("vm.tempProduct", vm.tempProduct);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          $("#delProductModal").modal("hide");
          vm.getProducts();
          console.log("Delete fail");
        }
      });
    },
    uploadFile() {
      console.log("This is upload file", this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/admin/upload`;
      vm.status.fileUploading = true;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          vm.status.fileUploading = false;
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
            // $("#delProductModal").modal("hide");
            // vm.getProducts();
          } else {
            this.$bus.$emit("message:push", "something", "danger");
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

