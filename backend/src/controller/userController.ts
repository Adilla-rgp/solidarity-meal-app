import { Request, Response } from "express";
import { CreateUserService } from "../services/createUserService";


export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { nome, email, senha, role } = req.body;

      const service = new CreateUserService();

      const user = await service.execute({
        nome,
        email,
        senha,
        role,
      });

      return res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}