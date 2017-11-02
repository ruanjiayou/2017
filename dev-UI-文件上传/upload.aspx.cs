using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class dev_UI_文件上传_upload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string filename, res = "", path = System.IO.Path.GetDirectoryName(Page.Request.PhysicalPath) + "\\";
        HttpFileCollection files = Request.Files;
        //Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type,api_key,Authorization,X-Requested-With");
        //Response.Headers.Add("Access-Control-Allow-Method", "GET,POST,PUT,DELETE,HEAD,OPTIONS");
        //Response.Headers.Add("Access-Control-Allow-Origin", "*");
        if (files.Count > 0)
        {
            filename = Path.GetFileName(files[0].FileName);
            files[0].SaveAs(path + filename);
            res = "{ \"status\": \"success\",\"object\": null, \"message\": \"file length:" + files.Count + "\", \"path\": \""+ "" +"\", \"lists\": [\"" + filename + "\"";
            for(int i=1;i<files.Count;i++){
                filename = Path.GetFileName(files[i].FileName);
                files[i].SaveAs(path + filename);
                res += ",\"" + filename + "\"";
            }
            res += "]}";
        }
        if (string.IsNullOrEmpty(Request.Form["ie"] as string))
        {
            Response.Clear();
            // status: , message: , lists: [], object: ,
            Response.Write(res);
            Response.End();
        }
        else
        {
            message.Value = res;
        }
        //switch (HttpContext.Current.Request.RequestType)
    }
}