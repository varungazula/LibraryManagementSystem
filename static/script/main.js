//BOOKS
        $(".deletedbook").click(function(){
            Swal.fire({
                title: 'Do you want to delete this book?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Delete`,
                denyButtonText: `Don't delete`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                 
                    $(this).parents("tr").remove()
                    var id = $(this).attr("id")
                    var string = id
                    console.log(string)
                    $.post("/books_delete", {string:string}, function(data){})        
                 
                  Swal.fire('Deleted!', '', 'success')
                  setTimeout(function(){  location.href = "books"; }, 2000);
                } else if (result.isDenied) {
                // $("#modal1").removeClass("is-active");
        
                  Swal.fire('Changes are not saved', '', 'info')
        
                }
              })
        
        
        })


        $(".deletenotification").click(function(){
          $(".notification").remove()
        })
        setTimeout(function(){  $(".notification").remove(); }, 5000);





$("#insertbook").click(function(){

    // var textname = $("#textname").val()
    // var textmail = $("#textmail").val()
    // var pnum = $("#pnum").val()
    // var id = $("#id").val()
    // console.log(id)
    $.post("/books_insert", function(data){
        // location.reload(true)
    })
})

$(".editbook").click(function(){
    $("#modal1").addClass("is-active")
    var id = $(this).attr("class")
    var z = id.split(" ")
    console.log(z)
    $("#isbn").val(z[1])
    $("#stock").val(z[2])
    // $("#textmail1").val(z[3])
    // $("#pnum1").val(z[4])  
})
$(".btneditbook").click(function(e){
    var isbn = $("#isbn").val()
    var stock = $("#stock").val()
    // e.preventDefault()
    if (stock.length>0){
    e.preventDefault()

    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Save`,
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          $("#modal1").removeClass("is-active");

          // print(textmail1)
          $.post("/books_update",{isbn:isbn,  stock:stock}, function(data){})
         
          Swal.fire('Saved!', '', 'success')
          setTimeout(function(){  location.href = "books"; }, 2000);
        } else if (result.isDenied) {
        $("#modal1").removeClass("is-active");

          Swal.fire('Changes are not saved', '', 'info')

        }
      })

    $(".btnclosedbook").click(function(){
    $("#modal1").removeClass("is-active");
});  
    } 
})



//MEMBERS
$("#modalbtnmembers").click(function(){
    $("#modal").addClass("is-active")
});
$(".btnclosemembers").click(function(){
    $("#modal").removeClass("is-active");
});

$(".deletemembers").click(function(){
    Swal.fire({
        title: 'Do you want to delete this member?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Don't delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
         
    $(this).parents("tr").remove()
    var id = $(this).attr("id")
    var string = id
    console.log(string)
    $.post("/ajax_delete", {string:string}, function(data){})

         
          Swal.fire('Deleted!', '', 'success')
          setTimeout(function(){  location.href = "members"; }, 2000);
        } else if (result.isDenied) {
        $("#modal1").removeClass("is-active");

          Swal.fire('Changes are not saved', '', 'info')

        }
      })


})

$(".addmember").click(function(e){
    // e.preventDefault()
    var textname = $("#textname").val()
    var textmail = $("#textmail").val()
    var pnum = $("#pnum").val()
    var id = $("#id").val()
    console.log(id)
    console.log(textname.length)
    m = $.isNumeric(pnum)
    console.log(m)
    if (textname.length>=0 && textmail.length>=0 && m == true && pnum.length==10 && id.length>=0){
      e.preventDefault()

      Swal.fire({
        title: 'Do you want to add this member?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Add`,
        denyButtonText: `Don't Add`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

            
            $.post("/ajax_add", {textname:textname, textmail:textmail, id:id, pnum:pnum}, function(data){})
            
         
          Swal.fire('Added!', '', 'success')
          setTimeout(function(){  location.href = "members"; }, 2000);
        } else if (result.isDenied) {
        $("#modal1").removeClass("is-active");

          Swal.fire('Changes are not saved', '', 'info')

        }
      })
    
    }
    $(".btnclosemembers").click(function(){
        $("#modal1").removeClass("is-active");
    
    });   
    
})

$(".editmember").click(function(){
    $("#modal1").addClass("is-active")
    var id = $(this).attr("class").split(" ,")
    console.log(id)
    // var z = id.split(" ")
    $("#id1").val(id[1])
    $("#textname1").val(id[2])
    $("#textmail1").val(id[3])
    $("#pnum1").val(id[4])  
})
$(".btneditmember").click(function(e){
    // Swal.fire("data");
    var textname1 = $("#textname1").val()
    var textmail1 = $("#textmail1").val()
    var pnum1 = $("#pnum1").val()
    var id1 = $("#id1").val()
    m = $.isNumeric(pnum1)
    console.log(m)
    if (textname1.length>=0 && textmail1.length>=0 && m == true && pnum1.length==10){
      e.preventDefault()

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            $("#modal1").removeClass("is-active");

            $.post("/ajax_update",{textname1:textname1, textmail1:textmail1, id1:id1, pnum1:pnum1}, function(data){})
            Swal.fire('Saved!', '', 'success')
            setTimeout(function(){  location.href = "members"; }, 2000);
            } else if (result.isDenied) {
            $("#modal1").removeClass("is-active");

            Swal.fire('Changes are not saved', '', 'info')

            }
        })
        }
    })
    $(".btnclosemembers").click(function(){
    $("#modal1").removeClass("is-active");

});   


//REPORTS


 
$(document).ready(function() {
    var table = $('#example').DataTable( {
        lengthChange: false,
        buttons: [ {
                        extend: 'pdf',
                    text: 'Save As PDF',
                    exportOptions: {
                        modifier: {
                            page: 'all'
                        }
                    }} ]
    } );
    table.buttons().container()
        .appendTo( $('div.column.is-one-half', table.table().container()).eq(0) );

        var table = $('#example1').DataTable( {
            lengthChange: false,
            buttons: [ {
                            extend: 'pdf',
                        text: 'Save As PDF',
                        exportOptions: {
                            modifier: {
                                page: 'all'
                            }
                        }} ]
        } );
        table.buttons().container()
            .appendTo( $('div.column.is-one-half', table.table().container()).eq(0) );

} );




function openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";
  }

  $(".deletenotification").click(function(){
    $(".notification").remove()
  })
  setTimeout(function(){  $(".notification").remove(); }, 5000);

  $(".download").click(function(){
      window.print()
  })
  function download(id){
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }

  //RESPONSE
  
    
//TRANSACTIONS


// $(".add").click(function(e){
//     var transaction = $("#transaction").val()
//     var mname = $("#mname").val()
//     var bname = $("#bname").val()
//     var type1 = $("#type1").val()
//     var date = $("#date").val()
    
    
//     if (transaction.length>0 && mname.length>0 && bname.length>0 && type1.length>0 && date.length>0){
//         e.preventDefault()
//         Swal.fire({
//             title: 'Do you want to add this transaction?',
//             showDenyButton: true,
//             showCancelButton: true,
//             confirmButtonText: `Add`,
//             denyButtonText: `Don't Add`,
//           }).then((result) => {
//             console.log("here")

//             /* Read more about isConfirmed, isDenied below */
//             if (result.isConfirmed) {
    
//             $.post("/transactionadd", {transaction:transaction, mname:mname, bname:bname,type1:type1, date:date}, function(data){
//               console.log(data)
//             })
                
//               Swal.fire('Added!', '', 'success')
//               setTimeout(function(){  location.href = "transactions"; }, 2000);
//             } else if (result.isDenied) {
//             // $("#modal1").removeClass("is-active");
    
//               Swal.fire('Changes are not saved', '', 'info')
    
//             }
//           })
//     }
//     })

$("#modalbtntransaction").click(function(){
    $("#modal").addClass("is-active")
    $.post("/get_data", function(data){
    console.log(data)
    $('.modal-content').html(data); 
                    $('.modal-content').append(data.htmlresponse);
                    $('#modal').show(); 
$(".btnclosetransaction").click(function(){
    $("#modal").removeClass("is-active");
});

    })
});

$(".deletedtransaction").click(function(){
        Swal.fire({
        title: 'Do you want to delete this entry?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Don't delete`,
        }).then((result) => {
        if (result.isConfirmed) {
            $(this).parents("tr").remove()
    var id = $(this).attr("id")
    var string = id
    console.log(string)
    $.post("/transaction_delete", {string:string}, function(data){
    })
    Swal.fire('Saved!', '', 'success')

    setTimeout(function(){  location.href = "transactions"; }, 2000);

        } else if (result.isDenied) {
            Swal.fire('Entry not deleted', '', 'info')
        }
        })

})


$(".return").click(function(){
    // $("#modal1").addClass("is-active")
    // alert("Are u sure")
    Swal.fire({
        title: 'Issue Return?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Return`,
        denyButtonText: `Don't return`,
        }).then((result) => {
        if (result.isConfirmed) {
            
        var id = $(this).attr("class").split(" , ")
        // print(id)
        console.log(id[1])
        $.post("/issue_return", {data:id[1]}, function(response){})
            Swal.fire('Saved!', '', 'success')
          setTimeout(function(){  location.href = "transactions"; }, 2000);
          

        } else if (result.isDenied) {
            Swal.fire('Issue return Cancelled', '', 'info')
        }
        })

})


$(".deletenotification").click(function(){
  $(".notification").remove()
})
setTimeout(function(){  $(".notification").remove(); }, 5000);

