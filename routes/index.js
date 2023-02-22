const express = require('express');
const router = express.Router();
const pool = require('../database/databaseConn')

let fotos;
let rows;
let id;

/* GET home page. */
router.get('/', function(req, res, next) {

  res.redirect('/fotos')
});

router.get('/fotos', async (req, res, next) => {

  const [ rows ] = await pool.query('select * from foto');

  fotos = rows

  console.log(fotos)

  res.render('fotos', { fotos });

})

// New
router.get('/new', (req, res, next) => {
  console.log('Hola aqui')

  res.render('new', { })
})

// new/profile
router.post('/new/profile', async (req, res, next) => {
  console.log(req.body)
  const {title, url, description} = req.body

  let fecha = new Date()

  let date = String(fecha)
  console.log(date, typeof(date))
  const [ rows ] = await pool.query(`insert into foto (id, titulo, descripcion, url, fecha, megusta, nomegusta) values (null,'${title}','${description}','${url}','${date}', 0,0)`)
  res.redirect('/fotos')
})

//Edit
router.post('/edit', async (req, res, next) => {
  console.log(req.body.id)
  id = req.body.id

  const [ rows ] = await pool.query(`select * from foto where id = ${id}`)

  //console.log(rows)
  res.render('edited', { rows })
  //res.redirect('/fotos')
})

// /edit/profile
router.post('/edit/profile', async (req, res, next) => {
  //console.log(req.body)
  const  { title, url, description, id } = req.body

  let titulo = title;
  let descripcion = description;

  let int_id = parseInt(id)

  const [ rows ] = await pool.query(`update foto set titulo = '${titulo}', descripcion = '${descripcion}', url = '${url}'  where id = ${int_id}`)
  res.redirect('/fotos')
})

// post delete
router.post('/delete', async (req, res, next) => {

  //console.log(req.body.id)
  const [ rows ] = await pool.query(`delete from foto where id = ${req.body.id}`)

  res.redirect('/fotos')
})
// get like
router.get('/fotos/masvotadas', async (req, res, next) => {

  const [ rows ] = await pool.query('select titulo, descripcion, url, fecha, max(megusta), nomegusta from foto');

  fotos = rows

  console.log(fotos)

  res.render('fotoslike', { fotos });
})
// post like
router.post('/fotos/masvotadas', async (req, res, next) => {
  
  const [ rows ] = await pool.query(`select megusta, nomegusta from foto where id = ${req.body.id}`);

  console.log(rows)

  if(rows[0].nomegusta == 0){
    
    const [ rows ] = await pool.query(`update foto set megusta = megusta + 1  where id = ${req.body.id}`)
    res.redirect('/fotos')
    
  }else{

    const [ rows ] = await pool.query(`update foto set megusta = megusta + 1, nomegusta = nomegusta - 1  where id = ${req.body.id}`)
    res.redirect('/fotos')
  }

  //const [ rows ] = await pool.query(`update foto set titulo = '${titulo}', descripcion = '${descripcion}', url = '${url}'  where id = ${int_id}`)

})

// get dislike
router.get('/fotos/menosvotadas', (req, res, next) => {

  res.render('fotosdislike', {  });
})

// post dislike
router.post('/fotos/menosvotadas', async (req, res, next) => {
  console.log(req.body)

  const [ rows ] = await pool.query(`select megusta, nomegusta from foto where id = ${req.body.id}`);

  if(rows[0].megusta == 0){
    
    const [ rows ] = await pool.query(`update foto set nomegusta = nomegusta + 1  where id = ${req.body.id}`)
    res.redirect('/fotos')

  }else{

    const [ rows ] = await pool.query(`update foto set megusta = megusta - 1, nomegusta = nomegusta + 1  where id = ${req.body.id}`)
    res.redirect('/fotos')
  }

})

module.exports = router;
