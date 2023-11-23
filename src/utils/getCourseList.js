import axios, { AxiosError } from 'axios';

export const getCourseList = async function () {
  console.log(process.env.NEXT_PUBLIC_COURSE_LIST_KEY);
  try {
    const { data } = await axios.post(
      'https://asia-south1-razorswift.cloudfunctions.net/retrieveCourseList',
      {
        isprod: true,
      },
      {
        headers: {
          'x-rs-key': process.env.NEXT_PUBLIC_COURSE_LIST_KEY,
        },
      }
    );

    console.log(data.courses);

    if (!data || !data.courses) {
      throw new Error(`can't fetch the data right now`);
    }

    if (data.courses.length > 1) return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      err.message = 'Something Went Wrong';
    }
    console.log(err);
  }
};
