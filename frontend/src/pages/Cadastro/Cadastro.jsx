import { useState } from "react"; // O hook useState é a função que permite um componente "guardar" e atualizar dados que, quando mudam, fazem a tela renderizar sozinha.
import { Link } from 'react-router-dom';
import './Cadastro.css';


const Cadastro = () => {

    // state único guardando todos os campos do formulário num objeto.
    const [formData, setFormData] = useState ({name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    // roda a cada tecla digitada em qualquer input.
    function handleChange(e) {
        const {name, value} = e.target; // pega o "name" do input e o que foi digitado.
        setFormData ({...formData, [name] : value});   // copia o resto do objeto e atualiza só o campo alterado.
    }

    // roda quando o formulário é enviado (botão ou Enter)
    function handleSubmit(e) {
        e.preventDefault(); // impede o navegador de recarregar a página (comportamento padrão do <form>)

         // validação simples: senha e confirmação precisam ser iguais
        if(formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return; // para a função aqui, não deixa continuar
        }
        else {
            alert("O formulário foi enviado com sucesso!")
        }
        
        console.log("Dados do cadastro : ", formData);
        //  aqui entra a chamada pra API/backend, salvando o usuário
    }


    return (
        <>
            <div className="register-page">
                {/* onSubmit conecta o envio do form à função handleSubmit */}
               <form onSubmit={handleSubmit} className="register-form">

                <h2>Cadastro</h2>

                <label>Nome Completo</label>
                <input 
                    type="text" 
                    name = "name"  // precisa bater com a chave no formData
                    value = {formData.name} // valor sempre vem do state (input controlado)
                    onChange = {handleChange}  // atualiza o state a cada tecla
                    required  
                />

                <label>E-mail </label>
                <input 
                    type = "email"
                    name = "email"
                    value = {formData.email}
                    onChange = {handleChange}
                    required
                />

                <label>Senha </label>
                <input 
                    type = "password"
                    name = "password"
                    value = {formData.password}
                    onChange = {handleChange}
                    required
                />

                <label> Confirmar Senha </label>
                <input
                    type = "password"
                    name = "confirmPassword"
                    value = {formData.confirmPassword}
                    onChange = {handleChange}
                    required
                />

                 <div className="forgot-password">
                    <Link to ="/EsqueceuSenha">Esqueceu a senha?</Link> {/* O Link ja está funcional. */}
                </div>

                <button type="submit" className="btn-submit">
                    Cadastrar
                </button>

                <div className="login-redirect">
                    Já Possui Uma Conta? <a href="#">Login</a>
                </div>

               </form>
            </div>
        </>
    )
}

export default Cadastro;