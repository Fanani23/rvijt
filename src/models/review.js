const pool = require('../configs/db')

const postReview = (data) => {
 console.log(data)
 const columns = ['id', 'nama', 'bintang', 'ulasan']

 const values = columns.map((column) => {
  if (data.hasOwnProperty(column)) {
   return `'${data[column]}'`
  }
  return 'null'
 })

 return new Promise((resolve, reject) => {
  pool.query(
   `INSERT INTO tbl_ulasan
        (${columns.join(', ')}, create_time, update_time)
        VALUES (${values.join(', ')}, NOW(), NOW())`,
   (err, result) => {
    if (!err) {
     resolve(result)
    } else {
     reject(new Error(err))
    }
   }
  )
 })
}

const putReview = (data) => {
 const { id, nama, bintang, ulasan } = data

 let setData = ''
 if (nama) {
  setData += `nama = '${nama}', `
 }
 if (bintang) {
  setData += `bintang = '${bintang}', `
 }
 if (ulasan) {
  setData += `ulasan = '${ulasan}', `
 }

 return new Promise((resolve, reject) => {
  pool.query(
   `UPDATE tbl_ulasan
        SET ${setData}
            WHERE id = '${id}'`,
   (err, result) => {
    if (!err) {
     resolve(result)
    } else {
     reject(new Error(err))
    }
   }
  )
 })
}

const getReview = (filter) => {
 console.log(filter)
 if (filter.search !== '') {
  return new Promise((resolve, reject) => {
   pool.query(
    `SELECT rv.*
          FROM tbl_ulasan AS rv
          WHERE rv.nama LIKE '%${filter.search}%'
          ORDER BY rv.${filter.sortby} ${filter.sortorder}
          LIMIT ${filter.limit}
          OFFSET ${filter.offset}`,
    (err, result) => {
     if (!err) {
      resolve(result)
     } else {
      reject(new Error(err))
     }
    }
   )
  })
 } else {
  return new Promise((resolve, reject) => {
   pool.query(
    `SELECT rv.*
          FROM tbl_ulasan AS rv
          ORDER BY rv.${filter.sortby} ${filter.sortorder}
          LIMIT ${filter.limit}
          OFFSET ${filter.offset}`,
    (err, result) => {
     if (!err) {
      resolve(result)
     } else {
      reject(new Error(err))
     }
    }
   )
  })
 }
}

const getReviewByID = (filter) => {
 return new Promise((resolve, reject) => {
  pool.query(
   `SELECT rv.*
        FROM tbl_ulasan AS rv
            WHERE rv.id = '${filter.id}'`,
   (err, result) => {
    if (!err) {
     resolve(result)
    } else {
     reject(new Error(err))
    }
   }
  )
 })
}

const deleteReview = (filter) => {
 return new Promise((resolve, reject) => {
  pool.query(
   `DELETE FROM tbl_ulasan
        WHERE id = '${filter.id}'`,
   (err, result) => {
    if (!err) {
     resolve(result)
    } else {
     reject(new Error(err))
    }
   }
  )
 })
}

module.exports = {
 postReview,
 putReview,
 getReview,
 getReviewByID,
 deleteReview,
}
