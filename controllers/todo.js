import Todo from "../models/Todo.js"
export const createTodo = async (req,res,next) =>{
    const newTodo = new Todo(req.body)

    try {
        const savedTodo = await newTodo.save()
        res.status(200).json(savedTodo)
    } catch(err){
        next(err)
    }
}

export const updateTodo = async (req,res,next) =>{
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
        res.status(200).json(updatedTodo)
    } catch(err){
        next(err)
    }
}

export const deleteTodo = async (req,res,next) =>{
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json("Todo has been deleted")
    } catch(err){
        next(err)
    }
}

export const getTodo = async (req,res,next) =>{
    try {
        const todo = await Todo.findById(req.params.id)
        res.status(200).json(todo)
    } catch(err){
        next(err)
    }
}

export const getTodos = async (req,res,next) =>{
    try {
        const limit = req.query.limit;
        const page = req.query.page;
        const Todos = await Todo.find().limit(req.query.limit).skip((page*limit)-limit)
        res.status(200).json(Todos)
    } catch(err){
        next(err)
    }
}