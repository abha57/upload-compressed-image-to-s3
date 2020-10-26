// import axios from 'axiosInternal';
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const options = {
        headers: {
            // 'Content-Type': 'multipart/form-data'
        }
    };
//   return axios.post('/uploadImage', formData, ...options);  
return fetch('http://localhost:8080/uploadImage', {
  method: 'POST',
  body: formData,
  ...options
})


};