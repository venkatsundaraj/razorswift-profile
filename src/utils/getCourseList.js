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

export const geneateUrls = function (text) {
  return text
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .filter(item => Boolean(item))
    .join('-')
    .toLowerCase();
};

export const capitalizeFirstletter = function (text) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

export const getSelectedCourse = async function (courseId) {
  try {
    const { courses } = await getCourseList();

    const filteredCourse = courses.find(
      item => geneateUrls(item.name) === String(courseId)
    );

    if (filteredCourse) return filteredCourse;
  } catch (err) {
    if (err instanceof AxiosError) {
      err.message = 'Something Went Wrong';
    }
    console.log(err);
  }
};

export const getSelectedCourseData = async function () {
  try {
    const { data } = await axios.post(
      'https://asia-south1-razorswift.cloudfunctions.net/coursePageStaticDataNew',
      {
        isprod: true,
      },
      {
        headers: {
          'x-rs-key': process.env.NEXT_PUBLIC_COURSE_LIST_KEY,
        },
      }
    );

    if (!data) {
      throw new Error(`can't fetch the data right now`);
    }

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      err.message = 'Something Went Wrong';
    }
    console.log(err);
  }
};

export const getSelectedCourseDataNew = async function () {
  try {
    const { data } = await axios.post(
      'https://asia-south1-razorswift.cloudfunctions.net/coursePageStaticDataNew',
      {
        isprod: true,
        is_html: true,
      },
      {
        headers: {
          'x-rs-key': process.env.NEXT_PUBLIC_COURSE_LIST_KEY,
        },
      }
    );

    if (!data) {
      throw new Error(`can't fetch the data right now`);
    }

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      err.message = 'Something Went Wrong';
    }
    console.log(err);
  }
};

export const getInputLabel = async function () {
  try {
    const { data } = await axios.post(
      'https://asia-south1-razorswift.cloudfunctions.net/text_label',
      {
        isprod: true,
      },
      {
        headers: {
          'x-rs-key': process.env.NEXT_PUBLIC_COURSE_LIST_KEY,
        },
      }
    );

    if (!data) {
      throw new Error(`can't fetch the data right now`);
    }

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      err.message = 'Something Went Wrong';
    }
    console.log(err);
  }
};
