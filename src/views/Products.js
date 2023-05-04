import React, { useEffect, useState } from 'react';
import { Input, Table, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import {
  getProducts,
  productAdd,
  productEdit,
  productUpdate,
  productDelete,
} from '../components/redux/products/actions';

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((sdata) => sdata.data);
  const { product } = useSelector((sdata) => sdata.data);
  const allProducts = products.data;
  const details = product.data;
  const [detail, setDetail] = useState({
    category: '',
    productName: '',
    price: '',
    clothSize: [],
    inStock: '',
    description: '',
  });

  const getValues = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };
  const onEdit = (id) => {
    dispatch(productEdit(id));
    console.log(id);
  };

  const onDelete = (id) => {
    dispatch(productDelete(id));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (detail.hasOwnProperty('_id')) {
      detail.id = details._id;
      dispatch(productUpdate(detail));
    } else {
      if (detail.length !== 0) {
        dispatch(productAdd(detail));
      } else {
        return;
      }
    }
    reset();
  };

  useEffect(() => {
    if (details) {
      setDetail(details);
    }
  }, [details]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const reset = () => {
    setDetail({
      category: '',
      productName: '',
      price: '',
      clothSize: [],
      inStock: '',
      description: '',
    });
  };
  console.log(detail);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col className="d-flex justify-content-between align-items-center">
                      <Card.Title as="h4">PRODUCTS RECORDS</Card.Title>
                      <div className="d-flex justify-content-between">
                        <Button className="mx-1" type="submit">
                          {detail.hasOwnProperty('_id')
                            ? 'Update'
                            : 'Add New Product'}
                        </Button>
                        <Button onClick={reset} variant="secondary">
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Input
                        type="text"
                        name="category"
                        value={detail?.category}
                        onChange={getValues}
                        placeholder="Category"
                      />
                      <Input
                        className="mt-2"
                        type="text"
                        name="productName"
                        value={detail?.productName}
                        onChange={getValues}
                        placeholder="Product Name"
                      />
                      <Input
                        className="mt-2"
                        type="text"
                        name="price"
                        value={detail?.price}
                        onChange={getValues}
                        placeholder="Price"
                      />
                    </Col>
                    <Col md={6}>
                      <Col className="d-flex justify-content-between">
                        <Label>Size</Label>
                        <Label check>
                          <Input
                            type="radio"
                            name="clothSize"
                            value="S"
                            checked={detail.clothSize.includes('S')}
                            onChange={getValues}
                          />{' '}
                          S
                        </Label>

                        <Label check>
                          <Input
                            type="radio"
                            name="clothSize"
                            value="M"
                            checked={detail.clothSize.includes('M')}
                            onChange={getValues}
                          />{' '}
                          M
                        </Label>

                        <Label check>
                          <Input
                            type="radio"
                            name="clothSize"
                            value="L"
                            checked={detail.clothSize.includes('L')}
                            onChange={getValues}
                          />{' '}
                          L
                        </Label>

                        <Label check>
                          <Input
                            type="radio"
                            name="clothSize"
                            value="XL"
                            checked={detail.clothSize.includes('XL')}
                            onChange={getValues}
                          />{' '}
                          XL
                        </Label>

                        <Label check>
                          <Input
                            type="radio"
                            name="clothSize"
                            value="XXL"
                            checked={detail.clothSize.includes('XXL')}
                            onChange={getValues}
                          />{' '}
                          XXL
                        </Label>
                      </Col>
                      <Input
                        className="mt-2"
                        type="text"
                        name="inStock"
                        value={detail?.inStock}
                        onChange={getValues}
                        placeholder="In Stock"
                      />
                      <Input
                        className="mt-2"
                        type="text"
                        name="description"
                        value={detail?.description}
                        onChange={getValues}
                        placeholder="Description"
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Header>
              <Card.Body>
                <Table hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>CATEGORY</th>
                      <th>PRODUCT NAME</th>
                      <th>PRICE</th>
                      <th>SIZE</th>
                      <th>IN STOCK</th>
                      <th>DESCRIPTION</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts?.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{value.category}</td>
                          <td>{value.productName}</td>
                          <td>{value.price}</td>
                          <td>{value.clothSize}</td>
                          <td>{value.inStock}</td>
                          <td>{value.description}</td>
                          <td>
                            <div style={{ width: '155px' }}>
                              <Button
                                onClick={() => onEdit(value._id)}
                                variant="success"
                              >
                                Edit
                              </Button>{' '}
                              <Button
                                onClick={() => onDelete(value._id)}
                                variant="danger"
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Products;
