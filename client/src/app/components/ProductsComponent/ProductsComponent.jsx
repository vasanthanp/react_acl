import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext, useLoader } from "../../context/AuthContext";
import helperService from "../../services/helperService";
import { apis } from './apidata'
const ProductsComponent = () => {
    const [loader,showLoader,hideLoader] = useLoader();
    const [authState] = useContext(AuthContext)
    const getProducts = async (e) => {
        e.preventDefault();
        try {
            showLoader()
            const { message, data } = await helperService.getProducts(JSON.stringify({}),`Bearer ${authState.user.token}`);
            toast(message)
            hideLoader()
        } catch (err) {
            hideLoader()
            console.log(err)
            toast(err.message || "Server not response");

        }
    }
    const addProduct = async (e) => {
        e.preventDefault();
        try {
            showLoader()
            const { message, data } = await helperService.addProduct(JSON.stringify({}),`Bearer ${authState.user.token}`);
            toast(message)
            hideLoader()
        } catch (err) {
            hideLoader()
            console.log(err)
            toast(err.message || "Server not response");

        }
    }
    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            showLoader()
            const { message, data } = await helperService.updateProduct(JSON.stringify({}),`Bearer ${authState.user.token}`);
            toast(message)
            hideLoader()
        } catch (err) {
            hideLoader()
            console.log(err)
            toast(err.message || "Server not response");

        }
    }
    const deleteProduct = async (e) => {
        e.preventDefault();
        try {
            showLoader()
            const { message, data } = await helperService.deleteProduct(JSON.stringify({}),`Bearer ${authState.user.token}`);
            toast(message)
            hideLoader()
        } catch (err) {
            hideLoader()
            console.log(err)
            toast(err.message || "Server not response");
        }
    }
    const productsHandler = [getProducts, addProduct, updateProduct, deleteProduct]
    return (
        <div className="container vertical-center">
            {loader}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">API</th>
                        <th scope="col">Method</th>
                        <th scope="col">Handler</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        apis.map(api => <tr key={api.id}>
                            <td >{api.api}</td>
                            <td>{api.method}</td>
                            <td><button className="btn btn-info" onClick={productsHandler[api.id - 1]}>click here</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductsComponent