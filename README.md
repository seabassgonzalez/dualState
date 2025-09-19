# Dual State – Controlled multi‑instance inputs in React

This project demonstrates how to keep multiple instances of a presentational input component fully controlled by a single source of truth in a parent component. The pattern scales cleanly, avoids duplicated local state, and makes resets and side‑effects straightforward.

## Why this pattern?

- Single source of truth in the parent makes behavior predictable
- Stateless, reusable input component(s)
- Easy to reset any specific input after a successful action
- Works for two inputs or N inputs (static or dynamic)

## The component: stateless and controlled

`AddInput` receives `value`, `onChange`, and `onAdd`. It holds no internal input state. This makes it reusable and easy to compose.

```jsx
function AddInput({ value, onChange, onAdd }) {
  const handleSubmit = () => {
    const trimmedText = value.trim();
    if (!trimmedText) return;
    onAdd(trimmedText);
  };

  return (
    <div>
      <input value={value} onChange={e => onChange(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddInput;
```

## The parent: one state object, many instances

The parent owns the state for all input instances. Each instance is mapped to a key in a single object so updates are ergonomic and resets are easy.

```jsx
// In App.jsx (example)
import { useState } from 'react';
import AddInput from './AddInput';

function App() {
  const [inputValues, setInputValues] = useState({ first: '', second: '' });

  const handleAddTodo = (text) => {
    // Do something with the new item...
    console.log('Add:', text);
  };

  return (
    <>
      <AddInput
        value={inputValues.first}
        onChange={nextValue =>
          setInputValues(prev => ({ ...prev, first: nextValue }))
        }
        onAdd={newTodoText => {
          handleAddTodo(newTodoText);
          setInputValues(prev => ({ ...prev, first: '' }));
        }}
      />

      <AddInput
        value={inputValues.second}
        onChange={nextValue =>
          setInputValues(prev => ({ ...prev, second: nextValue }))
        }
        onAdd={newTodoText => {
          handleAddTodo(newTodoText);
          setInputValues(prev => ({ ...prev, second: '' }));
        }}
      />
    </>
  );
}

export default App;
```

### Why this works well

- Controlled inputs: the `value` is always derived from parent state
- Functional updates: `setInputValues(prev => ...)` avoids stale closures
- Immutable updates: spread `...prev` ensures React can detect state changes
- Targeted resets: clear only the specific field after `onAdd`

## License

MIT

An implementation of a dual instance of a component being controlled by one state.











