import { Request, Response } from "express";
import SessionUserService from "../../../services/SessionUserService";

export default class SessionsControllers {
    async create(Request: Request, response: Response): Promise<Response> {
        const { email, password } = Request.body;

        const createSessionUser = new SessionUserService();
        const userToken = await createSessionUser.execute({ email, password });
        return response.json(userToken);
    }
}
