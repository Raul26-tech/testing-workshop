import Header from "./Components/Header";
import { Input } from "./Components/Input";

function App() {
  return (
    <>
      <Header />
      <div className="w-[30rem] p-3 mt-6">
        <Input
          label="Senha"
          addLabelClassName="w-full"
          type="password"
          enableView
        />
        <Input label="Confirmação de senha" addLabelClassName="w-full" />
      </div>
    </>
  );
}

export default App;
