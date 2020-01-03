using Art.NetCore.SignalR.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Art.NetCore.SignalR.Controllers
{
    public class DefaultController : Controller
    {
        private readonly ILogger<DefaultController> _logger;

        public DefaultController(ILogger<DefaultController> logger)
        {
            _logger = logger;
            _logger.LogDebug(1, "NLog injected into HomeController");
        }

        [Route("")]
        public IActionResult Index(string name)
        {
            if (string.IsNullOrEmpty(name)) name = "Art";
            _logger.LogInformation("Hello, this is the index!");
            var user = new User {Name = name};
            _logger.LogInformation($"User Model Name:{name}");
            return View(user);
        }
    }
}