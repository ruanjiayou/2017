using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;

/// <summary>
/// upload 的摘要说明
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
public class upload : System.Web.Services.WebService {

    public upload () {

        //如果使用设计的组件，请取消注释以下行 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod]
    public string uploadFile(string files)
    {
        return "test.png";
    }
}
