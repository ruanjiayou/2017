using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class pagination : System.Web.UI.Page
{
    public string str = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        paginer.InnerHtml = buildPagination();

    }
    //自动读取 页面路径 url参数 生成分页
    string buildPagination()
    {
        string res = "<ul class='clearfix'>";
        string query = "";
        //分页数
        int items = 1;
        //当前页码
        int index = 1;
        //请求参数还原
        for (int i = 0; i < Request.QueryString.Count; i++)
        {
            if (Request.QueryString.Keys[i].ToString().ToLower() != "index")
            {
                query += query == "" ? "" : "&";
                query += Request.QueryString.Keys[i].ToString() + "=" + Request.QueryString[i].ToString();
            }
                
        }
        query = Request.Path + "?" + query + "&index=";
        #region 请求参数
        try
        {
            index = String.IsNullOrEmpty(Request["index"]) ? 1 : Convert.ToInt32(Request["index"]);
        }
        catch (Exception e)
        {
            index = 1;
        }
        items = String.IsNullOrEmpty(Request["items"]) ? 1 : Convert.ToInt32(Request["items"]);
        index = index > items ? items : index;
        #endregion
        // <
        res += String.Format("<li><a href='{0}' {1}>&lt;</a></li>", index == 1 ? "javascript:;" : query + (index - 1), index == 1 ? "class='disabled'" : "");
        // 首页
        res += String.Format("<li><a href='{0}' {1}>1</a></li>", index == 1 ? "javascript:;" : query + 1, index == 1 ? "class='active'" : "");
        if (items < 11)
        {
            for (int i = 2; i < items; i++)
            {
                res += String.Format("<li><a href='{0}' {1}>" + i + "</a></li>", index == i ? "javascript:;" : query + i, index == i ? "class='active'" : "");
            }
        }
        else
        {
            #region 处理
            int mid = index < 6 ? 6 : index > items - 5 ? items - 5 : index;

            if (mid > 6)
            {
                // ...
                res += "<li><a href='javascript:;'>▪▪▪</a></li>";
            }
            else
            {
                // 2
                res += String.Format("<li><a href='{0}' {1}>2</a></li>", index == 2 ? "javascript:;" : query + 2, index == 2 ? "class='active'" : "");
            }
            for (int i = mid-3; i <= mid+3; i++)
            {
                res += String.Format("<li><a href='{0}' {1}>" + i + "</a></li>", index == i ? "javascript:;" : query + i, index == i ? "class='active'" : "");
            }
            if (items - 1 > mid+4)
            {
                // ...
                res += "<li><a href='javascript:;'>▪▪▪</a></li>";
            }
            else
            {
                //items-1
                res += String.Format("<li><a href='{0}' {1}>" + (items - 1) + "</a></li>", index == items - 1 ? "javascript:;" : query + (items - 1), index == items - 1 ? "class='active'" : "");
            }
            #endregion
        }
        
        //尾页
        if (1 != items)
        {
            res += String.Format("<li><a href='{0}' {1}>" + items + "</a></li>", index == items ? "javascript:;" : query + items, index == items ? "class='active'" : "");
        }
            
        // >
        res += String.Format("<li><a href='{0}' {1}>&gt;</a></li>", index+1 == items ? "javascript:;" : query + (index + 1), index+1 == items ? "disabled" : "");
        res += "</ul>";
        return res;
    }
}