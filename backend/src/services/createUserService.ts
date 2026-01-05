import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";


interface CreateUserRequest {
  nome: string;
  email: string;
  senha: string;
  role: "DOADOR" | "BENEFICIARIO";
}

export class CreateUserService {
  async execute({ nome, email, senha, role }: CreateUserRequest) {
    const userExiste = await prisma.user.findUnique({
      where: { email },
    });

    if (userExiste) {
      throw new Error("Usuário já existe");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        role,
      },
    });

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    };
  }
}