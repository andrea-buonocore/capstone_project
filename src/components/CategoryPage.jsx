import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Product from "./Product";

const CategoryPage = () => {

    const CATEGORIES_URL = 'https://fakestoreapi.com/products/category/';
    const params = useParams();
    console.log('params', params);
    const categoryParam = params.category.replace(' ','');
    
    const [products, setProducts] = useState([]);

    const getCategoryProducts = async () => {
        try{
            let res = await fetch(CATEGORIES_URL + params.category);
            if(res.ok){
                let data = await res.json();
                console.log(data);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getCategoryProducts();
    },[])

    return (
        <Container>
            <Row xs={1} md={3}>
                {
                    products && (
                        products.map((product, index) => {
                            <Product key={index}/>
                        })
                    )
                }
            </Row>
        </Container>
    )
}

export default CategoryPage;