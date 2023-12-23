import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ExtraSubtitleHeading from '@/components_fbl/headingComponents/ExtraSubtitleHeading';
import { Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
function CareerCardLists({ pathway }) {
  const secondsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: 300,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      y: 0,
      transition: {
        type: 'spring',
        duration: 2,
        ease: 'easeInOut',
        damping: 9.8,
        stiffness: 100,
      },
    },
  };
  return (
    <Grid key={pathway.id} item xs={12} sm={6} md={4} lg={3}>
      <motion.div transition={{ staggerChildren: 1.9 }}>
        <motion.div
          variants={secondsec}
          initial={'offscreen'}
          whileInView={'onscreen'}
          viewport={{ once: true }}
        >
          <Card
            sx={{
              borderRadius: theme => theme.spacing(1),
              boxShadow: 'unset',
              border: '1px solid #7070705e',
              position: 'relative',
              transition: 'transform 400ms ease, box-shadow 400ms ease 200ms',
              '&:hover': {
                transform: 'translate(-2px, -2px)',
                border: '1px solid #712376',
                boxShadow: '#712376 5px 5px ',
              },
            }}
          >
            <ExtraSubtitleHeading
              align="center"
              sx={{
                width: '100%',
                textTransform: 'uppercase',
                backgroundColor: 'violetPalette.light',
                py: 0.5,
              }}
            >
              {pathway.typeOfPathway}
            </ExtraSubtitleHeading>
            <CardContent
              sx={{
                minHeight: '125px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <ExtraParagraphHeading sx={{ color: 'pinkPalette.light', mb: 1 }}>
                {`Rs. ${pathway.amount}/-`}
              </ExtraParagraphHeading>
              <ExtraParagraphHeading sx={{ color: 'primaryPalette.black' }}>
                {pathway.pathwayName}
              </ExtraParagraphHeading>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Grid>
  );
}

export default CareerCardLists;
