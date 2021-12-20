<template>
  <q-drawer
    ref="formDrawer"
    v-model="opened"
    side="right"
    behavior="mobile"
    overlay
    elevated
    @before-show="beforeShow"
  >
    <ProductForm @submit="onSubmit" @cancel="onCancel" :item="entity" />
  </q-drawer>
</template>
<script>
import ProductForm from "./ProductForm";

export default {
  name: "ProductDrawer",
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    selected: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ProductForm
  },
  data() {
    return {
      entity: null
    };
  },
  methods: {
    onSubmit(data) {
      this.$emit("save", data);
      this.opened = false;
    },
    onCancel() {
      this.$emit("cancel");
      this.opened = false;
    },
    beforeShow() {
      this.entity = {
        ...this.selected
      };
    }
  },
  computed: {
    opened: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      }
    }
  }
};
</script>
