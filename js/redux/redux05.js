// Redux: Writing a Todo List Reducer (Adding a Todo) (Toggling a Todo)
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case 'TOGGLE_TODO':
            return state.map(todo => {
               if (todo.id !== action.id) {
                   return todo;
               }
               return {
                   ...todo,
                   completed: !todo.completed
               };
            });
        default:
            return state;
    }
};


const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ]
    Object.freeze(stateBefore);
    Object.freeze(action);
    expect(
        todos(stateBefore, action)
    ).to.eql(stateAfter);
};

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: false
        }
    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: true
        }
    ]
    Object.freeze(stateBefore);
    Object.freeze(action);
    expect(
        todos(stateBefore, action)
    ).to.eql(stateAfter);
};
testAddTodo();
testToggleTodo();
console.log('All tests passed!');













