export const boardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return {
        ...state,
        board: action.payload.board,
        lists: action.payload.lists || [],
        tasks: action.payload.tasks || [],
      };
    
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
      };
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload.taskId 
            ? { ...task, listId: action.payload.newListId } 
            : task
        ),
      };
    
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task.id === action.payload 
            ? { ...task, isFavorite: !task.isFavorite } 
            : task
        ),
      };
    
    case 'SET_THEME':
      return {
        ...state,
        board: {
          ...state.board,
          theme: action.payload,
        },
      };
    
    default:
      return state;
  }
};

export const initialState = {
  board: null,
  lists: [],
  tasks: [],
};