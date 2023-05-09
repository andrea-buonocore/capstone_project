import { Col } from "react-bootstrap";

const Product = ({ product }) => {
    return (

        <Col className="my-3 product_container">
            <div className="d-flex align-items-center justify-content-center position-relative product_img_container">
                <div className="d-flex align-items-center justify-content-center position-absolute favorite end-0 top-0">
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                </div>
                <img src={product.image} alt={product.title}/>
            </div>
        </Col>

    )
}

export default Product;
