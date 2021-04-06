const { ObjectID, MongoClient } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').findOne({ name: 'Almog' }, (error, user) => {
    //   if (error) {
    //     return console.log('Unable to fetch')
    //   }
    //   console.log(user)
    // })

    // db.collection('users')
    //   .find({ age: 36 })
    //   .toArray((error, users) => {
    //     console.log(users)
    //   })

    // db.collection('tasks').findOne(
    //   { _id: new ObjectID('606864f84b27f548d453f393') },
    //   (error, task) => {
    //     if (error) {
    //       return console.log('Unable to fetch')
    //     }
    //     console.log(task)
    //   },
    // )

    // db.collection('tasks')
    //   .find({ result: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks)
    //   })

    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('60698ed39099a72984333aea'),
    //     },
    //     {
    //       $set: {
    //         age: 5,
    //       },
    //     },
    //   )
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    // db.collection('tasks')
    //   .updateMany({ result: false }, { $set: { result: true } })
    //   .then((result) => console.log(result))
    //   .catch((error) => {
    //     console.log(error)
    //   })

    db.collection('tasks')
      .deleteOne({ description: 'finish task' })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  },
)
