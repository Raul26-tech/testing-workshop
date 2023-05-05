import Header from "./Components/Header";
import { Input } from "./Components/Input";
import { InputPassword } from "./Components/InputPassword";

function App() {
  return (
    <>
      <Header />
      <div className="w-[30rem] p-3 mt-6 space-y-5 gap-y-4">
        <Input
          label="Senha"
          addLabelClassName="w-full"
          type="password"
          enableView
        />
        <Input label="Confirmação de senha" addLabelClassName="w-full" />
        <InputPassword label="Teste" type="password" />
      </div>
    </>
  );
}

export default App;
