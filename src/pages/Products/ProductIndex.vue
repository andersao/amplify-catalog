<template>
  <div>
    <ProductDrawer v-model="openForm" :selected="selected" @save="onSave" @close="onCloseForm" />
    <q-page padding>
      <ProductList :data="data" @onEdit="openEditForm" @onDelete="doDelete" />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="openCreateForm" fab icon="add" color="accent" />
      </q-page-sticky>
    </q-page>
  </div>
</template>

<script>
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Product } from "../../models";
import ProductList from "./ProductList";
import ProductDrawer from "./ProductDrawer";

const uid = function() {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2)
  );
};

export default {
  name: "ProductIndex",
  components: {
    ProductList,
    ProductDrawer
  },
  data() {
    return {
      selected: null,
      openForm: false,
      data: []
    };
  },
  methods: {
    async fetch() {
      const products = await DataStore.query(Product, Predicates.ALL);
      console.log(products);
      this.data = products;
    },
    openEditForm(item) {
      this.selected = item;
      this.openForm = true;
    },
    openCreateForm() {
      this.selected = null;
      this.openForm = true;
    },
    onCloseForm() {
      this.selected = null;
      this.openForm = false;
    },
    async onSave(item) {
      const handler = item.id ? this.doUpdate : this.doCreate;
      await handler(item);
      this.selected = null;
    },
    async doCreate(item) {
      const { name, price } = item;
      await DataStore.save(
        new Product({
          name,
          price: Number(price)
        })
      );
    },
    async doUpdate(item) {
      const index = this.data.findIndex(({ id }) => id === item.id);
      this.data.splice(index, 1, { ...this.data[index], ...item });
    },
    doDelete(item) {
      this.selected = null;
      this.data = this.data.filter(({ id }) => id !== item.id);
    }
  },
  async mounted() {
    await this.fetch();
  }
};
</script>
