import "./App.css";
import { Toast } from "./components/Toast";
import { useData } from "./context/DataProvider";
import { Router } from "./Router/Router";
import "./styles/main.css"

function App() {
  const { state: { toastMsg } } = useData();

  return (
    <>
      <div>{toastMsg && <Toast />}</div>
      < Router />
    </>
  );
}

export default App;
