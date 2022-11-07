import { getData } from "@/request/Request.js";

export const getRoles = async function () {
  let roles = [];
  await getData("roles")
    .then(res => {
        roles = res
    })
    .catch(error => {
      console.log(error);
    })

    return roles;
};

export const getTiposDocumento = async function () {
    let docs = [];
    await getData("docs")
      .then(res => {
          docs = res
      })
      .catch(error => {
        console.log(error);
      })
  
      return docs;
  };
