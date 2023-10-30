import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Formik, useFormik } from 'formik';
import React, { useRef, useState } from 'react';
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
          {item.stepName} {item.sequence}
        </Typography>
        {onDelete && <Button onClick={() => onDelete(item.id)}>Delete</Button>}
      </Paper>
    </div>
  );
};

const DropColumn = ({ onDrop, children, column2Items }) => {
  const itemRefs = useRef([]);

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (item, monitor) => {
      const hoveredItemRef = itemRefs.current.find(
        ref => ref.current && ref.current.dataset.id === item.id
      );

      if (!hoveredItemRef || !hoveredItemRef.current) return;

      const hoverBoundingRect = hoveredItemRef.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const hoverIndex = column2Items.findIndex(
        columnItem => columnItem.id === item.id
      );

      if (hoverClientY < hoverMiddleY && hoverIndex > 0) {
        onDrop(item, hoverIndex - 1);
      } else if (
        hoverClientY > hoverMiddleY &&
        hoverIndex < column2Items.length - 1
      ) {
        onDrop(item, hoverIndex + 1);
      }
    },
  });

  return (
    <div ref={dropRef} style={{ minHeight: '200px', padding: '10px' }}>
      {React.Children.map(children, (child, idx) => {
        if (!itemRefs.current[idx]) {
          itemRefs.current[idx] = React.createRef();
        }
        return React.cloneElement(child, {
          ref: itemRefs.current[idx],
        });
      })}
    </div>
  );
};

const Pathway6 = () => {
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
  const [formValues, setFormValues] = useState({});

  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {
      // Handle form submission here...
      console.table(values);
      setSelectedItem(null);
    },
  });
  const handleSubmitAll = () => {
    const combinedData = column2Items.map(item => {
      const itemFormValues = formValues[`${item.id}-${item.sequence}`] || {};
      return {
        ...item,
        attributes: {
          ...item.attributes,
          ...itemFormValues,
        },
      };
    });

    console.log(combinedData);
    // Here you can send 'combinedData' to your backend or do any other processing
  };

  const handleDropColumn2 = (item, dropPosition) => {
    // If the item is already in Column 2, reorder it
    const itemExistsInColumn2 = column2Items.some(i => i.id === item.id);

    if (itemExistsInColumn2) {
      // Finding the position where the item was dropped to reorder it
      const targetIndex = column2Items.findIndex(
        i =>
          i.id ===
          column2Items.find((_, idx, arr) =>
            idx === arr.length - 1
              ? dropPosition > 60 * idx
              : dropPosition > 60 * idx && dropPosition <= 60 * (idx + 1)
          ).id
      );

      const updatedItems = [...column2Items];
      const [removed] = updatedItems.splice(
        updatedItems.findIndex(i => i.id === item.id),
        1
      );
      updatedItems.splice(targetIndex, 0, removed);

      setColumn2Items(
        updatedItems.map((item, idx) => ({ ...item, sequence: idx + 1 }))
      );
    } else {
      // If the item is from Column 1, add it to Column 2
      const newItem = {
        ...item,
        id: Date.now(),
        sequence: column2Items.length + 1,
      };
      setColumn2Items(prev => [...prev, newItem]);
    }
  };

  const handleDelete = id => {
    setColumn2Items(prev =>
      prev
        .filter(item => item.id !== id)
        .map((item, index) => ({ ...item, sequence: index + 1 }))
    );
    setSelectedItem(null);
  };

  const handleClick = item => {
    setSelectedItem(item);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        {JSON.stringify(selectedItem)}
        {/* {JSON.stringify(formValues)} */}
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h6">Column 1</Typography>
            {stepMasters.map(item => (
              <DraggableItem
                key={item.id}
                item={item}
                isHighlighted={item.isHighlighted}
                onClick={() => {
                  console.log('hi');
                }}
              />
            ))}
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Column 2</Typography>
            <DropColumn onDrop={handleDropColumn2} column2Items={column2Items}>
              {column2Items.map((item, index) => (
                <DraggableItem
                  key={item.id}
                  item={{ ...item, sequence: index + 1 }}
                  isHighlighted={selectedItem && item.id === selectedItem.id}
                  onDelete={handleDelete}
                  onClick={handleClick}
                />
              ))}
            </DropColumn>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h6">Column 3</Typography>
            {selectedItem && (
              <Formik
                initialValues={formValues[`${selectedItem.id}`] || {}}
                enableReinitialize
                onSubmit={values => {
                  setFormValues(prev => ({
                    ...prev,
                    [`${selectedItem.id}`]: values,
                  }));
                  setSelectedItem(null); // Close the form after submission
                }}
              >
                {formik => (
                  <form onSubmit={formik.handleSubmit}>
                    {selectedItem?.attributes &&
                      selectedItem?.attributes.map(attribute => (
                        <div key={attribute.mainHeader}>
                          <Typography variant="h6">
                            {attribute.mainHeader}
                          </Typography>
                          {attribute.details.map(detail => (
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
                        </div>
                      ))}
                    <Button type="submit">Submit</Button>
                  </form>
                )}
              </Formik>
            )}
            {!selectedItem?.attributes && 'NO DATA'}
          </Grid>
        </Grid>

        <Button onClick={handleSubmitAll}>Submit All</Button>
      </Container>
    </DndProvider>
  );
};

export default Pathway6;
