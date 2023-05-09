import { Col } from "react-bootstrap";

const Product = ({ product }) => {
    return (

        <Col className="my-3 position-relative product_card">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, perspiciatis inventore quas accusamus reiciendis praesentium nulla distinctio, labore nobis aut modi voluptates quo a asperiores consequuntur, illo harum numquam suscipit.
            <div className="d-flex align-items-center justify-content-center position-absolute favorite">
                <span className="material-symbols-outlined">
                    favorite
                </span>
            </div>
            {/* <img src={product.image} alt={product.title} /> */}
        </Col>

    )
}

export default Product;