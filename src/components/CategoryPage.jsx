import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Product from "./Product";

const CategoryPage = () => {

    const CATEGORIES_URL = 'https://fakestoreapi.com/products/category/';
    const params = useParams();

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
        <Container className="category_container">
            <Row xs={2} md={3}>
                {
                    products && (
                        products.map((product, index) => (
                            <Product key={index} product={product} />
                        ))
                    )
                }
            </Row>
        </Container>
    )
}

export default CategoryPage;