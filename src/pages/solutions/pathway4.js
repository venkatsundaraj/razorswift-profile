import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';

const ItemType = 'ITEM';

const DraggableItem = ({ item, isHighlighted, isDraggable = true }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemType,
    item: item,
    canDrag: isDraggable,
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

const Pathway4 = () => {
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
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDropColumn2 = item => {
    const newItem = { ...item, uniqueId: uuidv4() }; // Assign a unique ID
    setColumn2Items(prev => [...prev, newItem]);
  };

  const handleRemoveItem = uniqueId => {
    setColumn2Items(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const handleSelectItem = item => {
    setSelectedItem(item);
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
                <div onClick={() => handleSelectItem(item)} key={item.uniqueId}>
                  <DraggableItem
                    item={item}
                    isHighlighted={false}
                    isDraggable={false}
                  />
                  <Button onClick={() => handleRemoveItem(item.uniqueId)}>
                    Remove
                  </Button>
                </div>
              ))}
            </DropColumn>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Column 3</Typography>
            {selectedItem && (
              <Typography variant="body1">
                {selectedItem.stepName} -{' '}
                {selectedItem.attributes[0]?.mainHeader}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </DndProvider>
  );
};

export default Pathway4;
