import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *    post:
 *      summary: Creates a new user
 *      produces:
 *        - application/json
 *      tags:
 *        - Auth
 *      requestBody:
 *        description: Data for new user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: returns created user
 *          schema:
 *            $ref: '#/components/schemas/User'
 */
router.post("/register",register);

/**
 * @swagger
 * /api/auth/login:
 *    post:
 *      summary: Login to get user's access token
 *      produces:
 *        - application/json
 *      tags:
 *        - Auth
 *      requestBody:
 *        description: User data for new user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: Ramzan Dido
 *                password:
 *                  type: string
 *                  example: p@ssw0rd
 *      responses:
 *        "200":
 *          description: logs in user and returns access token
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              email:
 *                type: string
 *              name:
 *                type: string
 *              token:
 *                type: string
 *                description: auth token required for performing authenticated actions
 *        "401":
 *          description: incorrect username or password
 */
router.post("/login",login)

export default router