const tasksServices = require("../services/TasksServices");

const findAll = (async (_request, response) => {
    if(typeof _request.query.responsible != "undefined"){
      const results = await tasksServices.findByResponsible(_request.query.responsible);
      response.json(results);
    }
    else {
      const results = await tasksServices.findAll();
      response.json(results);
    }
});

const findByResponsible = (async (request, response) => {
  const { responsible } = request.params;

  const result = await tasksServices.findByResponsible(responsible);
  if(!result){
    response.status(404).json({message: "User not found"});
  }
  else{
    response.json(result);
  }
});

const create = (async (request, response) => {
    //acessar os dados que vem do corpo da requisicao
    const {nameTask, description, deadline, priority, solved, responsible} = request.body;
    const {_id, ...task} = await tasksServices.create({
      nameTask,
      description,
      deadline,
      priority,
      solved,
      responsible,
    })
    response.status(201).json({
      nameTask: task.nameTask,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
      solved: task.solved,
      responsible: task.responsible
    });
});

const editById = (async (request, response) => {
  const { id } = request.params;

  const results = await tasksServices.editById(id, request.body);
  response.json(results); 
});

const deleteById = (async (request, response) => {
  const { id } = request.params;

  await tasksServices.deleteById(id);
  return response.status(204).json({message: 'Task sucessfully removed'}); 
});

module.exports = {
    findAll,
    findByResponsible,
    create,
    editById,
    deleteById
};