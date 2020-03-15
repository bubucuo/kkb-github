import React, {useState, useEffect, useReducer} from "react";

function fruitReducer(state = [], action) {
  switch (action.type) {
    case "INIT":
    case "REPLACE":
      return [...action.payload];
    case "ADD":
      return [...state, action.payload];
    default:
      return state;
  }
}

export default function UseReducerPage(props) {
  const [fruits, dispatch] = useReducer(fruitReducer, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch({type: "INIT", payload: ["apple", "banana"]});
    }, 1000);
  }, []);
  return (
    <div>
      <h3>UseReducerPage</h3>
      <AddFruit
        addFruit={newFruit => dispatch({type: "ADD", payload: newFruit})}
      />
      <FrutList
        fruits={fruits}
        setFruit={newFruitList =>
          dispatch({type: "REPLACE", payload: newFruitList})
        }
      />
    </div>
  );
}

function AddFruit({addFruit}) {
  const [name, setName] = useState("");
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => addFruit(name)}>add</button>
    </div>
  );
}

function FrutList({fruits, setFruit}) {
  const delFruit = delIndex => {
    const tem = [...fruits];
    tem.splice(delIndex, 1);
    setFruit(tem);
  };
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={fruit} onClick={() => delFruit(index)}>
          {fruit}
        </li>
      ))}
    </ul>
  );
}
