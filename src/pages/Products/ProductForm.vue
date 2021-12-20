<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h6>{{isEdit ? 'Edit' : 'Create'}}</h6>
    <q-form ref="productForm" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Name *"
        hint="Product name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="price"
        label="Price *"
        hint="Product price"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-btn label="Save" type="submit" color="primary" />
        <q-btn label="Cancel" color="primary" flat class="q-ml-sm" @click="onCancel" />
      </div>
    </q-form>
  </div>
</template>
<script>
export default {
  name: "ProductForm",
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      id: null,
      name: null,
      price: null
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", {
        id: this.id,
        name: this.name,
        price: this.price
      });
      this.$refs.productForm.reset();
    },
    onCancel() {
      this.$emit("cancel");
      this.$refs.productForm.reset();
    },
    onReset() {
      this.id = null;
      this.name = null;
      this.price = null;
    }
  },
  computed: {
    isEdit() {
      return this.id ? true : false;
    }
  },
  watch: {
    item: {
      handler(val) {
        if (val) {
          const { id, name, price } = val;
          this.name = name;
          this.price = price;
          this.id = id;
        }
      },
      deep: true
    }
  },
  beforeDestroy() {
    console.log("before destroy");
  }
};
</script>
