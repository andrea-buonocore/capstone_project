import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Product from "./Product";
import Spinner from 'react-bootstrap/Spinner';

const CategoryPage = () => {

    const CATEGORIES_URL = 'https://fakestoreapi.com/products/category/';
    const params = useParams();

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCategoryProducts = async () => {
        try {
            let res = await fetch(CATEGORIES_URL + params.category);
            if (res.ok) {
                let data = await res.json();
                setProducts(data);
                setIsLoading(!isLoading);
            }
            else {
                return new Error(res.statusText);
                setIsLoading(!isLoading);
            }
        }
        catch (err) {
            console.log(err);
            setIsLoading(!isLoading);
        }
    }

    useEffect(() => {
        getCategoryProducts();
    }, [])

    return (
        <Container className="category_container">
            {
                isLoading && (
                    <div className="text-center my-3">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )
            }
            <Row xs={2} md={4}>
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