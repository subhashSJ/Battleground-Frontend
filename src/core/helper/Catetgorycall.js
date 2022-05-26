import axios from "axios";

//Get all battles available
export const getAllCategories = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("categories/getCategories?languageName=CSS", config);

    return res
  } catch (err) {
    console.log(err);
  }
};
