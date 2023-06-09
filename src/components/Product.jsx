import { Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';
const Product = ({ product }) => {
    return (

        <Col className="my-3 product_container">
            <div className="d-flex align-items-center justify-content-center position-relative product_img_container">
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} className="img-fluid" />
                </Link>
            </div>
            <div>
                <span className="d-inline-block fw-light product_price my-2">$ {product.price}</span>
                <span className="d-block">{product.title}</span>
            </div>
        </Col>

    )
}

export default Product;
