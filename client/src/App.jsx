import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/not-found/index'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page/index'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice/index'
import { Skeleton } from "@/components/ui/skeleton"
import ShoppingHome from './pages/shopping-view/home'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingListing from './pages/shopping-view/listing'
import PaypalReturnPage from './pages/shopping-view/PaypalReturnPage'
import PaymentSuccessPage from './pages/shopping-view/PaymentSuccessPage'
import SearchProducts from './pages/shopping-view/search'
import LoadingSpinner from './components/common/LoadingSpinner'


function App() {

  const {user , isAuthenticated , isLoading} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();

  useEffect(()=>{
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispatch(checkAuth(token))
  },[dispatch]);

  if(isLoading) {return <LoadingSpinner/>}


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route
            path="/"
            element={
              <CheckAuth
                isAuthenticated={isAuthenticated}
                user={user}
              ></CheckAuth>
            }
          />
          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout/>
            </CheckAuth>
          }>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='register' element={<AuthRegister/>} />
        </Route>

        {/* admin related paths */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard/>} />
          <Route path='orders' element={<AdminOrders/>} />
          <Route path='products' element={<AdminProducts/>} />
          <Route path='features' element={<AdminFeatures/>} />
        </Route>

        {/* shopping related paths */}
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome/>} />
          <Route path='account' element={<ShoppingAccount/>} />
          <Route path='checkout' element={<ShoppingCheckout/>} />
          <Route path='listing' element={<ShoppingListing/>} />
          <Route path='paypal-return' element={<PaypalReturnPage/>} />
          <Route path='payment-success' element={<PaymentSuccessPage/>} />
          <Route path='search' element={<SearchProducts/>} />
        </Route>

        {/* unauthpage */}
        <Route path='/unauth-page' element={<UnauthPage/>}/>

        <Route path='*' element={<NotFound/>}/>

        
      </Routes>



    </div>
  )
}

export default App
