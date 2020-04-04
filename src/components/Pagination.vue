<template>
    <div>
    <nav aria-label="Page navigation example">
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
    </nav>

    </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      pagination: {}
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
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    }
  },
  created() {}
};
</script>
