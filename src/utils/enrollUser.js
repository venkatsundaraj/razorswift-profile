import axios, { AxiosError } from 'axios';

export const submitEnrollUserData = async function (userData) {
  try {
    const { data } = await axios.post(
      'https://asia-south1-razorswift.cloudfunctions.net/enrollCourse',
      { ...userData },
      {
        headers: {
          'x-rs-key': process.env.NEXT_PUBLIC_COURSE_LIST_KEY,
        },
      }
    );
    console.log(data);

    if (!data.status) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const message =
        (err.response && err.response.data) || err.message || err.toString();

      throw new Error(message);
    }
  }
};
