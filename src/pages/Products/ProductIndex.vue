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
      await this.fetch();
    },
    async doUpdate(item) {
      const original = await DataStore.query(Product, item.id);
      await DataStore.save(
        Product.copyOf(original, updated => {
          updated.name = item.name;
          updated.price = Number(item.price);
        })
      );
      await this.fetch();
    },
    async doDelete(item) {
      const product = await DataStore.query(Product, item.id);
      await DataStore.delete(product);
      await this.fetch();
    }
  },
  async mounted() {
    await this.fetch();
  }
};
</script>
