using Xamarin.Forms;
using Xamarin.Forms.Sample.Droid;

[assembly: Dependency (typeof (BaseUrl_Android))]
namespace Xamarin.Forms.Sample.Droid
{
	public class BaseUrl_Android : IBaseUrl
	{
		public string Get()
		{
			return "file:///android_asset/";
		}
	}
}