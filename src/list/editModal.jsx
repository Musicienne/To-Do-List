import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditModal({ task, index, setTasks }) {

  const handleSave = (editedTaskName) => {
    const updatedTasks = [...setTasks];
    updatedTasks[index] = { ...updatedTasks[index], name: editedTaskName };
    setTasks(updatedTasks);
  };

  return (
    <>
      <Button
        style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          padding: '8px',
          margin: '14px',
          border: 'none',
          borderRadius: '5px',
          transition: 'background-color 0.5s ease'
        }}
        variant="primary"
        onClick={() => handleSave(task.name)}
      >
        Edit
      </Button>

      <Modal show={false} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={task.name}
            onChange={(e) => handleSave(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleSave(task.name)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave(task.name)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
