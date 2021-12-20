<template>
  <q-layout view="lHr lpR lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Catalog</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-item to="/" clickable v-ripple>
        <q-item-section>
          <q-item-label>Home</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/products" clickable v-ripple>
        <q-item-section>
          <q-item-label>Products</q-item-label>
        </q-item-section>
      </q-item>
      <q-item @click="doLogout" clickable v-ripple>
        <q-item-section>
          <q-item-label>Sair</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    async doLogout() {
      await Auth.signOut();
    }
  }
};
</script>
