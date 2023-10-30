import { Container, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'ITEM';

const DraggableItem = ({ item, isHighlighted }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemType,
    item: item,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Paper
        elevation={3}
        style={{
          margin: '10px',
          padding: '10px',
          backgroundColor: isHighlighted ? 'lightyellow' : 'white',
        }}
      >
        <Typography variant="body1">{item.stepName}</Typography>
      </Paper>
    </div>
  );
};

const DropColumn = ({ onDrop, children }) => {
  const [, dropRef] = useDrop({
    accept: ItemType,
    drop: item => onDrop(item),
  });

  return (
    <div ref={dropRef} style={{ minHeight: '200px', padding: '10px' }}>
      {children}
    </div>
  );
};

const Pathway2 = () => {
  const [stepMasters, setStepMasters] = useState([
    {
      id: 1,
      stepName: 'create profile',
      isMandate: true,
      attributes: [
        {
          mainHeader: 'Reference',
          details: [
            {
              id: 1,
              label: 'Name',
              type: 'text',
              isRequired: true,
              fieldName: 'name',
              value: '',
            },
            {
              id: 2,
              label: 'Link',
              type: 'url',
              isRequired: true,
              fieldName: 'link',
              value: '',
            },
            {
              id: 3,
              label: 'Date',
              type: 'date',
              isRequired: true,
              fieldName: 'date',
              value: '',
            },
          ],
        },
        {
          mainHeader: 'Outcome',
          details: [
            {
              id: 1,
              label: 'Pass',
              type: 'text',
              isRequired: true,
              fieldName: 'pass',
              value: '',
            },
            {
              id: 2,
              label: 'Fail',
              type: 'text',
              isRequired: true,
              fieldName: 'fail',
              value: '',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      stepName: 'Assessment',
      isMandate: false,
      description: '',
      is_active: true,
      attributes: [
        {
          mainHeader: 'Outcome',
          details: [
            {
              id: 1,
              label: 'Min marks',
              type: 'number',
              isRequired: true,
              fieldName: 'minMarks',
              value: '',
            },
            {
              id: 2,
              label: 'Max marks',
              type: 'number',
              isRequired: true,
              fieldName: 'maxMarks',
              value: '',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      stepName: 'Courses',
      isMandate: false,
    },
  ]);
  const [column2Items, setColumn2Items] = useState([]);
  const [column3Items, setColumn3Items] = useState([]);

  const handleDropColumn2 = item => {
    setColumn2Items(prev => [...prev, item]);
    setStepMasters(prev =>
      prev.map(i => (i.id === item.id ? { ...i, isHighlighted: true } : i))
    );
  };

  const handleDropColumn3 = item => {
    setColumn3Items(prev => [...prev, item]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h6">Column 1</Typography>
            {stepMasters.map(item => (
              <DraggableItem
                key={item.id}
                item={item}
                isHighlighted={item.isHighlighted}
              />
            ))}
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Column 2</Typography>
            <DropColumn onDrop={handleDropColumn2}>
              {column2Items.map(item => (
                <Typography key={item.id} variant="body1">
                  {item.stepName}
                </Typography>
              ))}
            </DropColumn>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Column 3</Typography>
            <DropColumn onDrop={handleDropColumn3}>
              {column3Items.map(item => (
                <Typography key={item.id} variant="body1">
                  {/* Show child component details here */}
                  {item.stepName} - {item.attributes[0]?.mainHeader}
                </Typography>
              ))}
            </DropColumn>
          </Grid>
        </Grid>
      </Container>
    </DndProvider>
  );
};

export default Pathway2;
