export const RESET_LIST = "RESET_LIST";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";
export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";

export const addItemRequest = (item) => {
    return {
        type: ADD_ITEM_REQUEST,
        item
    }
};

export const addItemSuccess = (item) => {
    return {
        type: ADD_ITEM_SUCCESS,
        item
    }
};

export const addItemFailure = (error) => {
    return {
        type: ADD_ITEM_FAILURE,
        error
    }
};

export const resetList = () => {
    return {
        type: RESET_LIST
    }
}