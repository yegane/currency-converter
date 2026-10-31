import "./App.css";
import ConverterForm from "./components/ConverterForm";
const App = () => {
  return (
    <div className="currency-converter">
      <h2 className="title">Currency Converter</h2>
      <ConverterForm />
    </div>
  );
};

export default App;
