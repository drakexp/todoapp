function deleteItem(e) {
   if(document.getElementById(e).checked) {
      $.ajax({
         type: 'DELETE',
         url: '/todo/'+e,
         success: location.reload()
      });
   }
}