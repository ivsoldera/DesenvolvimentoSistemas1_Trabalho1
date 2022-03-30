const taskModel = require('../models/tasksModel');
const taskSchema = require('../schemas/TasksSchema');
const appError = require('../errors/appError');

const findAll = async () => taskModel.findAll();

const findByResponsible = async (responsible) => taskModel.findByResponsible(responsible);

const findByTaskName = async (taskName) => taskModel.findByTaskName(taskName);

const create = async (task) => {
    const {value, error} = taskSchema.validate(task);
    if(error){
        throw new appError("Erro geral", 400);
    }
    return taskModel.create(value)
}

const editById = async (id, task) => {
  const {error} = taskSchema.validate(task);
  if(error){
      throw new appError("Erro geral", 400);
  }

  const taskName = await findByTaskName(task.nameTask);

  if(taskName) {
      throw new appError("Task já cadastrado", 409);
  }

  return taskModel.editById(id, task);
}

const deleteById = async (id) => {
  try {
    return taskModel.deleteById(id);
  } catch (error) {
    throw new appError("Erro ao remover registro", 400);
  }
}


module.exports = {
    findAll,
    findByResponsible,
    create,
    editById,
    deleteById
}