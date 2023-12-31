import axios from "axios";

export const uploadFile = async (data: any, headers: any) => {
  return await axios
    .post(`upload-file`, data, {
      headers: headers,
    })
    .then(async (res) => {
      return res.data;
    });
};

export const removeFile = async (data: any) => {
  return await axios.post(`remove-file`, data).then(async (res) => {
    return res.data;
  });
};
