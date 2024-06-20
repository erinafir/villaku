function rupiah(valuation){
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
         valuation,
       )
 }
 

 module.exports = rupiah