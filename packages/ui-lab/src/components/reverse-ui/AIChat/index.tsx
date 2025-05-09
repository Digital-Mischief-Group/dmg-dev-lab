import { keyframes } from '@emotion/react';
import { Box, Stack } from '@mui/system';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Typewriter from '../TypeWritter';

export interface AIChatProps {
  name?: string;
  description?: string;
}

const AIChat = (props: AIChatProps) => {
  const { name = '', description = '' } = props;
  const [state, setState] = useState(0);
  const isMobile = useIsMobile();

  const initialWidth = isMobile ? 280 : 370;
  const animateWidth = isMobile ? 340 : 560;

  const items = [
    {
      icon: <BookIcon />,
      title: 'Read Documentation',
      description:
        'Find guides, tutorials, and resources to help you get started.',
    },
    {
      icon: <DocumentIcon />,
      title: 'Explore Components',
      description: 'Browse our library of compoents to level up your projects.',
    },
    {
      icon: <ChatIcon />,
      title: 'Got an Enquiry',
      description: 'Reach out to us for quick answers and assistance',
    },
  ];

  useEffect(() => {
    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const runSequence = async () => {
      await wait(3000);
      setState(1);

      await wait(650);
      setState(2);

      await wait(2000);
      setState(3);

      await wait(1500);
      setState(4);

      await wait(2000);
      setState(5);
    };

    runSequence();

    return () => {
      // setState(0);
    };
  }, []);

  return (
    <Box
      sx={{
        width: 600,
        height: 380,
        mx: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#c2e6eb8f',
        fontSize: 14,
      }}
    >
      <Box
        component={motion.div}
        initial={{ width: initialWidth }}
        animate={{ width: state === 0 ? initialWidth : animateWidth }}
        transition={{
          type: 'spring',
          bounce: 0.3,
          ease: 'linear',
        }}
        sx={{ position: 'relative' }}
      >
        <Box
          component={motion.div}
          initial={{ y: 12, opacity: 0 }}
          animate={{ opacity: state === 0 ? 0 : 1, y: state === 0 ? 12 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
          sx={{
            background:
              'linear-gradient(180deg,rgba(240,254,255,.06) 0%,rgba(240,254,255,0) 100%),rgba(194,230,235,.02)',
            height: 12,
            position: 'absolute',
            left: 16,
            right: 16,
            top: '-12px',
            backdropFilter: 'blur(4px)',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            '&:before': {
              borderRadius: 'inherit',
              content: '""',
              position: 'absolute',
              inset: 0,
              border: '1px solid #c2e6eb14',
              borderBottomWidth: 0,
            },
          }}
        />
        <Box
          component={motion.div}
          initial={{ y: -12, opacity: 0 }}
          animate={{ opacity: state === 0 ? 0 : 1, y: state === 0 ? -12 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
          sx={{
            background:
              'linear-gradient(180deg,rgba(240,254,255,0) 0%,rgba(240,254,255,.06) 100%),rgba(194,230,235,.02)',
            height: 12,
            position: 'absolute',
            left: 16,
            right: 16,
            // top: 0,
            bottom: '-12px',
            backdropFilter: 'blur(4px)',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            '&:before': {
              borderRadius: 'inherit',
              content: '""',
              position: 'absolute',
              inset: 0,
              border: '1px solid #c2e6eb14',
              borderTopWidth: 0,
            },
          }}
        />
        <Box
          sx={{
            boxShadow:
              '0 0 24px #b9e7ec14 inset,0 -4px 12px #b9e7ec0f inset,0 1px 1px #b9e7ec1f inset',
            backgound: '#c2e6eb0a',
            backdropFilter: 'blur(2px)',
            overflow: 'hidden',
            borderRadius: '10px',
            position: 'relative',
            '&:before': {
              borderRadius: 'inherit',
              content: '""',
              position: 'absolute',
              pointerEvents: 'none',
              inset: 0,
              border: '1px solid #c2e6eb1f',
            },
          }}
        >
          <Box
            sx={{
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                ...(state > 2 && {
                  borderBottom: '1px solid #c2e6eb12',
                }),
              },
            }}
          >
            <Box sx={{ color: '#c2e6eb8f', display: 'flex' }}>
              <SearchIcon />
            </Box>
            <Box
              sx={{
                color: state <= 1 ? '#c2e6eb59' : '#c2e6ebd4',
                fontSize: 14,
                lineHeight: '20px',
                fontWeight: 300,
                flex: '1 1 0%',
              }}
            >
              {state <= 1 ? (
                'Ask about anything...'
              ) : (
                <>
                  <Typewriter text={`What is ${name}?`} speed={80} />
                  {state <= 3 && <TypingCursor />}
                </>
              )}
            </Box>
            <Box
              component={motion.div}
              initial={{ opacity: 1 }}
              animate={{
                opacity: state === 0 ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              sx={{
                color: '#c2e6eb59',
                backgroundColor: '#c2e6eb0a',
                px: '6px',
                borderRadius: '6px',
                fontSize: 13,
              }}
            >
              ⌘ K
            </Box>
          </Box>

          <Box
            component={motion.div}
            layout
            initial={{ height: 0 }}
            animate={{ height: state > 2 ? 208 : 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
          >
            <AnimatePresence mode="popLayout">
              {state < 5 ? (
                <Box
                  key="container1"
                  component={motion.div}
                  initial={{
                    opacity: 1,
                  }}
                  exit={{
                    x: -180,
                    opacity: 0,
                    transition: {
                      duration: 0.35,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <AnimatePresence>
                    {state > 2 && (
                      <Box sx={{ padding: '8px', position: 'relative' }}>
                        {state >= 4 && (
                          <Box
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: 0.8,
                              duration: 0.25,
                              ease: 'ease',
                            }}
                            sx={{
                              position: 'absolute',
                              inset: '8px',
                              height: 36,
                              borderRadius: '6px',
                              background: '#c2e6eb0a',
                            }}
                          />
                        )}
                        {[
                          { icon: <StarsIcon />, title: '', description: '' },
                          ...items,
                        ].map((item, i) => (
                          <Box
                            key={i}
                            layout={true}
                            component={motion.div}
                            initial={{ y: 40, opacity: 0, filter: 'blur(3px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            transition={{
                              duration: 0.4,
                              delay: 0.2 + i * 0.15,
                              ease: 'easeInOut',
                            }}
                            sx={{
                              padding: '8px 12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                            }}
                          >
                            <Box sx={{ display: 'flex', color: '#c2e6eb' }}>
                              {item.icon}
                            </Box>
                            {i === 0 ? (
                              <Box sx={{ display: 'flex', gap: '4px' }}>
                                <Box
                                  sx={{ color: '#c2e6ebd4', fontWeight: 500 }}
                                >
                                  Ask {name}:
                                </Box>
                                <Box>What is {name}?</Box>
                              </Box>
                            ) : (
                              <Stack>
                                <Box sx={{ fontSize: 14 }}>{item.title}</Box>
                                <Box
                                  sx={{
                                    fontSize: 12,
                                    overflowX: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: {
                                      xs: 260,
                                      sm: '100%',
                                    },
                                  }}
                                >
                                  {item.description}
                                </Box>
                              </Stack>
                            )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </AnimatePresence>
                </Box>
              ) : (
                <Box
                  key="container2"
                  component={motion.div}
                  initial={{
                    x: 180,
                    opacity: 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    ease: 'easeInOut',
                  }}
                  sx={{
                    padding: '14px 18px 18px 18px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flex: '1 1 100%',
                      alignItems: 'flex-start',
                      gap: '16px',
                      color: '#c2e6ebd4',
                      fontSize: 13,
                      svg: {
                        flexShrink: 0,
                        color: '#c2e6eb',
                        width: 16,
                        height: 16,
                      },
                    }}
                  >
                    <StarsIcon />
                    <Box>
                      <Typewriter speed={10} text={description} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      boxShadow:
                        '0 0 24px #cad7f914 inset,0 1px 1px #c9d7f91f inset',
                      backgroundColor: '#c2e6eb0a',
                      height: 36,
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                      padding: '8px 12px',
                      '&:before': {
                        borderRadius: 'inherit',
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        border: '1px solid #c2e6eb1f',
                      },
                    }}
                  >
                    <Box
                      sx={{ flex: '1 1 0%', color: '#c2e6eb59', fontSize: 13 }}
                    >
                      Write something...
                    </Box>
                    <PaperplaneIcon />
                  </Box>
                </Box>
              )}
            </AnimatePresence>
          </Box>
        </Box>

        {state == 4 && (
          <Box
            component={motion.div}
            initial={{ top: 110, right: 140 }}
            animate={{ top: 75, right: 220 }}
            transition={{ duration: 1, ease: 'easeIn', delay: 0.1 }}
            sx={{ position: 'absolute', top: 110, right: 30, zIndex: 4 }}
          >
            <ArrowCursorIcon />
          </Box>
        )}
      </Box>
    </Box>
  );
};

const blinkKeyframe = keyframes`
  0% {
      opacity: 0;
  }

  50% {
      opacity: 1;
  }

  100% {
      opacity: 0;
  }
`;

const TypingCursor = () => {
  return (
    <Box
      sx={{
        width: '1px',
        height: 12,
        display: 'inline-block',
        ml: '3px',
        mb: '-1px',
        background: '#c2e6ebd4',
        animation: `${blinkKeyframe} 1.5s infinite`,
      }}
    />
  );
};

const SearchIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.875 16.875L13.4388 13.4388M13.4388 13.4388C14.5321 12.3454 15.2083 10.835 15.2083 9.16667C15.2083 5.82995 12.5034 3.125 9.16667 3.125C5.82995 3.125 3.125 5.82995 3.125 9.16667C3.125 12.5034 5.82995 15.2083 9.16667 15.2083C10.835 15.2083 12.3454 14.5321 13.4388 13.4388Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const StarsIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.8332 6.33325C11.0173 6.33325 11.1665 6.48249 11.1665 6.66658C11.1665 8.65177 11.6043 10.0045 12.4664 10.8666C13.3286 11.7288 14.6813 12.1666 16.6665 12.1666C16.8506 12.1666 16.9998 12.3158 16.9998 12.4999C16.9998 12.684 16.8506 12.8333 16.6665 12.8333C14.6813 12.8333 13.3286 13.2711 12.4664 14.1332C11.6043 14.9953 11.1665 16.3481 11.1665 18.3333C11.1665 18.5173 11.0173 18.6666 10.8332 18.6666C10.6491 18.6666 10.4998 18.5173 10.4998 18.3333C10.4998 16.3481 10.062 14.9953 9.1999 14.1332C8.33778 13.2711 6.98502 12.8333 4.99984 12.8333C4.81574 12.8333 4.6665 12.684 4.6665 12.4999C4.6665 12.3158 4.81574 12.1666 4.99984 12.1666C6.98502 12.1666 8.33778 11.7288 9.1999 10.8666C10.062 10.0045 10.4998 8.65177 10.4998 6.66658C10.4998 6.48249 10.6491 6.33325 10.8332 6.33325ZM4.04314 6.54322C4.31245 6.2739 4.48888 5.91801 4.58317 5.47388C4.67746 5.91801 4.85389 6.2739 5.1232 6.54322C5.39252 6.81253 5.74841 6.98896 6.19255 7.08325C5.74841 7.17754 5.39252 7.35397 5.1232 7.62328C4.85389 7.8926 4.67746 8.24849 4.58317 8.69263C4.48888 8.24849 4.31245 7.8926 4.04314 7.62328C3.77382 7.35397 3.41793 7.17754 2.97379 7.08325C3.41793 6.98896 3.77382 6.81253 4.04314 6.54322ZM8.40946 2.57621C8.57008 2.41559 8.68165 2.21065 8.74984 1.96161C8.81802 2.21065 8.9296 2.41559 9.09022 2.5762C9.25083 2.73682 9.45578 2.8484 9.70481 2.91658C9.45578 2.98477 9.25083 3.09635 9.09022 3.25696C8.9296 3.41758 8.81802 3.62252 8.74984 3.87156C8.68165 3.62252 8.57008 3.41758 8.40946 3.25697C8.24884 3.09635 8.0439 2.98477 7.79486 2.91659C8.0439 2.8484 8.24884 2.73682 8.40946 2.57621Z"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

const BookIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 6.45825C10 5.07754 11.1193 3.95825 12.5 3.95825H17.7084C18.1686 3.95825 18.5417 4.33135 18.5417 4.79159V15.2083C18.5417 15.6685 18.1686 16.0416 17.7084 16.0416H12.7309C12.1639 16.0416 11.6081 16.1784 11.1257 16.4765C10.6434 16.7746 10.2536 17.2011 10 17.7083M10 6.45825C10 5.07754 8.88075 3.95825 7.50004 3.95825H2.29171C1.83147 3.95825 1.45837 4.33135 1.45837 4.79159V15.2083C1.45837 15.6685 1.83147 16.0416 2.29171 16.0416H7.26921C7.83622 16.0416 8.39203 16.1784 8.87435 16.4765C9.35668 16.7746 9.74647 17.2011 10 17.7083M10 6.45825V17.7083"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.1133 2.7799L11.6436 2.24957L11.6436 2.24957L11.1133 2.7799ZM15.5537 7.22026L16.084 6.68993L15.5537 7.22026ZM7.29183 10.2917C6.87762 10.2917 6.54183 10.6275 6.54183 11.0417C6.54183 11.456 6.87762 11.7917 7.29183 11.7917V10.2917ZM10.2085 11.7917C10.6227 11.7917 10.9585 11.456 10.9585 11.0417C10.9585 10.6275 10.6227 10.2917 10.2085 10.2917V11.7917ZM7.29183 13.6251C6.87762 13.6251 6.54183 13.9609 6.54183 14.3751C6.54183 14.7893 6.87762 15.1251 7.29183 15.1251V13.6251ZM12.7085 15.1251C13.1227 15.1251 13.4585 14.7893 13.4585 14.3751C13.4585 13.9609 13.1227 13.6251 12.7085 13.6251V15.1251ZM5.62516 3.04175H9.93481V1.54175H5.62516V3.04175ZM15.2918 8.39877V16.0417H16.7918V8.39877H15.2918ZM10.583 3.31023L15.0233 7.75059L16.084 6.68993L11.6436 2.24957L10.583 3.31023ZM4.7085 16.0417V3.95841H3.2085V16.0417H4.7085ZM14.3752 16.9584H5.62516V18.4584H14.3752V16.9584ZM3.2085 16.0417C3.2085 17.3764 4.29047 18.4584 5.62516 18.4584V16.9584C5.1189 16.9584 4.7085 16.548 4.7085 16.0417H3.2085ZM16.7918 8.39877C16.7918 7.75783 16.5372 7.14314 16.084 6.68993L15.0233 7.75059C15.1953 7.9225 15.2918 8.15566 15.2918 8.39877H16.7918ZM9.93481 3.04175C10.1779 3.04175 10.4111 3.13833 10.583 3.31023L11.6436 2.24957C11.1904 1.79636 10.5757 1.54175 9.93481 1.54175V3.04175ZM15.2918 16.0417C15.2918 16.548 14.8814 16.9584 14.3752 16.9584V18.4584C15.7099 18.4584 16.7918 17.3764 16.7918 16.0417H15.2918ZM5.62516 1.54175C4.29047 1.54175 3.2085 2.62373 3.2085 3.95841H4.7085C4.7085 3.45215 5.1189 3.04175 5.62516 3.04175V1.54175ZM9.87516 2.70841V6.04175H11.3752V2.70841H9.87516ZM12.2918 8.45842H15.6252V6.95842H12.2918V8.45842ZM9.87516 6.04175C9.87516 7.37644 10.9571 8.45842 12.2918 8.45842V6.95842C11.7856 6.95842 11.3752 6.54801 11.3752 6.04175H9.87516ZM7.29183 11.7917H10.2085V10.2917H7.29183V11.7917ZM7.29183 15.1251H12.7085V13.6251H7.29183V15.1251Z"
      fill="currentColor"
    />
  </svg>
);

const ChatIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.375 11.875H16.0435C16.9639 11.875 17.7101 11.1288 17.7101 10.2083V4.79167C17.7101 3.87119 16.9639 3.125 16.0435 3.125H7.50179C6.58132 3.125 5.83512 3.87119 5.83512 4.79167V6.45833M12.7101 6.45833H3.96012C3.03965 6.45833 2.29346 7.20453 2.29346 8.125V13.5417C2.29346 14.4621 3.03965 15.2083 3.96012 15.2083H5.00179V17.2917L8.75179 15.2083H12.7101C13.6306 15.2083 14.3768 14.4621 14.3768 13.5417V8.125C14.3768 7.20453 13.6306 6.45833 12.7101 6.45833Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const PaperplaneIcon = () => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.00023 8.00006H6.16689M4.00023 8.00006L2.25471 2.7635C2.1608 2.48177 2.45439 2.22714 2.72001 2.35995L13.4039 7.70192C13.6496 7.82476 13.6496 8.17536 13.4039 8.2982L2.72001 13.6402C2.45439 13.773 2.1608 13.5183 2.25471 13.2366L4.00023 8.00006Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    ></path>
  </svg>
);

const ArrowCursorIcon = () => (
  <svg
    height="20"
    viewBox="0 0 30 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.58385 1.69742C2.57836 0.865603 1.05859 1.58076 1.05859 2.88572V35.6296C1.05859 37.1049 2.93111 37.7381 3.8265 36.5656L12.5863 25.0943C12.6889 24.96 12.8483 24.8812 13.0173 24.8812H27.3245C28.7697 24.8812 29.4211 23.0719 28.3076 22.1507L3.58385 1.69742Z"
      fill="#002918"
      stroke="#20dfd6"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default AIChat;
