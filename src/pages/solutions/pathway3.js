import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
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

const Column2Item = ({
  item,
  moveToColumn3,
  removeItem,
  index,
  moveItem,
  isDisplayedInColumn3,
}) => {
  const ref = useRef(null);

  const [, drag] = useDrag({
    type: ItemType,
    item: () => {
      return { item, index };
    },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: draggedItem => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: isDisplayedInColumn3 ? 'lightyellow' : 'white',
      }}
    >
      <Typography variant="body1">{item.stepName}</Typography>
      <Button onClick={() => moveToColumn3(item)}>Move to Column 3</Button>
      <Button onClick={() => removeItem(item)}>Cancel</Button>
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
const Pathway3 = () => {
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
    setColumn3Items([item]);
  };

  const moveToColumn3 = item => {
    setColumn3Items([item]);
  };
  const moveItem = (fromIndex, toIndex) => {
    setColumn2Items(prev => {
      const updatedItems = [...prev];
      const [movedItem] = updatedItems.splice(fromIndex, 1);
      updatedItems.splice(toIndex, 0, movedItem);
      return updatedItems;
    });
  };

  const removeItemFromColumn2 = item => {
    setColumn2Items(prev => prev.filter(i => i.id !== item.id));
    if (column3Items[0]?.id === item.id) {
      setColumn3Items([]);
    }
    setStepMasters(prev =>
      prev.map(i => (i.id === item.id ? { ...i, isHighlighted: false } : i))
    );
  };
  const [formData, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    console.log(field, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = () => {
    console.log(formData, 'hshhs');
    setFormData({});
    setColumn3Items([]);
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
              {column2Items.map((item, index) => (
                <Column2Item
                  key={item.id}
                  item={item}
                  index={index}
                  moveItem={moveItem}
                  moveToColumn3={moveToColumn3}
                  removeItem={removeItemFromColumn2}
                  isDisplayedInColumn3={column3Items[0]?.id === item.id}
                />
              ))}
            </DropColumn>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Column 3</Typography>
            <DropColumn onDrop={handleDropColumn3}>
              {column3Items.map(item => (
                <div key={item.id}>
                  <Typography variant="body1">{item.stepName}</Typography>
                  {item.attributes?.map((attr, index) => (
                    <div key={index}>
                      <Typography variant="h6">{attr.mainHeader}</Typography>
                      {attr.details.map(detail => (
                        <TextField
                          key={detail.id}
                          label={detail.label}
                          type={detail.type}
                          required={detail.isRequired}
                          value={formData[detail.fieldName] || ''}
                          onChange={e => {
                            console.log(detail.fieldName, e.target.value, 'ss');
                            handleInputChange(detail.fieldName, e.target.value);
                          }}
                          style={{ margin: '10px' }}
                        />
                      ))}
                    </div>
                  ))}
                  <Button onClick={handleSubmitForm}>Submit</Button>
                </div>
              ))}
            </DropColumn>
          </Grid>
        </Grid>
      </Container>
    </DndProvider>
  );
};

export default Pathway3;
