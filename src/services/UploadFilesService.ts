// import http from './http-common';

// class UploadFilesService {
//   upload(file, onUploadProgress) {
//     let formData = new FormData();

//     formData.append("file", file);
//     const url = 'http://192.168.1.101:5000/vendorcreateitem/create-item-main/aa0661e5a39142eba24aac259178b932'
//     return http.post(url, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       },
//       onUploadProgress
//     });
//   }

//   getFiles() {
//     return http.get("/files");
//   }
// }

// export default new UploadFilesService();