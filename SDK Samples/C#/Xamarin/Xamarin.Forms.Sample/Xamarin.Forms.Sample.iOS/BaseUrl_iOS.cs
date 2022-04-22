using Foundation;
using Xamarin.Forms;
using Xamarin.Forms.Sample.iOS;

[assembly: Dependency(typeof(BaseUrl_iOS))]
namespace Xamarin.Forms.Sample.iOS
{
    public class BaseUrl_iOS : IBaseUrl
	{
		public string Get()
		{
			return NSBundle.MainBundle.BundlePath;
		}
	}
}