import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Product from "./Product";

const CategoryPage = () => {

    const CATEGORIES_URL = 'https://fakestoreapi.com/products/category/';
    const params = useParams();
    console.log('params', params);
    const categoryParam = params.category.replace(' ', '');

    const [products, setProducts] = useState([]);

    const getCategoryProducts = async () => {
        try {
            let res = await fetch(CATEGORIES_URL + params.category);
            if (res.ok) {
                let data = await res.json();
                setProducts(data);
            }
            else return new Error(res.statusText);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCategoryProducts();
    }, [])

    return (
        <div className="py-5 slider position relative border border-1">

            <div className="position-absolute top-0">
                <span class="material-symbols-outlined">
                    arrow_back
                </span>
            </div>

            {
                products && (
                    products.map((product, index) => (
                        <Product key={index} product={product} />
                    ))
                )
            }

            <div className="position-absolute">
                <span class="material-symbols-outlined">
                    arrow_back
                </span>
            </div>

        </div>
    )
}

export default CategoryPage;