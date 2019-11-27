using Art.NetCore.SignalR.Model;
using Microsoft.AspNetCore.Mvc;

namespace Art.NetCore.SignalR.Controllers
{
    public class DefaultController : Controller
    {
        public IActionResult Index()
        {
            var user = new User() { Name = "Art" };
            return View(model: user);
        }
    }
}