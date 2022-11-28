import express from "express";
import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The todo's name.
 *           example: Gym
 *         desc:
 *           type: string
 *           description: The todo's description.
 *           example: Today i have to workout.
 */

/**
 * @swagger
 * /api/todos:
 *    post:
 *      summary: Creates a new todo
 *      produces:
 *        - application/json
 *      tags:
 *        - Todos
 *      security:
 *        - ApiKeyAuth: []
 *      requestBody:
 *        description: Data for new todo
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *      responses:
 *        "201":
 *          description: returns created todo
 *          schema:
 *            $ref: '#/components/schemas/Todo'
 *        "401":
 *          description: User not authenticated
 */
router.post("/",verifyUser,createTodo)

/**
 * @swagger
 * /api/todos/{id}:
 *    put:
 *      summary: Updates a todo
 *      produces:
 *        - application/json
 *      tags:
 *        - Todos
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: todo id to update
 *          in: path
 *          type: integer
 *          required: true
 *          example: 63824abceb22ec72d5a2910c
 *      requestBody:
 *        description: Updated todo
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: Gym
 *                desc:
 *                  type: string
 *                  example: Today i need to workout
 *      responses:
 *        "201":
 *          description: returns updated todo
 *          schema:
 *            $ref: '#/components/schemas/Todo'
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to update this todo
 *        "404":
 *          description: todo not found
 */
router.put("/:id",verifyUser,updateTodo)

/**
 * @swagger
 * /api/todos/{id}:
 *    delete:
 *      summary: Deletes a todo
 *      tags:
 *        - Todos
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: todo id to delete
 *          in: path
 *          type: integer
 *          required: true
 *          example: 63824abceb22ec72d5a2910c
 *      responses:
 *        "204":
 *          description: todo deleted
 *        "401":
 *          description: User not authenticated
 *        "403":
 *          description: User not authorized to delete this todo
 *        "404":
 *          description: todo not found
 */
router.delete("/:id",verifyUser,deleteTodo)

/**
 * @swagger
 * /api/todos/{id}:
 *    get:
 *      summary: Get an individual todo
 *      produces:
 *        - application/json
 *      tags:
 *        - Todos
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          description: caption id
 *          in: path
 *          type: integer
 *          required: true
 *          example: 63824abceb22ec72d5a2910c
 *      responses:
 *        "200":
 *          description: returns a todo
 *          schema:
 *            $ref: '#/components/schemas/Todo'
 *        "404":
 *          description: User not found
 */
router.get("/:id",verifyUser,getTodo)

/**
 * @swagger
 * /api/todos:
 *    get:
 *      summary: Get all todos with or without pagination
 *      produces:
 *        - application/json
 *      tags:
 *        - Todos
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - name: limit
 *          description: amount of shown todos
 *          in: query
 *          type: integer
 *          required: false
 *          example: 10
 *        - name: page
 *          description: page of shown todos
 *          in: query
 *          type: integer
 *          required: false
 *          example: 1
 *      responses:
 *        "200":
 *          description: returns a list of all todos
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Todo'
 */
router.get("/",verifyUser,getTodos)

export default router
