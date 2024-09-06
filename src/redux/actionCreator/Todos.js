import { Alert } from "react-native";

import {
    BASE_URL, GET,
    TODOS
} from "../../constants/Api";
import { MakeApiRequest } from "../api/apiCall";
import { print } from "../../utils";
import { setToDoAPIListData } from "../reducers/ToDOAPISlice";


export const receiveToDoListData = () => async (dispatch) => {
    try {
        let data = await MakeApiRequest({ apiUrl: BASE_URL + TODOS, apiMethod: GET });
        if (data?.data != undefined && data?.data?.length != undefined && data?.data?.length > 0) {
            await dispatch(setToDoAPIListData(data?.data))
        } else if (data?.data?.statusCode != undefined && data?.data?.statusCode != 200) {
            print("receiveToDoListData :> ", JSON.stringify(data?.data?.message), 0);
            Alert.alert("Alert", data?.data?.message)
            return data?.data;
        }
    } catch (error) {
        print("receiveToDoListData catch Error: ", error, 0);
    }
}