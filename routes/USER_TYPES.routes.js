const express = require("express");
const routes = express.Router();


routes.get('/',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM USER_TYPES', (err, rows)=>{ 
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/:id',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM USER_TYPES WHERE USER_TYPE_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO USER_TYPES set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('tipo de usuario agregado!')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM USER_TYPES WHERE USER_TYPE_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Se elimino el tipo de usuario')
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE USER_TYPES set ? WHERE USER_TYPE_ID = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('tipo de usuario se actualizo!')
        })
    })
})


module.exports=routes;
