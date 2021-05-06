$(".addtransaction").click(function (e) {
  var transaction = $("#transaction").val()
  var mname = $("#mname").val()
  var bname = $("#bname").val()
  var type1 = $("#type1").val()
  var date = $("#date").val()


  if (transaction.length > 0 && mname.length > 0 && bname.length > 0 && type1.length > 0 && date.length > 0) {
    e.preventDefault()
    Swal.fire({
      title: 'Do you want to add this transaction?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Add`,
      denyButtonText: `Don't Add`,
    }).then((result) => {
      if (result.isConfirmed) {

        $.post("/transactionadd", { transaction: transaction, mname: mname, bname: bname, type1: type1, date: date }, function (data) { })

        Swal.fire('Added!', '', 'success')
        setTimeout(function () { location.href = "transactions"; }, 2000);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')

      }
    })
  }
})
