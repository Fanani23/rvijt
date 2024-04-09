const { response } = require('../helpers/common')
const {
 postReview,
 putReview,
 getReview,
 getReviewByID,
 deleteReview,
} = require('../models/review')

const reviewController = {
 post: async (req, res) => {
  let digits = '0123456789'
  let id = 'RV'
  for (let i = 0; i < 6; i++) {
   id += digits[Math.floor(Math.random() * 10)]
  }

  const nama = req.body.nama
  const bintang = req.body.bintang
  const ulasan = req.body.ulasan

  const data = {
   id,
   nama,
   bintang,
   ulasan,
  }

  try {
   const result = await postReview(data)
   if (result) {
    response(res, 201, true, data, 'Create review success')
   }
  } catch (err) {
   console.error(new Error(err))
   response(res, 400, false, data, 'Create review failed')
  }
 },
 put: async (req, res) => {
  const id = req.params.id
  const nama = req.body.nama
  const bintang = req.body.bintang
  const ulasan = req.body.ulasan

  const data = {
   id,
   nama,
   bintang,
   ulasan,
  }

  try {
   const result = await putReview(data)
   if (result) {
    response(res, 200, true, data, 'Update review success')
   }
  } catch (err) {
   console.error(new Error(err))
   response(res, 400, false, null, 'Update review false')
  }
 },
 get: async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const sortby = req.query.sortby || 'create_time'
  const sortorder = req.query.sortorder || 'desc'
  const search = req.query.search || ''
  const offset = (page - 1) * limit

  const filter = {
   search,
   sortby,
   sortorder,
   limit,
   offset,
  }

  try {
   const result = await getReview(filter)
   if (result) {
    response(res, 200, true, result.rows, 'Get review success')
   }
  } catch (err) {
   console.error(new Error(err))
   response(res, 404, false, null, 'Get review failed')
  }
 },
 getByID: async (req, res) => {
  const id = req.params.id

  const filter = {
   id,
  }

  try {
   const result = await getReviewByID(filter)
   if (result) {
    response(res, 200, true, result.rows[0], 'Get review by ID success')
   }
  } catch (err) {
   console.error(new Error(err))
   response(res, 404, false, null, 'Get review by ID failed')
  }
 },
 delete: async (req, res) => {
  const id = req.params.id

  const filter = {
   id,
  }

  try {
   const result = await deleteReview(filter)
   if (result) {
    response(res, 200, true, 'Delete', 'Delete review success')
   }
  } catch (err) {
   console.error(new Error(err))
   response(res, 400, false, null, 'Delete review failed')
  }
 },
}

exports.reviewController = reviewController
