<template>
    <div>
        <div class="text-right">
            <button class="btn btn-primary mt-4" data-toggle="modal" data-target="#productModal">Create New Products</button>
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
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item) in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-right">{{item.origin_price}}</td>
                    <td class="text-right">{{item.price}}</td>
                    <td>
                        <span v-if="item.is_enabled" class="text-success">Enabled</span>
                        <span v-else>Disable</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Modal -->
<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products`;
      const vm = this;
      //   console.log(
      //     "A PATH",
      //     process.env.VUE_APP_APIPATH,
      //     process.env.VUE_APP_CUSTOMPATH
      //   );
      this.$http.get(api).then(response => {
        console.log("A API", response.data);
        vm.products = response.data.products;
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>