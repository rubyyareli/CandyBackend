const express = require("express");
const routesP = express.Router();


routesP.get('/',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM PRODUCTS', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesP.get('/asc',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT TITULO, PRECIO FROM PRODUCTS ORDER BY PRECIO ASC', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesP.get('/desc',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT TITULO, PRECIO FROM PRODUCTS ORDER BY PRECIO DESC', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesP.get('/ascL',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT TITULO, PRECIO FROM PRODUCTS ORDER BY TITULO ASC', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesP.get('/descL',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT TITULO, PRECIO FROM PRODUCTS ORDER BY TITULO DESC', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routesP.get('/:id/detalle',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM PRODUCTS WHERE PRODUCTOS_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})


routesP.get('/:cate',(req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM PRODUCTS WHERE FK_SECTION_ID = ?', [req.params.cate], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})  

routesP.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO PRODUCTS set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('se agrego el producto!')
        })
    })
})

routesP.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM PRODUCTS WHERE PRODUCTOS_ID = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Se elimino el producto')
        })
    })
})

routesP.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE PRODUCTS set ? WHERE PRODUCTOS_ID = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('el producto se actualizo!')
        })
    })
})

module.exports=routesP;
