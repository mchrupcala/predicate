export const getTask = async () => {
  const url = process.env.NEXT_APP_API_URL;
  console.log(url);

  try {
    // const res = await fetch(url);
    // console.log(res);
    return {
      taskID: "123456789",
      STATUS: "SUCCESS",
    };
  } catch (error) {
    console.warn("Something went wrong: ", error);
  }
};
