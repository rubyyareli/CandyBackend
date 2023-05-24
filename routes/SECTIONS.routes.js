const express = require("express");
const routesS = express.Router();


routesS.get('/',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM sections', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesS.get('/:id',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM sections WHERE SECTION_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesS.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO sections set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('se agrego el producto!')
        })
    })
})

routesS.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM sections WHERE SECTION_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Se elimino el producto')
        })
    })
})

routesS.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE sections set ? WHERE SECTION_ID = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('el producto se actualizo!') 
        })
    })
})


module.exports=routesS;
