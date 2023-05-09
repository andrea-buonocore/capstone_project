import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";

const ProductDetails = () => {

    const PRODUCT_URL = 'https://fakestoreapi.com/products/';

    const params = useParams();

    const [product, setProduct] = useState(null);

    const getProductDetail = async () => {
        try {
            let res = await fetch(PRODUCT_URL + params.id);
            if (res.ok) {
                let data = await res.json();
                setProduct(data);
            }
            else return new Error(res.statusText);
        }
        catch (err) { console.log(err); }


    }

    useEffect(() => {
        getProductDetail();
    }, [])

    return (
        <Container className="details_container">
            {
                product && (
                    <Row>
                        <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
                            <img src={product.image} alt={product.title} height={300} className="object-fit-contain" />
                        </Col>
                        <Col xs={12} md={8} className="p-3">
                            <span className="d-block">{product.rating.rate}/5</span>
                            <span className="d-block fw-bold fs-5">{product.title}</span>
                            <span className="d-block my-3">{product.description}</span>
                            <span className="d-block">$ {product.price}</span>
                            <div className="text-end">
                                <button className="my-3 btn_atc">Add To Cart</button>
                            </div>
                        </Col>
                    </Row>
                )
            }
        </Container>
    )
}

export default ProductDetails;