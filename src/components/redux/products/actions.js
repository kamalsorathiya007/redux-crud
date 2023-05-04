import axios from 'axios';
import {
  REQUEST,
  SUCCESS,
  ERROR,
  PRODUCT_ADD,
  PRODUCT_EDIT,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
} from './types';

export const getRequest = () => {
  return {
    type: REQUEST,
  };
};

export const getSuccess = (products) => {
  return {
    type: SUCCESS,
    payload: products,
  };
};

export const getError = (error) => {
  return {
    type: ERROR,
    payload: error,
  };
};
// Actions with Data
export const addProduct = () => {
  return {
    type: PRODUCT_ADD,
  };
};
export const deleteProduct = () => {
  return {
    type: PRODUCT_DELETE,
  };
};
export const editProduct = (product) => {
  return {
    type: PRODUCT_EDIT,
    payload: product,
  };
};
export const updateProduct = () => {
  return {
    type: PRODUCT_UPDATE,
  };
};
// DONE
export const getProducts = () => {
  return (dispatch) => {
    dispatch(getRequest());
    axios
      .get('https://student-api.mycodelibraries.com/api/product/get')
      .then((res) => {
        dispatch(getSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getError(err.message));
      });
  };
};
// DONE
export const productDelete = (id) => {
  return (dispatch) => {
    dispatch(getRequest());
    axios
      .delete(
        `https://student-api.mycodelibraries.com/api/product/delete?id=${id}`
      )
      .then((res) => {
        dispatch(deleteProduct());
        dispatch(getProducts());
      })
      .catch((err) => {
        dispatch(getError(err.message));
      });
  };
};

export const productAdd = (products) => {
  return (dispatch) => {
    dispatch(getRequest());
    console.log('add working...');
    axios
      .post('https://student-api.mycodelibraries.com/api/product/add', products)
      .then((res) => {
        dispatch(addProduct());
        dispatch(getProducts());
      })
      .catch((err) => {
        dispatch(getError(err.message));
      });
  };
};

export const productEdit = (id) => {
  return (dispatch) => {
    dispatch(getRequest());
    axios
      .get(
        `https://student-api.mycodelibraries.com/api/product/get-product-by-id?id=${id}`
      )
      .then((res) => {
        dispatch(editProduct(res.data));
      })
      .catch((err) => {
        dispatch(getError(err.message));
      });
  };
};

export const productUpdate = (product) => {
  return (dispatch) => {
    dispatch(getRequest());
    axios
      .post(
        'https://student-api.mycodelibraries.com/api/product/update',
        product
      )
      .then((res) => {
        dispatch(updateProduct());
        dispatch(getProducts());
      })
      .catch((err) => {
        dispatch(getError(err.message));
      });
  };
};
