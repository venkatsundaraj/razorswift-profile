import ProfileCard from '@/cardComponents/ProfileCard';
import ProfileLayout from '@/layouts/ProfileLayout';
import Navbar from '@/navigationComponents/Navbar';
import ProfileBackground from '@/pageComponents/Profile/Common/ProfileBackground';
import RightBar from '@/pageComponents/Profile/RightBar';

import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { Box, Container, Stack } from '@mui/material';
import { useCallback, useContext, useEffect, useState } from 'react';

import usePathways from '@/customHooks/CutsomApiHooks/usePathways';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
// import OuterLayout from '@/pageComponents/PathWay/Common/OuterLayout';
// import SkillData from '@/pageComponents/PathWay/Explore/SkillData';
import OuterLayout2 from '@/pageComponents/PathWay/Common/OuterLayout2';
import { DataProvider } from '@/reUsableComponents/DataContext/DataContext';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { callApi } from '@/utils/apirequest';
import { createContext } from 'react';

export const ExploreContext = createContext({});
const commonStyle = {
  height: '100px',
  width: '100%',
  backgroundColor: 'white',
};

const Explore = () => {
  // const [exploreData, setExploreData] = useState({
  //   num_of_pathways: 4,
  //   pathways: [
  //     {
  //       id: 2234,
  //       type: 1,
  //       data: {
  //         company_name: 'VCNR',
  //         name: 'Junior Java developer',
  //       },
  //       status: 'enrolled',
  //       fitment: 40,
  //       sequencedata: {
  //         id: 1234,
  //         num_of_steps: 4,
  //         data: [
  //           {
  //             name: 'Create Profile',
  //             type: 0,
  //             status: 1,
  //             info: 'Create a profile ',
  //             data: {
  //               id: 100,
  //             },
  //           },
  //           {
  //             name: 'Java Self Assessment',
  //             type: 1,
  //             info: 'Take a java self assessment driven by xobin, get a score of >65% to pass this step ',
  //             status: 1,
  //             data: {
  //               skill_platform_id: 123344,
  //               skillname: 'Java',
  //               result: 77,
  //             },
  //           },
  //           {
  //             name: 'get 3 vouches',
  //             type: 3,
  //             info: ' Get 3 people from your network to vouch for you',
  //             status: 0,
  //             data: {
  //               code: 'ahsdsjshf234',
  //             },
  //           },
  //           {
  //             name: 'Basic screening',
  //             type: 4,
  //             info: ' Answer scenario questions',
  //             status: 0,
  //             data: {
  //               code: 'ahsdsjshf234',
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       id: 1235,
  //       type: 1,
  //       data: {
  //         company_name: 'Altemetrix',
  //         name: 'Full Stack developer',
  //       },
  //       status: 'enrolled',
  //       fitment: 80,
  //       sequencedata: {
  //         id: 1234,
  //         num_of_steps: 4,
  //         data: [
  //           {
  //             name: 'Create Profile',
  //             type: 0,
  //             status: 1,
  //             info: 'Create a profile ',
  //             data: {
  //               id: 100,
  //             },
  //           },
  //           {
  //             name: 'Javascript Self Assessment',
  //             type: 1,
  //             info: 'Take a java self assessment driven by xobin, get a score of >65% to pass this step ',
  //             status: 1,
  //             data: {
  //               skill_platform_id: 123344,
  //               skillname: 'Javascript',
  //               result: 77,
  //             },
  //           },
  //           {
  //             name: 'get 3 vouches',
  //             type: 3,
  //             info: ' Get 3 people from your network to vouch for you',
  //             status: 0,
  //             data: {
  //               code: 'ahsdsjshf234',
  //             },
  //           },
  //           {
  //             name: 'Basic screening',
  //             type: 4,
  //             info: ' Answer scenario questions',
  //             status: 0,
  //             data: {
  //               code: 'ahsdsjshf234',
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // });
  // const [skillData, setSkillData] = useState({
  //   num_of_pathways: 4,
  //   pathways: [
  //     {
  //       id: 2234,
  //       type: 1,
  //       data: {
  //         skillName: 'Java Beginner',
  //       },
  //       status: 'enrolled',
  //       sequencedata: {
  //         id: 1234,
  //         num_of_steps: 4,
  //         data: [
  //           {
  //             name: 'Upgrade',
  //             type: 0,
  //             status: 1,
  //             info: 'Upgrade',
  //             data: {
  //               id: 100,
  //             },
  //           },
  //           {
  //             name: 'Self Assessment',
  //             type: 1,
  //             info: 'Take a self assessment driven by xobin, get a score of >65% to pass this step ',
  //             status: 1,
  //             data: {
  //               skill_platform_id: 123344,
  //               skillname: 'Java',
  //               result: 77,
  //             },
  //           },
  //           {
  //             name: 'Self certified',
  //             type: 3,
  //             info: ' Get Self certified',
  //             status: 0,
  //             data: {
  //               code: 'ahsdsjshf234',
  //             },
  //           },
  //           {
  //             name: 'Interview',
  //             type: 4,
  //             info: 'Clear the interview',
  //             status: 0,
  //             data: {
  //               code: 'ahsdsjshf234',
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       id: 1235,
  //       type: 1,
  //       data: {
  //         skillName: 'Python Expert',
  //       },
  //       status: 'enrolled',
  //       fitment: 80,
  //       sequencedata: {
  //         id: 1234,
  //         num_of_steps: 4,
  //         data: [
  //           {
  //             name: 'Upgrade',
  //             type: 0,
  //             status: 1,
  //             info: 'Upgrade',
  //             data: {
  //               id: 100,
  //             },
  //           },
  //           {
  //             name: 'Self Assessment',
  //             type: 1,
  //             info: 'Take a self assessment driven by xobin, get a score of >65% to pass this step ',
  //             status: 1,
  //             data: {
  //               skill_platform_id: 123344,
  //               skillname: 'Python',
  //               result: 77,
  //             },
  //           },
  //           {
  //             name: 'Self certified',
  //             type: 3,
  //             info: ' Get Self certified',
  //             status: 0,
  //             data: {
  //               code: 'ahsdsjshf234',
  //             },
  //           },
  //           {
  //             name: 'Interview',
  //             type: 4,
  //             info: 'Clear the interview',
  //             status: 0,
  //             data: {
  //               code: 'ahsdsjshf234',
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // });

  const [exploreData, setExploreData] = useState({});
  const [skillData, setSkillData] = useState({});
  // const [titleNames, setTitleNames] = useState({
  //   enrolledPathWay: 'Enrolled Pathways',
  //   explorePathways: 'Explore Pathways',
  //   jobDescriptionPathways: 'Jobs Pathways',
  //   skillPathways: 'Skill Pathways',
  // });
  const { loading, setLoading } = useContext(LoadingContext);

  const { titleNames, setTitleNames } = usePathways();

  const GetEnrolledPathwayDetailsBasedOnJDandSkills = useCallback(
    async type => {
      setLoading(true);
      const data = { type };
      try {
        const response = await callApi(
          'GetEnrolledPathwayDetailsBasedOnJDandSkills',
          data
        );
        setLoading(false);

        if (response.status === 200) {
          if (type === 1) {
            setExploreData(response.data);
          } else if (type === 2) {
            setSkillData(response.data);
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
    [setLoading]
  );

  const [pathwayDetails, setPathwayDetails] = useState({
    mainTitle: 'Explore Pathway',
    title: 'Job Description Pathways',
    pathway_details: [
      {
        id: 1,
        status: 1,
        status_label: '1',
        type: 'Jobs',
        end_state: 1,
        end_state_name: 'INTERNAL_ATS',
        client_id: 1,
        client_name: 'VCNR Technologies Pvt Ltd',
        jd_id: 15,
        job_title: 'Senior Fullstack Engineer',
        jd_slug: 'https://www.razorswift.net/jobs/RS%2FJD%2F00015/',
        paid: false,
        name: 'Pathway for Senior Fullstack Engineer',
        description: 'abcd',
        steps_data: [
          {
            step_state: 2,
            step_state_label: 'Completeed step',
            step_id: 1,
            step_type: 'create_profile',
            step_data: {
              short_text: 'Create your AI generated profile',
              'long text html':
                '<p>Create your profile</p><ul><li>data centric profile</li><li>Own your own data</li></ul>',
              step_delivery: {
                type: 2,
                link: 'candiadte slug',
                label: 'slug view',
              },
            },
          },
          {
            step_state: 1,
            step_state_label: 'Current step',
            step_id: 2,
            step_type: 'validate_profile',
            step_data: {
              short_text: 'Create your AI generated profile',
              'long text html':
                '<p>Create your profile</p><ul><li>data centric profile</li><li>Own your own data</li></ul>',
              step_delivery: {
                status: 1,
                is_required: true,
                type: 4,
                statement: 'Are you sure have you created the profile?',
                button_text: 'Verify',
                action_endpoint: '/api/validate_profile',
                parameters: ['candidate_id', 'pathway_id', 'step_id'],
                info: 'Please verify your profile to continue.',
              },
            },
          },
          {
            step_state: 3,
            step_state_label: 'Next State',
            step_id: 3,
            step_type: 'self_assessment',
            step_data: {
              short_text: 'Self Assemnt to be completed',
              'long text html':
                '<p>Clear your Assemente</p><ul><li>Clear your assemnt</li><li>Get your clearnce from this step</li></ul>',
              master_skill_platform_id: 1,
              skill_name: 'Python',
              skill_level: 1,
              pass_per: 65,
              assessment_id: 21,
              step_delivery: {
                is_required: true,
                type: 4,
                statement: 'Are you sure have you written the test?',
                button_text: 'Validate',
                action_endpoint: '/api/validate_profile',
                parameters: ['candidate_id', 'pathway_id', 'step_id'],
                info: 'I have completed my self assessment.',
              },
            },
          },
          {
            step_state: 3,
            step_state_label: 'Next State',
            step_id: 4,
            step_type: 'endorsement',
            step_data: {
              short_text:
                'Get Endorsements from 4 of your peers, managers or colleagues. Use the URL below and send it to people who will endorse you.',
              'long text html':
                '<p>Endoresements</p><ul><li>Endorsements are over whatsapp</li><li>Share this url with your friends, make sure u add a message so they know the context</li><li>A whatsApp Bot will guide them.</li></ul>',
              step_delivery: {
                statement: 'Share your endosment here',
                is_required: true,
                type: 1,
                action_endpoint: 'https://xxxxxxxx',
                info: 'Self Endrosment Link',
              },
            },
          },
          {
            step_state: 3,
            step_state_label: 'Next State',
            step_id: 5,
            step_type: 'scenario_questions',
            step_data: {
              short_text: 'Create your AI generated profile',
              'long text html':
                '<p>Create your profile</p><ul><li>data centric profile</li><li>Own your own data</li></ul>',
              step_delivery: {
                is_required: true,
                type: 3,
                questions_data: [
                  {
                    question_id: 1,
                    is_required: true,
                    question_text:
                      'Have you any information question in your profile?',
                    user_input: "User's answer for question 1",
                  },
                  {
                    question_id: 2,
                    is_required: true,
                    question_text:
                      'List any certifications or courses relevant to this job role.',
                    user_input: "User's answer for question 2",
                  },
                  {
                    question_id: 3,
                    is_required: true,
                    question_text:
                      'Describe a challenging project you worked on and how you overcame obstacles.',
                    user_input: "User's answer for question 3",
                  },
                  {
                    question_id: 4,
                    is_required: true,
                    question_text:
                      'Do you have experience collaborating in cross-functional teams?',
                    user_input: "User's answer for question 4",
                  },
                  {
                    question_id: 5,
                    is_required: false,
                    question_text:
                      'Mention any technical tools or platforms you are proficient in.',
                    user_input: "User's answer for question 5",
                  },
                ],
                statement: 'Please answer the following questions.',
                button_text: 'Submit',
                action_endpoint: '/api/submit_answer',
                parameters: {
                  candidate_id: 'specific_candidate_id_value',
                  pathway_id: 'specific_pathway_id_value',
                  step_id: 'specific_step_id_value',
                  answers: [
                    {
                      question_id: 1,
                      answer: "User's answer for question 1",
                    },
                    {
                      question_id: 2,
                      answer: "User's answer for question 2",
                    },
                    {
                      question_id: 3,
                      answer: "User's answer for question 3",
                    },
                    {
                      question_id: 4,
                      answer: "User's answer for question 4",
                    },
                    {
                      question_id: 5,
                      answer: "User's answer for question 5",
                    },
                  ],
                },
                info: 'Provide answers to the questions to proceed.',
              },
            },
          },
        ],
      },
      {
        id: 2,
        status: 1,
        status_label: '1',
        type: 'Jobs',
        end_state: 1,
        end_state_name: 'INTERNAL_ATS',
        client_id: 1,
        client_name: 'VCNR Technologies Pvt Ltd',
        jd_id: 15,
        job_title: 'Senior Fullstack Engineer',
        jd_slug: 'https://www.razorswift.net/jobs/RS%2FJD%2F00015/',
        paid: false,
        name: 'Pathway for Senior Fullstack Engineer',
        description: 'abcd',
        steps_data: [
          {
            step_state: 2,
            step_state_label: 'Completeed step',
            step_id: 1,
            step_type: 'create_profile',
            step_data: {
              short_text: 'Create your AI generated profile',
              'long text html':
                '<p>Create your profile</p><ul><li>data centric profile</li><li>Own your own data</li></ul>',
              step_delivery: {
                type: 2,
                link: 'candiadte slug',
                label: 'slug view',
              },
            },
          },
          {
            step_state: 1,
            step_state_label: 'Current step',
            step_id: 2,
            step_type: 'validate_profile',
            step_data: {
              short_text: 'Create your AI generated profile',
              'long text html':
                '<p>Create your profile</p><ul><li>data centric profile</li><li>Own your own data</li></ul>',
              step_delivery: {
                status: 1,
                is_required: true,
                type: 4,
                statement: 'Are you sure have you created the profile?',
                button_text: 'Verify',
                action_endpoint: '/api/validate_profile',
                parameters: ['candidate_id', 'pathway_id', 'step_id'],
                info: 'Please verify your profile to continue.',
              },
            },
          },
          {
            step_state: 3,
            step_state_label: 'Next State',
            step_id: 3,
            step_type: 'self_assessment',
            step_data: {
              short_text: 'Self Assemnt to be completed',
              'long text html':
                '<p>Clear your Assemente</p><ul><li>Clear your assemnt</li><li>Get your clearnce from this step</li></ul>',
              master_skill_platform_id: 1,
              skill_name: 'Python',
              skill_level: 1,
              pass_per: 65,
              assessment_id: 21,
              step_delivery: {
                is_required: true,
                type: 4,
                statement: 'Are you sure have you written the test?',
                button_text: 'Validate',
                action_endpoint: '/api/validate_profile',
                parameters: ['candidate_id', 'pathway_id', 'step_id'],
                info: 'I have completed my self assessment.',
              },
            },
          },
          {
            step_state: 3,
            step_state_label: 'Next State',
            step_id: 4,
            step_type: 'endorsement',
            step_data: {
              short_text:
                'Get Endorsements from 4 of your peers, managers or colleagues. Use the URL below and send it to people who will endorse you.',
              'long text html':
                '<p>Endoresements</p><ul><li>Endorsements are over whatsapp</li><li>Share this url with your friends, make sure u add a message so they know the context</li><li>A whatsApp Bot will guide them.</li></ul>',
              step_delivery: {
                statement: 'Share your endosment here',
                is_required: true,
                type: 1,
                action_endpoint: 'https://xxxxxxxx',
                info: 'Self Endrosment Link',
              },
            },
          },
          {
            step_state: 3,
            step_state_label: 'Next State',
            step_id: 5,
            step_type: 'scenario_questions',
            step_data: {
              short_text: 'Create your AI generated profile',
              'long text html':
                '<p>Create your profile</p><ul><li>data centric profile</li><li>Own your own data</li></ul>',
              step_delivery: {
                is_required: true,
                type: 3,
                questions_data: [
                  {
                    question_id: 1,
                    is_required: true,
                    question_text:
                      'Have you any information question in your profile?',
                    user_input: "User's answer for question 1",
                  },
                  {
                    question_id: 2,
                    is_required: true,
                    question_text:
                      'List any certifications or courses relevant to this job role.',
                    user_input: "User's answer for question 2",
                  },
                  {
                    question_id: 3,
                    is_required: true,
                    question_text:
                      'Describe a challenging project you worked on and how you overcame obstacles.',
                    user_input: "User's answer for question 3",
                  },
                  {
                    question_id: 4,
                    is_required: true,
                    question_text:
                      'Do you have experience collaborating in cross-functional teams?',
                    user_input: "User's answer for question 4",
                  },
                  {
                    question_id: 5,
                    is_required: false,
                    question_text:
                      'Mention any technical tools or platforms you are proficient in.',
                    user_input: "User's answer for question 5",
                  },
                ],
                statement: 'Please answer the following questions.',
                button_text: 'Submit',
                action_endpoint: '/api/submit_answer',
                parameters: {
                  candidate_id: 'specific_candidate_id_value',
                  pathway_id: 'specific_pathway_id_value',
                  step_id: 'specific_step_id_value',
                  answers: [
                    {
                      question_id: 1,
                      answer: "User's answer for question 1",
                    },
                    {
                      question_id: 2,
                      answer: "User's answer for question 2",
                    },
                    {
                      question_id: 3,
                      answer: "User's answer for question 3",
                    },
                    {
                      question_id: 4,
                      answer: "User's answer for question 4",
                    },
                    {
                      question_id: 5,
                      answer: "User's answer for question 5",
                    },
                  ],
                },
                info: 'Provide answers to the questions to proceed.',
              },
            },
          },
        ],
      },
    ],
    filter_type: 'all',
  });

  useEffect(() => {
    GetEnrolledPathwayDetailsBasedOnJDandSkills(1);
    GetEnrolledPathwayDetailsBasedOnJDandSkills(2);
  }, [GetEnrolledPathwayDetailsBasedOnJDandSkills]);

  return (
    <DataProvider>
      <Container maxWidth="xl" disableGutters>
        <Navbar />
        <ProfileLayout
          viewBar={true}
          rightComponent={
            <RightBar>
              <ProfileBackground />
              <Container>
                <ExploreContext.Provider
                  value={{
                    exploreData,
                    setExploreData,
                    skillData,
                    setSkillData,
                    titleNames,
                    setTitleNames,
                    pathwayDetails,
                    setPathwayDetails,
                  }}
                >
                  <CardSectionHeader
                    sx={{ padding: '0px', textDecoration: 'underline' }}
                  >
                    {pathwayDetails?.mainTitle}
                  </CardSectionHeader>

                  <ProfileCard
                    styleProps={{
                      ...{ commonStyle },
                      border: '0px ',
                    }}
                  >
                    <Stack spacing={2}>
                      <Box>
                        <CardSectionHeader>
                          {pathwayDetails?.title}
                        </CardSectionHeader>
                        <OuterLayout2 explore />
                      </Box>
                      {/* <Box>
                            <CardSectionHeader>
                              {titleNames?.skillPathways}
                            </CardSectionHeader>
                            <SkillData />
                          </Box> */}
                    </Stack>
                  </ProfileCard>
                </ExploreContext.Provider>
              </Container>
            </RightBar>
          }
        />
      </Container>
    </DataProvider>
  );
};

export default withAuth(Explore, 'user');
