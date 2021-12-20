const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "products",
        component: () => import("pages/Products/ProductIndex.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/Login.vue"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
