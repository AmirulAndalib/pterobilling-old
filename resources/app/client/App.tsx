import { useState } from "react";

function App() {
    const [counter, setCount] = useState(0);
    const onClick = () => setCount(counter + 1);

    return (
        <div>
            <h1>Hello World</h1>
            <button onClick={onClick}>Clicked {counter} times !</button>
        </div>
    );
}

export default App;
