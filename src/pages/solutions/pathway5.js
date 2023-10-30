import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'ITEM';

const DraggableItem = ({ item, isHighlighted, onDelete, onClick }) => {
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="body1" onClick={() => onClick(item)}>
          {item.stepName}
        </Typography>
        {onDelete && <Button onClick={() => onDelete(item.id)}>Delete</Button>}
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
  const [selectedItem, setSelectedItem] = useState(null);

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      // Handle form submission here...
    },
  });

  const handleDropColumn2 = item => {
    const newItem = { ...item, id: Date.now() }; // Generating a unique ID using current timestamp
    setColumn2Items(prev => [...prev, newItem]);
  };

  const handleDelete = id => {
    setColumn2Items(prev => prev.filter(item => item.id !== id));
  };

  const handleClick = item => {
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
                onClick={handleClick}
              />
            ))}
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Column 2</Typography>
            <DropColumn onDrop={handleDropColumn2}>
              {column2Items.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  item={{ ...item, sequence: index + 1 }}
                  onDelete={handleDelete}
                  onClick={handleClick}
                />
              ))}
            </DropColumn>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Column 3</Typography>
            {selectedItem && (
              <form onSubmit={formik.handleSubmit}>
                {selectedItem.attributes[0]?.details.map(detail => (
                  <TextField
                    key={detail.id}
                    label={detail.label}
                    type={detail.type}
                    required={detail.isRequired}
                    onChange={formik.handleChange}
                    value={formik.values[detail.fieldName] || ''}
                    name={detail.fieldName}
                  />
                ))}
                <Button type="submit">Submit</Button>
              </form>
            )}
          </Grid>
        </Grid>
      </Container>
    </DndProvider>
  );
};

export default Pathway2;
