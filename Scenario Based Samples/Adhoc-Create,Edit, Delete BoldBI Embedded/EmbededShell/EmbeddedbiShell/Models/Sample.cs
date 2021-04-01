using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace SampleCoreApp.Models
{
    [Serializable()]
    public enum LifeCycle
    {
        None=0,
        New=1,
        Updated=2,
        Deprecated=3
    }

    [Serializable()]
    public class Sample
    {
        [XmlElement("Id")]
        /// <summary>
        /// Gets or Sets the Unique ID of the sample
        /// </summary>
        public int Id { get; set; }

        [XmlElement("Name")]
        /// <summary>
        /// Gets or Sets the Name for the sample
        /// </summary>
        public string Name { get; set; }

        [XmlElement("Title")]
        /// <summary>
        /// Gets or Sets the Name for the sample
        /// </summary>
        public string Title { get; set; }

        [XmlElement("Description")]
        /// <summary>
        /// Gets or Sets the Description for the sample
        /// </summary>
        public string Description { get; set; }

        [XmlElement("CategoryId")]
        /// <summary>
        /// Gets or Sets the CategoryId of the sample
        /// </summary>
        public int CategoryId { get; set; }

        [XmlElement("Path")]
        /// <summary>
        /// Gets or Sets the File path of the sample
        /// </summary>
        public string Path { get; set; }

        [XmlElement("DashboardPath")]
        /// <summary>
        /// Gets or Sets the File path of the sample
        /// </summary>
        public string DashboardPath { get; set; }

        public int CreatedById
        {
            get;
            set;
        }
        public bool IsPublic
        {
            get;
            set;
        }
        public string ItemID
        {
            get;
            set;
        }
        public bool CanRead
        {
            get;
            set;
        }
        public bool CanWrite
        {
            get;
            set;
        }
        public bool CanDelete
        {
            get;
            set;
        }

    }

    [Serializable()]
    public class DataSource
    {
        [XmlElement("Id")]
        /// <summary>
        /// Gets or Sets the Unique ID of the sample
        /// </summary>
        public int Id { get; set; }

        [XmlElement("Name")]
        /// <summary>
        /// Gets or Sets the Name for the sample
        /// </summary>
        public string Name { get; set; }

        [XmlElement("Title")]
        /// <summary>
        /// Gets or Sets the Name for the sample
        /// </summary>
        public string Title { get; set; }

        [XmlElement("Description")]
        /// <summary>
        /// Gets or Sets the Description for the sample
        /// </summary>
        public string Description { get; set; }

        [XmlElement("CategoryId")]
        /// <summary>
        /// Gets or Sets the CategoryId of the sample
        /// </summary>
        public int CategoryId { get; set; }

        [XmlElement("Path")]
        /// <summary>
        /// Gets or Sets the File path of the sample
        /// </summary>
        public string Path { get; set; }

        [XmlElement("DataSourcePath")]
        /// <summary>
        /// Gets or Sets the File path of the sample
        /// </summary>
        public string DataSourcePath { get; set; }

        public int CreatedById
        {
            get;
            set;
        }
        public bool IsPublic
        {
            get;
            set;
        }
        public string ItemID
        {
            get;
            set;
        }
        public bool CanRead
        {
            get;
            set;
        }
        public bool CanWrite
        {
            get;
            set;
        }
        public bool CanDelete
        {
            get;
            set;
        }

    }

    [Serializable()]
    public class Category
    {
        [XmlElement("Id")]
        /// <summary>
        /// Gets or Sets the Unique ID of the Category
        /// </summary>
        public int Id { get; set; }

        [XmlElement("Name")]
        /// <summary>
        /// Gets or Sets the Name of the Category
        /// </summary>
        public string Name { get; set; }

        [XmlElement("Description")]
        /// <summary>
        /// Gets or Sets the Description for the Category
        /// </summary>
        public string Description { get; set; }

        [XmlElement("ParentId")]
        /// <summary>
        /// Gets or Sets the Parent Id of the Category
        /// </summary>
        public int? ParentId { get; set; }

        [XmlElement("SpiteClass")]
        /// <summary>
        /// Gets or Sets Category sprite class.
        /// </summary>
        public string SpiteClass { get; set; }

        [XmlElement("Path")]
        /// <summary>
        /// Gets or Sets the File path of the sample
        /// </summary>
        public string Path { get; set; }

        [XmlElement("DashboardPath")]
        /// <summary>
        /// Gets or Sets the File path of the sample
        /// </summary>
        public string DashboardPath { get; set; }

        [XmlElement("Title")]
        /// <summary>
        /// Gets or Sets the Name for the sample
        /// </summary>
        public string Title { get; set; }

        [XmlElement("AsTab")]
        /// <summary>
        /// Show the child element has the tabs
        /// </summary>
        public bool AsTab { get; set; }
    }
   

    [Serializable()]
    [XmlRoot("SamplesModel")] 
    public class SamplesDetails
    {
        public List<Sample> Samples { get; set; }     
        public List<Category> Categories { get; set; }
        public SamplesDetails()
        {
            Samples = new List<Sample>();
            Categories = new List<Category>();
        }

    }
   

    public class SamplesSchemaViewModel
    {
        /// <summary>
        /// Gets or Sets the Unique ID of the Category
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or Sets the Name of the Category
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or Sets the Title of the Category
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or Sets the File path of the sample
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// Gets or Sets the File path of the sample
        /// </summary>
        public string DashboardPath { get; set; }

        /// <summary>
        /// Gets or Sets the Url of the sample
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Gets or Sets the Haschild prop.
        /// </summary>
        public bool HasChild { get; set; }

        /// <summary>
        /// Gets or Sets Category sprite class.
        /// </summary>
        public string SpiteClass { get; set; }

        public bool AsTab { get; set; }

        /// <summary>
        /// Gets or Sets IsCategory prop.
        /// </summary>
        public bool IsCategory { get; set; }

        public int CreatedById
        {
            get;
            set;
        }

        public bool IsEdit { get; set; }

        public bool IsPublic { get; set; }

        public bool CanRead { get; set; }
        public bool CanWrite { get; set; }
        public bool CanDelete { get; set; }

        public string ItemID { get; set; }

        /// <summary>
        /// Gets or Sets the child collection.
        /// </summary>
        public List<SamplesSchemaViewModel> Samples { get; set; }
        public List<SamplesSchemaViewModel> DataSources { get; set; }

        public SamplesSchemaViewModel Clone ()
        {
            SamplesSchemaViewModel obj = new SamplesSchemaViewModel()
            {
                HasChild = HasChild,
                Id = Id,
                IsCategory = IsCategory,
                Name = Name,
                Path = Path,
                SpiteClass = SpiteClass,
                CreatedById = CreatedById,
                Url = Url
            };
            if (Samples != null)
            {
                obj.Samples = new List<SamplesSchemaViewModel>();
                foreach (var item in Samples)
                {
                    obj.Samples.Add(item.Clone());
                }
            }

            return obj;
        }
    }
}
