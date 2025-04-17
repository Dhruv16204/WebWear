import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
import AdminProductSlice from './admin/products-slice/index'
import AdminOrderSlice from './admin/order-slice/index'
import ShopProductSlice from './shop/products-slice/ShopProductSlice';
import ShopCartSlice from './shop/cart-slice/ShopCartSlice';
import ShopAddressSlice from './shop/address-slice/addressSlice';
import ShopOrderSlice from './shop/order-slice/shoppingOrderSlice';

const store = configureStore({
    reducer:{
        auth: authReducer ,
        adminProducts : AdminProductSlice,
        adminOrder : AdminOrderSlice,
        shopProducts : ShopProductSlice,
        shopCart : ShopCartSlice,
        shopAddress: ShopAddressSlice,
        shopOrder : ShopOrderSlice
    }
})

export default store;
