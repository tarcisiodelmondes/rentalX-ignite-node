import { Router } from "express";

import { ResetPasswordController } from "../../../../modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

export const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/recovery", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);
