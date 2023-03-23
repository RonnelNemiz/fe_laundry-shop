import React from 'react'

function Delete() {
  return (
    <div>
      	<button onclick="document.getElementById('id01').style.display='block'">Delete</button>

            <div id="id01" class="modal">
            <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
            <form class="modal-content" action="/action_page.php">
                <div class="container">
                <h1>Review this info</h1>
                <p>Are you sure you want to delete your account?</p>

                <div class="clearfix">
                    <button type="button" class="cancelbtn">Cancel</button>
                    <button type="button" class="deletebtn">Delete</button>
                </div>
                </div>
            </form>
            </div>
    </div>
  )
}

export default Delete
