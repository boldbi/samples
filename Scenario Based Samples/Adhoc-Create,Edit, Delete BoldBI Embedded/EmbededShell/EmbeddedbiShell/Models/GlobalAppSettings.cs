using System.Collections.Generic;

namespace SampleCoreApp.Models
{
    public class GlobalAppSettings
    {
        public string Identity { get; set; }

        public Section Header { get; set; }

        public Section Sidebar { get; set; }

        public Section Footer { get; set; }

        public string BrandTitle { get; set; }

        public string AppLogo { get; set; }

        public EmbedDetails EmbedDetails { get; set; }

        public ServerUser UserDetails { get; set; }

        public List<SamplesSchemaViewModel> SamplesSchemaCollection { get; set; }

        public List<SamplesTreeViewModel> SamplesCollection { get; set; }

        public Token UserToken { get; set; }
    }

    public class SamplesTreeViewModel
    {
        public int Id { get; set; }

        public int? ParentId { get; set; }

        public string ParentName { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }

        public string DashboardPath { get; set; }

        public string Path { get; set; }

        public bool HasChild { get; set; }

        public bool AsTab { get; set; }

        public bool IsCategory { get; set; }

        public int CreatedById { get; set; }

        public bool IsEdit { get; set; }

        public bool IsPublic { get; set; }

        public string ItemID { get; set; }
        public bool CanRead { get; set; }
        public bool CanDelete { get; set; }
        public bool CanWrite { get; set; }

    }
}
