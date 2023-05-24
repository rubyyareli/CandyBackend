const express = require("express");
const routesC = express.Router();


routesC.get('/',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM cards', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesC.get('/:id',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM cards WHERE FK_USER_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesC.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO cards set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('tarjeta agregada!')
        })
    })
})

routesC.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM cards WHERE FK_USER_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Se elimino la tarjeta')
        })
    })
})

routesC.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE cards set ? WHERE FK_USER_ID = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('la tarjeta se actualizo!')
        })
    }) 
})

module.exports=routesC;
