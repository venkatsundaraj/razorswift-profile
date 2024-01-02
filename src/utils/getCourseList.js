import axios, { AxiosError } from 'axios';

export const getCourseList = async function () {
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

    console.log(data);
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

export const getSelectedCourse = async function (courseId) {
  try {
    const { courses } = await getCourseList();

    const filteredCourse = courses.find(
      item => String(item.id) === String(courseId)
    );

    if (filteredCourse) return filteredCourse;
  } catch (err) {
    if (err instanceof AxiosError) {
      err.message = 'Something Went Wrong';
    }
    console.log(err);
  }
};
