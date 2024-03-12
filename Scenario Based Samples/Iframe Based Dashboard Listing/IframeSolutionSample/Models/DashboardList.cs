namespace IframeSolutionSample.Models
{
    public class DashboardList
    {
        public List<DashboardItem> Data { get; set; }
    }

    public class DashboardItem
    {
        public bool CanRead { get; set; }
        public bool CanWrite { get; set; }
        public bool CanDelete { get; set; }
        public bool CanDownload { get; set; }
        public bool CanSchedule { get; set; }
        public bool CanOpen { get; set; }
        public bool CanMove { get; set; }
        public bool CanCopy { get; set; }
        public bool CanClone { get; set; }
        public bool CanCreateItem { get; set; }
        public string Id { get; set; }
        public string ItemType { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CreatedById { get; set; }
        public string CreatedByDisplayName { get; set; }
        public int ModifiedById { get; set; }
        public string ModifiedByFullName { get; set; }
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CreatedDate { get; set; }
        public string ModifiedDate { get; set; }
        public DateTime ItemModifiedDate { get; set; }
        public DateTime ItemCreatedDate { get; set; }
        public bool IsMultiDashboard { get; set; }
        public bool IsFavorite { get; set; }
        public bool IsPublic { get; set; }
        public bool IsLocked { get; set; }
        public string EmbedUrl { get; set; }
        public bool IsUnlisted { get; set; }
    }
}
