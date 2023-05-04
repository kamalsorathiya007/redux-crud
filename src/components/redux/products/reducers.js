import {
  REQUEST,
  SUCCESS,
  ERROR,
  PRODUCT_ADD,
  PRODUCT_EDIT,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
} from './types';

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: '',
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case PRODUCT_DELETE:
      return {
        ...state,
        loading: false,
      };
    case PRODUCT_ADD:
      return {
        ...state,
        loading: false,
      };
    case PRODUCT_EDIT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case PRODUCT_UPDATE:
      return {
        ...state,
        loading: false,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
