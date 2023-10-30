const ChartSvg = props => (
  <svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    fontSize={66}
    {...props}
  >
    <path
      d="M3.576 5.286A7.503 7.503 0 0 0 9.56 17.31c4.14 0 7.5-3.36 7.5-7.5 0-4.14-3.36-7.5-7.5-7.5"
      stroke="#434343"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.31 9.809a5.246 5.246 0 0 0 5.25 5.25 5.246 5.246 0 0 0 5.25-5.25 5.246 5.246 0 0 0-5.25-5.25"
      stroke="#434343"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.56 12.809a3 3 0 1 0 0-6"
      stroke="#434343"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BriefCase = props => (
  <svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.561 16.887h6c3.015 0 3.555-1.208 3.713-2.678l.562-6c.203-1.83-.322-3.322-3.525-3.322h-7.5c-3.202 0-3.727 1.492-3.525 3.322l.563 6c.157 1.47.697 2.678 3.712 2.678ZM6.56 4.887v-.6c0-1.328 0-2.4 2.4-2.4h1.2c2.4 0 2.4 1.072 2.4 2.4v.6"
      stroke="#434343"
      strokeWidth={1.2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.06 10.137v.765c0 .817-.007 1.485-1.5 1.485-1.484 0-1.5-.66-1.5-1.478v-.772c0-.75 0-.75.75-.75h1.5c.75 0 .75 0 .75.75ZM16.798 8.637a12.363 12.363 0 0 1-5.737 2.265M2.525 8.84a12.212 12.212 0 0 0 5.535 2.07"
      stroke="#434343"
      strokeWidth={1.2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const About = props => (
  <svg
    width={18}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m7.678 2.678-4.264 2.62c-1.367.84-1.367 2.72 0 3.56l4.264 2.62c.765.474 2.026.474 2.791 0l4.243-2.62c1.36-.84 1.36-2.713 0-3.553l-4.243-2.62c-.765-.48-2.026-.48-2.79-.007Z"
      stroke="#434343"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m4.548 9.707-.007 3.127c0 .846.694 1.753 1.544 2.02l2.26.706c.39.12 1.034.12 1.43 0l2.26-.706c.85-.267 1.544-1.174 1.544-2.02V9.74M15.72 10.988v-4"
      stroke="#434343"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Book = props => (
  <svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.186 13.973v-8.25c0-3 .75-3.75 3.75-3.75h5.25c3 0 3.75.75 3.75 3.75v7.5c0 .105 0 .21-.008.315"
      stroke="#434343"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.323 11.723h10.612v2.625a2.628 2.628 0 0 1-2.625 2.625h-7.5a2.628 2.628 0 0 1-2.624-2.625v-.488c0-1.177.96-2.137 2.137-2.137ZM6.56 5.723h6M6.56 8.348h3.75"
      stroke="#434343"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export { ChartSvg, BriefCase, About, Book };
