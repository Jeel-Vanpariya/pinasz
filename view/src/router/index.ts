import store from '@/stores';
import { createRouter, createWebHistory, NavigationGuardNext } from 'vue-router';

const checkAuth = async (to: any, _: any, next: NavigationGuardNext) => {
  if (sessionStorage.getItem('user_id')) {
    store.state.spinner = true;
    const res = await store.dispatch('checkUser', { id: sessionStorage.getItem('user_id') });
    store.state.spinner = false;
    if (res.data) store.state.permission = JSON.parse(res.data.permissions);
    if (
      res.data &&
      ((['ProductCategory', 'Products', 'AddProduct', 'EditProduct'].includes(to.name) && store.state.permission.product.length == 0) ||
        (['SuppliersList', 'AddSupplier', 'EditSupplier'].includes(to.name) && store.state.permission.supplier.length == 0) ||
        (['CustomersList', 'AddCustomer', 'EditCustomer'].includes(to.name) && store.state.permission.customer.length == 0) ||
        (['ShipmentList', 'AddShipment', 'EditShipment'].includes(to.name) && store.state.permission.shipment.length == 0) ||
        (['UsersList', 'CreateRole', 'EditRole', 'RoleList'].includes(to.name) && store.state.permission.user.length == 0) ||
        (['EditRole'].includes(to.name) && to.params.id == 1) ||
        (['ReportList', 'CreateReport', 'EditReportBlueprint', 'CreateReportBlueprint', 'ReportBlueprintList'].includes(to.name) && store.state.permission.report.length == 0) ||
        store.state.permission.other.length == 0)
    ) {
      next({ name: 'UserLogin' });
      return;
    }
    if (res.status != 'success') {
      next({ name: 'UserLogin' });
      return;
    } else if (to.name == 'UserLogin') {
      next({ name: 'dashboard' });
      return;
    }
  } else if (to.name !== 'UserLogin') {
    next({ name: 'UserLogin' });
    return;
  }
  next();
  return;
};
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: () => import('../modules/UserAuth/view/UserAuth.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../modules/dashboard/view/Dashboard.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/product-category',
      name: 'ProductCategory',
      component: () => import('../modules/categoryMaster/view/CategoryList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/suppliers',
      name: 'SuppliersList',
      component: () => import('../modules/supplierMaster/view/SuppliersList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-supplier',
      name: 'AddSupplier',
      component: () => import('../modules/supplierMaster/view/AddSupplier.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-supplier/:id',
      name: 'EditSupplier',
      component: () => import('../modules/supplierMaster/view/AddSupplier.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/customers',
      name: 'CustomersList',
      component: () => import('../modules/customerMaster/view/CustomersList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-customer',
      name: 'AddCustomer',
      component: () => import('../modules/customerMaster/view/AddCustomer.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-customer/:id',
      name: 'EditCustomer',
      component: () => import('../modules/customerMaster/view/AddCustomer.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('../modules/productMaster/view/ProductList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-product',
      name: 'AddProduct',
      component: () => import('../modules/productMaster/view/AddProduct.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-product/:id',
      name: 'EditProduct',
      component: () => import('../modules/productMaster/view/AddProduct.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/shipments',
      name: 'ShipmentList',
      component: () => import('../modules/shipmentMaster/view/ShipmentsList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-shipment',
      name: 'AddShipment',
      component: () => import('../modules/shipmentMaster/view/AddShipment.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-shipment/:id',
      name: 'EditShipment',
      component: () => import('../modules/shipmentMaster/view/AddShipment.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/payment-terms',
      name: 'PaymentTermList',
      component: () => import('../modules/paymentTermMaster/view/PaymentTermList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/container-types',
      name: 'ContainerTypeList',
      component: () => import('../modules/containerTypeMaster/view/ContainerTypeList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/invoicing-parties',
      name: 'InvoicingPartyList',
      component: () => import('../modules/invoicingPartyMaster/view/InvoicingPartyList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/loading-ports',
      name: 'LoadingPortList',
      component: () => import('../modules/loadingPortMaster/view/LoadingPortList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/destination-ports',
      name: 'DestinationPortList',
      component: () => import('../modules/destinationPortMaster/view/DestinationPortList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/final-destinations',
      name: 'FinalDestinationList',
      component: () => import('../modules/finalDestinationMaster/view/FinalDestinationList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/consignees',
      name: 'ConsigneeList',
      component: () => import('../modules/consigneeMaster/view/ConsigneeList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-consignee',
      name: 'AddConsignee',
      component: () => import('../modules/consigneeMaster/view/AddConsignee.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/add-consignee/:id',
      name: 'EditConsignee',
      component: () => import('../modules/consigneeMaster/view/AddConsignee.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/users',
      name: 'UsersList',
      component: () => import('../modules/userMaster/view/UsersList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/report-blueprints',
      name: 'ReportBlueprintList',
      component: () => import('../modules/reportMaster/view/ReportBlueprintList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/create-report-blueprint',
      name: 'CreateReportBlueprint',
      component: () => import('../modules/reportMaster/view/CreateReportBlueprint.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/create-report-blueprint/:id',
      name: 'EditReportBlueprint',
      component: () => import('../modules/reportMaster/view/CreateReportBlueprint.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/create-report/:id',
      name: 'CreateReport',
      component: () => import('../modules/reportMaster/view/CreateReport.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/reports',
      name: 'ReportList',
      component: () => import('../modules/reportMaster/view/ReportList.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/create-role',
      name: 'CreateRole',
      component: () => import('../modules/roleMaster/view/AddRole.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/create-role/:id',
      name: 'EditRole',
      component: () => import('../modules/roleMaster/view/AddRole.vue'),
      beforeEnter: checkAuth
    },
    {
      path: '/roles',
      name: 'RoleList',
      component: () => import('../modules/roleMaster/view/RoleList.vue'),
      beforeEnter: checkAuth
    }
  ],
  scrollBehavior() {
    // return desired position
    return { top: 0 };
  }
});

export default router;
