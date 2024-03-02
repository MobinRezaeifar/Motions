export const addRegiaterSuccess = (user) => ({
  type: 'ADD_REGISTER_SUCCESS',
  payload: user,
});

export const fetchRegistersSuccess = (users) => ({
  type: 'FETCH_REGISTERS_SUCCESS',
  payload: users,
});

export const updateRegisterSuccess = (updatedUser) => ({
  type: 'UPDATE_REGISTER_SUCCESS',
  payload: updatedUser,
});

export const deleteRegisterSuccess = (id) => ({
  type: 'DELETE_REGISTER_SUCCESS',
  payload: id,
});

export const addListNoteSuccess = (note) => ({
  type: 'ADD_LISTNOTE_SUCCESS',
  payload: note,
});

export const fetchListNotesSuccess = (note) => ({
  type: 'FETCH_LISTNOTE_SUCCESS',
  payload: note,
});

export const updateListNoteSuccess = (updateNote) => ({
  type: 'UPDATE_LISTNOTE_SUCCESS',
  payload: updateNote,
});

export const deleteListNoteSuccess = (id) => ({
  type: 'DELETE_LISTNOTE_SUCCESS',
  payload: id,
});

export const AddRegister = (newUser) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://motionsbackend.liara.run/api/Registers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const register = await response.json();
      dispatch(addRegiaterSuccess(register));
    } catch (error) {
      console.error('Error adding register:', error);
    }
  };
};

export const fetchRegister = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://motionsbackend.liara.run/api/Registers');
      const register = await response.json();
      dispatch(fetchRegistersSuccess(register));
    } catch (error) {
      console.error('Error fetching register:', error);
    }
  };
};

export const updateRegister = (id, updatedRegister) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://motionsbackend.liara.run/api/Registers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRegister),
      });

      const register = await response.json();
      dispatch(updateRegisterSuccess(register));
    } catch (error) {
      console.error(`Error updating register with ID ${id}:`, error);
    }
  };
};

export const deleteRegister = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`https://motionsbackend.liara.run/api/Registers/${id}`, {
        method: 'DELETE',
      });

      dispatch(deleteRegisterSuccess(id));
    } catch (error) {
      console.error(`Error deleting register with ID ${id}:`, error);
    }
  };
};


export const AddListNote = (newNote) => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://motionsbackend.liara.run/api/ListNotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      const note = await response.json();
      dispatch(addListNoteSuccess(note));
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
};

export const fetchListNotes = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://motionsbackend.liara.run/api/ListNotes');
      const notes = await response.json();
      dispatch(fetchListNotesSuccess(notes));
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };
};

export const updateListNote = (id, updatedNote) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://motionsbackend.liara.run/api/ListNotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });

      const note = await response.json();
      dispatch(updateListNoteSuccess(note));
    } catch (error) {
      console.error(`Error updating note with ID ${id}:`, error);
    }
  };
};

export const deleteListNote = (id) => {
  return async (dispatch) => {
    try {
      await fetch(`https://motionsbackend.liara.run/api/ListNotes/${id}`, {
        method: 'DELETE',
      });

      dispatch(deleteListNoteSuccess(id));
    } catch (error) {
      console.error(`Error deleting note with ID ${id}:`, error);
    }
  };
};
