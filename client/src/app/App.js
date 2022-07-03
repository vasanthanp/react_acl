import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeOutlet from "./components/HomeOutlet/HomeOutlet";
import SigninComponent from "./components/SigninComponent/SigninComponent";
import SignupComponent from "./components/SignupComponent/SignupComponent";
import Dashboard from "./components/Dashboard/Dashboard";
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import ProductsComponent from "./components/ProductsComponent/ProductsComponent";
import CreateProductComponent from "./components/CreateProductComponent/CreateProductComponent";
import UpdateProductComponent from "./components/UpdateProductComponent/UpdateProductComponent";
import DeleteProductComponent from "./components/DeleteProductComponent/DeleteProductComponent";
import { ProtectedRoute } from "./routes/ProtectedRoute";
function App() {
  const [authState, authDispatch] = useContext(AuthContext);
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<HomeOutlet />}>
          {
            authState.user ?
              <>
                <Route path="" element={<Navigate to={'/products'} />} />
                <Route path="products" element={<ProductsComponent />} />

                {/* //Seller */}
                <Route path="product/create"
                  element={
                    <ProtectedRoute role='seller'>
                      <CreateProductComponent />
                    </ProtectedRoute>
                  } />
                <Route path="product/update"
                  element={
                    <ProtectedRoute role='seller'>
                      <UpdateProductComponent />
                    </ProtectedRoute>
                  } />
                {/* //Supporter */}
                <Route path="product/delete" 
                element={
                <ProtectedRoute role='supporter'>
                <DeleteProductComponent />
                </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to={'/'} />} />
              </>
              :
              <>
                <Route path="" element={<Navigate to={'/signin'} />} />
                <Route path="signin" element={<SigninComponent />} />
                <Route path="signup" element={<SignupComponent />} />
                <Route path="*" element={<Navigate to={'/signin'} />} />
              </>
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
