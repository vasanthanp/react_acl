import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProductsComponent = () => {
    const [authState] = useContext(AuthContext);

    return (
        <div class="container">
        <div class="vertical-center">
            <div class="card px-3 text-success">
                <h3>Products</h3>
            </div>
        </div>
    </div>
    )
}

export default ProductsComponent