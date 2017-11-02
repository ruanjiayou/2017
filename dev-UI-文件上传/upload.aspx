<%@ Page Language="C#" AutoEventWireup="true" CodeFile="upload.aspx.cs" Inherits="dev_UI_文件上传_upload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <input id="message" type="text" value="" runat="server" />
    <script>
        //console.log(window.name);
        //top.UPDATE_DATA = document.getElementById("message").value;
        parent.postMessage(document.getElementById("message").value, "*");
    </script>
</body>
</html>
