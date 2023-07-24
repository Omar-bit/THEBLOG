const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'theblogdb',
})

connection.connect()

app.post('/api/register', (req, res) => {
  const { email, name, password } = req.body

  connection.query(
    `insert into users values("${name}" , "${email}" ,"${password}")`,
    (error, results, fields) => {
      if (error)
        res.status(200).json({ status: 'error', data: error.sqlMessage })
      else
        res
          .status(200)
          .json({ status: 'ok', data: 'user inserted successfully' })
    }
  )
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  connection.query(
    `select * from users where email = "${email}" and password = "${password}" `,
    (error, results, fields) => {
      if (error) {
        console.log(error.sqlMessage)
        res.status(400).json({ status: 'error' })
      } else {
        if (results.length < 1) {
          res.status(200).json({ status: 'credentials uncorrect' })
        } else {
          const credentials = {
            email: results[0].email,
            name: results[0].name,
          }
          const token = jwt.sign(results[0].email, 'secret-key')

          res.status(200).json({
            status: 'ok',
            data: credentials,
            token,
          })
        }
      }
    }
  )
})

app.get('/api/posts', (req, res) => {
  const token = req.headers.token

  try {
    const decoded = jwt.verify(token, 'secret-key')
    connection.query(
      'SELECT p.* , u.name  from posts as p, users as u where p.user=u.email',
      (error, results, fields) => {
        if (error) {
          res.status(400).json({ status: 'error' })
          throw error.sqlMessage
        } else {
          res.status(200).json({ status: 'ok', data: results })
        }
      }
    )
  } catch (err) {
    res.status(400).json({ status: 'unauthorised' })
  }

  // res.send('posts')
})
app.post('/api/posts/create', (req, res) => {
  const { token, img, title, desc } = req.body

  try {
    const user = jwt.verify(token, 'secret-key')

    connection.query(
      `insert into posts values(null,"${user}" , "${img}" , "${title}" , "${desc}"  )`,
      (error, results, fields) => {
        if (error) {
          res.status(400).json({ status: 'error' })
          throw error.sqlMessage
        } else {
          res
            .status(200)
            .json({ status: 'ok', data: 'post inserted successfully' })
        }
      }
    )
  } catch (err) {
    res.status(400).json({ status: 'unauthorised' })
  }
})

app.delete('/api/posts/delete/:idp', (req, res) => {
  const { idp } = req.params
  const { token } = req.headers
  console.log(token)
  try {
    const user = jwt.verify(token, 'secret-key')

    connection.query(
      `select user from posts where idp = ${idp} `,
      (error, results, fields) => {
        if (error) {
          res.status(200).json({ status: 'error' })
          throw error.sqlMessage
        } else {
          if (results.length > 0) {
            if (results[0].user !== user) {
              res
                .status(200)
                .json({ status: 'this user cant delete this post' })
            } else {
              connection.query(
                `DELETE FROM posts WHERE idp = ${idp}`,
                (error, results, fields) => {
                  if (error) {
                    res.status(200).json({ status: 'error' })
                    throw error
                  }
                  res
                    .status(200)
                    .json({ status: 'ok', data: 'deleted successfully' })
                }
              )
            }
          } else {
            res.status(200).json({ status: 'post with id doesnt exist' })
          }
        }
      }
    )
  } catch (err) {
    res.status(400).json({ status: 'unauthorised' })
  }
})
app.listen(5000, () => {
  console.clear()
  console.log('server is running')
})

/*connection.query('SELECT * from users', (error, results, fields) => {
    if (error) throw error
    console.log('The solution is: ', results)
  })*/
