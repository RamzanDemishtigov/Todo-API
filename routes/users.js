import express from "express";
import {updateUser,deleteUser,getUser} from "../controllers/user.js";
import {verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

/**
* @swagger
* components:
*    securitySchemes:
*      ApiKeyAuth:
*        type: apiKey
*        in: header
*        name: authorization
*
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user's name.
 *           example: Ramzan Dido
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: example@mail.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: 12345678
 */

/**
 * @swagger
 * /api/users/{id}:
 *    put:
 *      summary: Updates a user's name or password
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: user id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 63824abceb22ec72d5a2910c
 *      requestBody:
 *        description: Updated user data
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
 *        "201":
 *          description: returns updated user
 *          schema:
 *            $ref: '#/components/schemas/User'
 *        "401":
 *          description: not authenticated
 *        "403":
 *          description: not authorized
 *        "404":
 *          description: user not found
 */
router.put("/:id",verifyUser,updateUser)

/**
 * @swagger
 * /api/users/{id}:
 *    put:
 *      summary: Deletes a user
 *      tags:
 *        - Users
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: user id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 63824abceb22ec72d5a2910c
 *      responses:
 *        "204":
 *          description: User is deleted
 *        "401":
 *          description: not authenticated
 *        "403":
 *          description: not authorized
 *        "404":
 *          description: user not found
 */
router.delete("/:id",verifyUser, deleteUser)

/**
 * @swagger
 * /api/users/{id}:
 *    get:
 *      summary: Get an individual user
 *      produces:
 *        - application/json
 *      tags:
 *        - Users
 *      parameters:
 *        - name: id
 *          description: user id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 63824abceb22ec72d5a2910c
 *      responses:
 *        "200":
 *          description: returns a user
 *          schema:
 *            $ref: '#/components/schemas/User'
 *        "404":
 *          description: User not found
 */
router.get("/:id",verifyUser, getUser)

export default router
