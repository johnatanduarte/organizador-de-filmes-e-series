const express = require("express"); // Importa a biblioteca do Express para criar o servidor
const cors = require("cors"); // Importa a biblioteca para lidar com requisições HTTP
const { Pool } = require("pg"); // Importa a biblioteca do PostgreSQL
const bcrypt = require("bcrypt"); // Importa a biblioteca de criptografia

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cine_organizer",
  password: "senha123",
  port: 5432,
});

// Rota de Cadastro
app.post("/cadastro", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Verifica se o e-mail já existe no banco
    const usuarioExistente = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email],
    );
    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ erro: "Este e-mail já está em uso." });
    }

    // 2. Criptografa a senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(password, saltRounds);

    // 3. Salva no banco de dados
    await pool.query(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3)",
      [name, email, senhaHash],
    );

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (erro) {
    console.error("Erro no cadastro:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

// Rota de Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Busca o usuário no banco pelo e-mail
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    // Se não encontrou ninguém com esse e-mail
    if (result.rows.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado." });
    }

    const usuario = result.rows[0];

    // 2. Compara a senha digitada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(password, usuario.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha incorreta." });
    }

    // 3. Deu tudo certo! Retorna o ID do usuário para o React guardar
    res.json({
      mensagem: "Login realizado com sucesso!",
      usuarioId: usuario.id,
    });
  } catch (erro) {
    console.error("Erro no login:", erro);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));
