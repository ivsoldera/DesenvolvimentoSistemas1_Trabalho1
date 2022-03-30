const { ObjectId }   = require('mongodb');
const { connection } = require('./conn');

const getTasksCollection = async () => {
    const conn = await connection();
    return conn.collection('tasks');
}

const findAll = async () => {
    const tasks = await getTasksCollection();
    return tasks.find().toArray();
}

const findByResponsible = async (responsible) => {
    const tasks = await getTasksCollection();
    return tasks.find({responsible}).toArray();
}

const findByTaskName = async (nameTask) => {
  const tasks = await getTasksCollection();
  return tasks.findOne({nameTask});
}

const create = async (task) => {
    const tasks = await getTasksCollection();
    const {insertedId} = await tasks.insertOne(task);
    console.log(insertedId)
    return {_id: insertedId, ...task};
}

const editById = async (id, task) => {
  const tasks = await getTasksCollection();
  const updateTask = await tasks.findOneAndUpdate(
    {_id: ObjectId(id)},
    { $set: task},
    { returnDocument: 'after'}
  );
  return updateTask.value;
}

const deleteById = async (id) => {
  const tasks = await getTasksCollection();
  const { deletedCount } = await tasks.deleteOne({_id: ObjectId(id)});
  if(!deletedCount) throw new Error ("Falha ao remover");
  return true;
}

module.exports = {
    findAll,
    findByResponsible,
    findByTaskName,
    create,
    editById,
    deleteById
};