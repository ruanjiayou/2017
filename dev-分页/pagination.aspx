<%@ Page Language="C#" AutoEventWireup="true" CodeFile="pagination.aspx.cs" Inherits="pagination" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>分页</title>
    <link rel="stylesheet" href="../css/common.css"/>
    <style>
        #paginer { width: 80%; margin: 0 auto; margin-top: 30px; }
        #paginer li { float: left; }
        #paginer li + li { margin-left: 5px; }
        #paginer a { display: block; width: 28px; height: 28px; line-height: 28px; border: 1px solid #ccc; color: #8d8a8a; text-align: center; }
        #paginer a:hover { background-color: #f0f0f0; }
        #paginer a.active { background-color: #a9cf4a; color: #fff; cursor: default; }
        #paginer a.disabled { cursor: not-allowed; }
    </style>
</head>
<body>
    <% Response.Write(str); %>
    <div data-role="pagination" id="paginer" runat="server"></div>
    <script></script>
</body>
</html>
