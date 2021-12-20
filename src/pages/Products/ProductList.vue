<template>
  <div>
    <q-table title="Products" :data="data" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn @click="onEdit(props.row)" flat round size="sm" icon="edit"></q-btn>
          <q-btn @click="onDelete(props.row)" flat round size="sm" icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    data: Array
  },
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "ID",
          field: "id"
        },
        {
          name: "name",
          label: "Name",
          field: "name"
        },
        {
          name: "price",
          label: "Price",
          field: "price"
        },
        {
          name: "createdAt",
          label: "Created At",
          field: "createdAt",
          format: (val, row) => `${val.toISOString()}`
        },
        {
          name: "actions",
          field: "actions",
          headerStyle: "max-width: 50px",
          align: "left"
        }
      ]
    };
  },
  methods: {
    onDelete(item) {
      this.$emit("onDelete", item);
    },
    onEdit(item) {
      this.$emit("onEdit", item);
    }
  }
};
</script>
