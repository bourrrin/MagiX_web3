<?php
    require_once("action/DAO/NotesDAO.php");
?>

<link rel="stylesheet" href="css/note.css">
<script src="js/note.js"></script>


<div class="note">
    <div class="nav_note">
        <div class="sfx_btn previous_note"></div>
        <div class="sfx_btn next_note"></div>
    </div>
    <div class="note_container">
        <div class="note_header">
            <div class="date"></div>
            <div class="numerotation"></div>
        </div>
        <div class="read_note">
            <div class="note_body"></div>
            <div class="note_btn">
                <button class="supprimer_note sfx_btn">DELETE</button>
                <button class="modify_note sfx_btn">MODIFY</button>
            </div>
        </div>
        <div class="create_note">
            <textarea class="note_body" name="" id="new_note" cols="30" rows="10"></textarea>
            <div class="note_btn">
                <button class="exit_add_note sfx_btn">EXIT</button>
                <button class="enter_note sfx_btn">ENTER</button>
                <button class="enter_modify_note sfx_btn">ENTER</button>
            </div>
        </div>
    </div>
    <div class=add_note_container>
        <button class="add_note sfx_btn" >ADD</button>
    </div>
</div>