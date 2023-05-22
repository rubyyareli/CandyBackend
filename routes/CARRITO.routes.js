const express = require("express");
const routesU = express.Router();


routesU.get('/',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM CARRITO', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesU.get('/:id',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM CARRITO WHERE FK_USER_ID = ? AND ACTIVO=1', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesU.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO CARRITO set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('se agrego al carrito!')
        })
    })
})

routesU.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM CARRITO WHERE CARRITO_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Se elimino el carrito')
        })
    })
})

routesU.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE CARRITO set ? WHERE FK_USER_ID = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('el carrito se actualizo!')
        })
    })
})

module.exports=routesU;
