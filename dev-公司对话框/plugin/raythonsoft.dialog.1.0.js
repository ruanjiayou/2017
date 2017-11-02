function $r_showDialog(title, src, width, height) {
    var dialogId = "rclDialog";
    $r_createDialog(dialogId, title, src, width, height);
    $r_dialogShowCenter(dialogId);
    $("#" + dialogId).fadeIn("fast");
    $("#raythonsoft_mask").css("display", "block");
}

function $r_showDialog2() {
    var dialog = $(".raythonsoft_dialog")[0];
    dialogId = dialog.id;
    $r_dialogShowCenter(dialogId);
    $("#" + dialogId).fadeIn("fast");
    $("#raythonsoft_mask").css("display", "block");
}

function $r_hideDialog(dialogId) {
    var dialog;
    if (dialogId) {
        dialog = $("#" + dialogId)[0];
    }
    else {
        dialog = $(".raythonsoft_dialog")[0];
        dialogId = dialog.id;
    }
    $("#" + dialogId).fadeOut("fast", function () {
        document.body.removeChild(dialog);
    });
    $("#raythonsoft_mask").css("display", "none");
}

function $r_hideDialog2() {
    var dialog = $(".raythonsoft_dialog")[0];
    dialogId = dialog.id;
    $("#" + dialogId).fadeOut("fast");
    $("#raythonsoft_mask").css("display", "none");
}

function $r_createDialog(dialogId, title, src, width, height) {
    var dialog = document.createElement("div");
    dialog.id = dialogId;
    dialog.className = "raythonsoft_dialog";
    dialog.style.width = width + "px";
    dialog.style.height = height + "px";
    var contentWidth = width - 20 + "px";
    var contentHeight = height - 40 + "px";
    dialog.onmouseup = $r_releaseDialog;
    var content = "<iframe id=\"f_" + dialogId + "\" name=\"raythonsoft_dialog\" src=\"\" frameborder=\"0\" scrolling=\"auto\" width=\"100%\" height=\"" + contentHeight + "\"></iframe>";
    var dialogHmtl = "<div class=\"raythonsoft_dialog_title\" onmousedown=\"javascript:$r_catchDialog('" + dialogId + "',event);\" ondblclick=\"javascript:$r_dialogShowCenter('" + dialogId + "');\">"
        + "<div class=\"raythonsoft_dialog_title_text\">" + title + "</div>"
        + "<div class=\"raythonsoft_dialog_title_button\">"
        + "<input type=\"button\" class=\"raythonsoft_button_close\" onclick=\"javascript:$r_hideDialog('" + dialogId + "');\" />"
        + "</div>" + "</div>" + "<div class=\"raythonsoft_dialog_content\" style=\"width:" + contentWidth + "; height:" + contentHeight + ";\">" + content + "</div>";
    dialog.innerHTML = dialogHmtl;
    document.body.appendChild(dialog);
    $("#f_" + dialogId).attr("src", src);
    var mask = document.createElement("div");
    mask.id = "raythonsoft_mask";
    document.body.appendChild(mask);
}

function $r_dialogShowCenter(dialogId) {
    var dialog = $("#" + dialogId)[0];
    var sTop = document.body.scrollTop + document.documentElement.scrollTop;
    dialog.style.top = (document.documentElement.clientHeight + sTop - dialog.style.height.replace("px", "")) / 2 + "px";
    dialog.style.left = (document.documentElement.clientWidth + sTop - dialog.style.width.replace("px", "")) / 2 + "px";
}

var rclDialogIsCatch = false;
var rclDialogDragClientX = 0;
var rclDialogDragClientY = 0;
var rclDialogDivId = "";

function $r_catchDialog(dialogId, evt) {
    var divMove = $("#" + dialogId)[0];
    rclDialogDivId = dialogId;
    rclDialogIsCatch = true;
    evt = evt || window.event;
    var mx = evt.x ? evt.x : evt.pageX;
    var my = evt.y ? evt.y : evt.pageY;
    var x = mx + document.documentElement.scrollLeft;
    var y = my + document.documentElement.scrollTop;
    rclDialogDragClientX = x - divMove.style.left.replace("px", "");
    rclDialogDragClientY = y - divMove.style.top.replace("px", "");
    if (divMove.setCapture) {
        divMove.setCapture(); document.onmousemove = $r_moveDialog;
    }
    else {
        document.addEventListener("mousemove", $r_moveDialog, true);
    }
}

function $r_moveDialog(evt) {
    if (rclDialogIsCatch) {
        var divMove = $("#" + rclDialogDivId)[0];
        evt = evt ? evt : window.event;
        var mx = evt.x ? evt.x : evt.pageX;
        var my = evt.y ? evt.y : evt.pageY;
        mx = mx ? mx : 0;
        my = my ? my : 0;
        divMove.style.left = mx + document.documentElement.scrollLeft - rclDialogDragClientX + "px";
        divMove.style.top = my + document.documentElement.scrollTop - rclDialogDragClientY + "px";
    }
}

function $r_releaseDialog() {
    if (rclDialogDivId == "") {
        return;
    }
    var divMove = $("#" + rclDialogDivId)[0];
    $r_adjustPosition();
    rclDialogIsCatch = false;
    if (divMove.releaseCapture) {
        divMove.releaseCapture();
        document.onmousemove = null;
    }
    else {
        document.removeEventListener("mousemove", $r_moveDialog, true);
    }
    rclDialogDivId = "";
}

function $r_adjustPosition() {
    var divMove = $("#" + rclDialogDivId);
    var topStandard = document.documentElement.clientHeight - 30;
    var leftStandard = document.documentElement.clientWidth - divMove.width() - 5;
    if (divMove.css("top").replace("px", "") < 0) {
        divMove.css("top", "0px");
    }
    else if (divMove.css("top").replace("px", "") - topStandard > 0) {
        divMove.css("top", topStandard + "px");
    }
    if (divMove.css("left").replace("px", "") < 0) {
        divMove.css("left", "0px");
    }
    else if (divMove.css("left").replace("px", "") - leftStandard > 0) {
        divMove.css("left", leftStandard + "px");
    }
}