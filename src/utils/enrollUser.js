import axios, { AxiosError } from 'axios';

export const enrollUser = async function (userData) {
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
      throw new Error(`Something went Wrong, Please try after some time`);
    }

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      err.message = 'Something Went Wrong';
    }
    console.log(err);
  }
};
