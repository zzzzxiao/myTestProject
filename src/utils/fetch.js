import axios from "axios";
import Qs from 'qs';
const ContentType = {
    JSON: 'application/json',
    FORM_URLENCODED: 'application/x-www-form-urlencoded'
};
export default function Fetch(options) {
    const { url = "", type: method = "get", data, type } = options;
    const data = type === "post" ? { data } : { params: data };
    const requestOption = {
        ...options,
        url,
        type,
        ...data
    }
    return axios({
        transformRequest: [
            function(data, headers) {
                if(options.contentType===ContentType.FORM_URLENCODED){
                    return Qs.stringify(data, { allowDots: true });
                }
                return data;
            }
        ],
        transformResponse: [
            function(data) {
                return data;
            }
        ],
        headers: {},
        paramsSerializer: function(params) {
            return Qs.stringify(params, { arrayFormat: "brackets" });
        },
        data: {},
        timeout: 1000,
        withCredentials: false, // default
        ...requestOption
    }).then(response=>{
        return Promise.resolve(response);
    }).catch(error=>{
        return Promise.reject(error);
    });
};
