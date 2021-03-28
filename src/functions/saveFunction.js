import axios from "axios";

const saveFormUpdates_Creation = (formToSave, url) => {
  const payload = formToSave;

  //Axios Post Request
  const PostData = async () => {
    // alert("updating form in db");
    const response = await axios.post(`${url}/update`, payload);
    console.log(response.data)
  };
  PostData();
};

export default saveFormUpdates_Creation;
