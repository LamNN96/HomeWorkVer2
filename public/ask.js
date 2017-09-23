function updateRemainingChars() {
    const textLength = $('#question_tf').val().length;

    $("#text_counter").html(200 - textLength);
}

$("#question_tf").on("change keyup paste", updateRemainingChars);

updateRemainingChars();