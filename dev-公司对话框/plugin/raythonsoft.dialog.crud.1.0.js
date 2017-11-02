function $rDialogCRUD(dialogObject, targetName, targetEditUrl, targetEditDialogW, targetEditDialogH, targetDelMethod) {
    this.dialogObject = dialogObject;
    this.targetName = targetName;
    this.targetEditUrl = targetEditUrl;
    this.targetEditDialogW = targetEditDialogW;
    this.targetEditDialogH = targetEditDialogH;
    this.targetDelMethod = targetDelMethod;
}
$rDialogCRUD.prototype.addTarget = function() {
    this.dialogObject.$r_showDialog(this.targetName, this.targetEditUrl, this.targetEditDialogW, this.targetEditDialogH);
};
$rDialogCRUD.prototype.editTarget = function(id) {
    var qstr = this.targetEditUrl.indexOf("?") > 0 ? "&id=" + id : "?id=" + id;
    this.dialogObject.$r_showDialog(this.targetName, this.targetEditUrl + qstr, this.targetEditDialogW, this.targetEditDialogH);
};
$rDialogCRUD.prototype.delTarget = function(id, fn) {
    if (confirm("确定删除该" + this.targetName + "？")) {
        $.ajax({
            type: "POST", contentType: "application/json", url: this.targetDelMethod, dataType: "json", data: "{ id:'" + id + "'}",
            beforeSend: function(XMLHttpRequest) { },
            success: function(data) {
                if (data.d == "accept") { alert("操作成功！"); fn(); }
                else if (data.d == "error") { alert("操作失败，请重试！"); }
                else { alert(data.d); }
            },
            complete: function(XMLHttpRequest, textStatus) { },
            error: function() { }
        });
    }
};