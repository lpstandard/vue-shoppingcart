  <template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
              <del class="h6" v-if="item.price">{{item.origin_price}}</del>
              <div class="h5" v-if="item.price">{{item.price}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" 
            @click="addToCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
<!-- modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
        <div class="modal-body">
          <img :src="product.image" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
            <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
            <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
          </div>
          <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
        </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
            @click="addToCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
            
          </div>
          <table class="table">
  <thead>
    <th></th>
    <th>品名</th>
    <th>數量</th>
    <th>單價</th>
  </thead>
  <tbody>
    <tr v-for="item in cart.carts" :key="">
      <td class="align-middle">
        <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
          <i class="far fa-trash-alt"></i>
        </button>
      </td>
      <td class="align-middle">
        {{ item.product.title }}
        <!-- <div class="text-success" v-if="item.coupon">
          已套用優惠券
        </div> -->
      </td>
      <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
      <td class="align-middle text-right">{{ item.final_total }}</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3" class="text-right">總計</td>
      <td class="text-right">{{ cart.total }}</td>
    </tr>
    <tr>
      <td colspan="3" class="text-right text-success">折扣價</td>
      <td class="text-right text-success">{{ cart.final_total }}</td>
    </tr>
  </tfoot>
</table>
<div class="input-group mb-3 input-group-sm">
  <input type="text" class="form-control" placeholder="請輸入優惠碼">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">
      套用優惠碼
    </button>
  </div>
</div>
        </div>
      </div>
    </div>

 <ValidationObserver v-slot="{ handleSubmit }">

<div class="my-5 row justify-content-center">
<form class="col-md-6" @submit.prevent="handleSubmit(createOrder)">
<ValidationProvider name="email" rules="required">
  <div slot-scope="{ errors }">
    <div class="form-group">
      <label for="useremail">Email</label>
      <input type="email" class="form-control" name="email" id="useremail"
        v-model="form.user.email" placeholder="請輸入 Email">
      <span class="text-danger">{{ errors[0] }}</span>
    </div>
  </div>
</ValidationProvider>

<div class="form-group">
  <label for="username">收件人姓名</label>
  <input type="text" class="form-control" name="name" id="username"
    v-model="form.user.name" placeholder="輸入姓名">
  <span class="text-danger"></span>
</div>

<div class="form-group">
  <label for="usertel">收件人電話</label>
  <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
</div>

<div class="form-group">
  <label for="useraddress">收件人地址</label>
  <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
    placeholder="請輸入地址">
  <span class="text-danger">地址欄位不得留空</span>
</div>

<div class="form-group">
  <label for="comment">留言</label>
  <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
</div>

<div class="text-right">
  <button class="btn btn-danger">送出訂單</button>
</div>

</form>
</div>
 </ValidationObserver>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ""
      },
      order: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        }
      },
      cart: {},
      isLoading: false,
      coupon_code: ""
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products`;
      console.log("URL", url);
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        console.log(response.data);
        // vm.getProducts();
        // vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/product/${id}`;
      console.log("URL", url);
      vm.status.loadingItem = id;
      this.$http.get(url).then(response => {
        vm.product = response.data.product;
        console.log("getProduct", response);
        $("#productModal").modal("show");
        // vm.getProducts();
        // vm.pagination = response.data.pagination;

        vm.status.loadingItem = "";
      });
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const cart = {
        product_id: id,
        qty
      };
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      // console.log("URL", url);
      vm.status.loadingItem = id;
      this.$http.post(url, { data: cart }).then(response => {
        // console.log("getProduct", response);
        vm.status.loadingItem = "";
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      vm.isLoading = true;
      this.$http.get(url).then(response => {
        console.log("cart", response);
        vm.isLoading = false;
      });
    },
    removeCartItem(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      vm.isLoading = true;
      this.$http.delete(url).then(response => {
        console.log("cart", response);
        vm.isLoading = false;
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/order`;
      const order = vm.form;
      // vm.isLoading = true;
      this.$http.post(url, { data: order }).then(response => {
        if (response) {
          console.log("訂單已建立", response);
          if (response.data.success) {
            console.log("url", url);
            vm.$router.push(`/customer_checkout/${response.data.orderId}`);
          }
          vm.isLoading = false;
        } else {
          console.log("upload failed");
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
