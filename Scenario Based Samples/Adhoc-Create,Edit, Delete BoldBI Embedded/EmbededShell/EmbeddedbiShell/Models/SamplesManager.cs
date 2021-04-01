using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Serialization;
using static SampleCoreApp.Models.SamplesSchemaViewModel;

namespace SampleCoreApp.Models
{
    public class SamplesCollectionManager
    {
        public SamplesDetails _samplesModel;

        public SamplesCollectionManager(string filePath, string userEmail = null)
        {
            XmlSerializer deserializer = new XmlSerializer(typeof(SamplesDetails));
            TextReader reader = new StreamReader(@"" + filePath);
            _samplesModel = (SamplesDetails)deserializer.Deserialize(reader);
            _samplesModel = GetChildElement(_samplesModel, userEmail);
            reader.Close();
            deserializer = null;
        }

        public SamplesDetails GetChildElement(SamplesDetails samplesDetails, string userEmail = null)
        {
            samplesDetails.Samples = new List<Sample>();
            var response = JsonConvert.DeserializeObject<List<APIResponse>>(new DashboardModel().GetDashboards(userEmail));

            foreach (var item in samplesDetails.Categories)
            {
                if (item.Id == 1)
                {
                    var sample = new Sample
                    {
                        Id = 101,
                        Name = "Create New",
                        Description = "",
                        CategoryId = 1,
                        DashboardPath = "",
                        Title = "Bold BI | Create" 
                    };
                    samplesDetails.Samples.Add(sample);
                }
                if (response != null && response.Count > 0)
                {
                    if (item.Id == 1)
                    {
                        var randomId = 1000;
                        foreach (var list in response)
                        {
                            var sample = new Sample
                            {
                                Id = randomId,
                                Name = list.Name,
                                Description = list.Description,
                                CategoryId = 1,
                                DashboardPath = "/" + list.CategoryName + "/" + list.Name,
                                Title = "Bold BI | " + list.Name,
                                CreatedById = list.CreatedById,
                                ItemID = list.Id,
                                IsPublic = list.IsPublic,
                                CanRead = list.CanRead,
                                CanDelete = list.CanDelete,
                                CanWrite = list.CanWrite
                            };

                            samplesDetails.Samples.Add(sample);
                            randomId = randomId + 1;
                        }
                    }
                }   
            }

            return samplesDetails;
        }

        public List<SamplesTreeViewModel> GetTreeViewModelCollection()
        {
            List<SamplesTreeViewModel> obj = new List<SamplesTreeViewModel>();
            foreach (var item in _samplesModel.Categories)
            {
                if (!obj.Any(i => i.Id == item.Id))
                {
                    SamplesTreeViewModel categoryItem = new SamplesTreeViewModel();
                    categoryItem.Id = item.Id;
                    categoryItem.Name = item.Name;
                    categoryItem.Description = item.Description;
                    categoryItem.ParentId = item.ParentId;
                    categoryItem.HasChild = CheckItHasChildOrNot(item.Id);
                    categoryItem.IsCategory = true;
                    categoryItem.Path = item.Path;
                    categoryItem.DashboardPath = item.DashboardPath;
                    categoryItem.Title = item.Title;
                    categoryItem.AsTab = item.AsTab;
                    obj.Add(categoryItem);
                }
                else
                {
                    File.WriteAllText(AppDomain.CurrentDomain.RelativeSearchPath + "\\duplicateItemsLog.txt", "Sample ID wrong in" + item.Name + "\n\n\n");
                }
            }

            foreach (var item in _samplesModel.Samples)
            {
                if (!obj.Any(i => i.Id == item.Id))
                {
                    SamplesTreeViewModel sampleItem = new SamplesTreeViewModel();
                    sampleItem.Id = item.Id;
                    sampleItem.Name = item.Name;
                    sampleItem.Title = item.Title;
                    sampleItem.DashboardPath = item.DashboardPath;
                    sampleItem.Description = item.Description;
                    sampleItem.ParentId = item.CategoryId;
                    sampleItem.ParentName = GetCategoryName(item.CategoryId);
                    sampleItem.HasChild = CheckItHasChildOrNot(item.Id);
                    sampleItem.Path = item.Path;
                    sampleItem.CreatedById = item.CreatedById;
                    sampleItem.IsPublic = item.IsPublic;
                    sampleItem.ItemID = item.ItemID;
                    sampleItem.CanRead = item.CanRead;
                    sampleItem.CanDelete = item.CanDelete;
                    sampleItem.CanWrite = item.CanWrite;
                    sampleItem.Url = "/sample" + getSampleHierarchyUrl(sampleItem.ParentName, "") + "/" + sampleItem.Name;
                    obj.Add(sampleItem);
                }
                else
                {
                    File.WriteAllText(AppDomain.CurrentDomain.RelativeSearchPath + "\\duplicateItemsLog.txt", "Sample ID wrong in" + item.Name + "\n\n\n");
                }
            }
            return obj;
        }

        private string getSampleUrlId(int parentid, string postUrlid)
        {
            string urlid = "/" + parentid + postUrlid;
            if (_samplesModel.Categories.Any(i => i.Id == parentid && i.ParentId != null))
            {
                return getSampleUrlId(_samplesModel.Categories.FirstOrDefault(j => j.Id == _samplesModel.Categories.FirstOrDefault(i => i.Id == parentid).ParentId).Id, urlid);
            }
            else
            {
                return urlid;
            }
        }

        private string GetCategoryName(int categoryId)
        {
            return _samplesModel.Categories.Any(i => i.Id == categoryId) ? _samplesModel.Categories.FirstOrDefault(i => i.Id == categoryId).Name : null;
        }

        private bool CheckItHasChildOrNot(int id)
        {
            return _samplesModel.Categories.Any(i => i.ParentId == id) || _samplesModel.Samples.Any(i => i.CategoryId == id);
        }

        private string getSampleHierarchyUrl(string parentName, string lasturl)
        {
            string url = "/" + parentName + lasturl;
            if (_samplesModel.Categories.Any(i => i.Name == parentName && i.ParentId != null))
            {
                return getSampleHierarchyUrl(_samplesModel.Categories.FirstOrDefault(j => j.Id == _samplesModel.Categories.FirstOrDefault(i => i.Name == parentName).ParentId).Name, url);
            }
            else
            {
                return url;
            }
        }

        private string getSampleHierarchyId(string parentName, string lasturl)
        {
            string url = "/" + parentName + lasturl;
            if (_samplesModel.Categories.Any(i => i.Name == parentName && i.ParentId != null))
            {
                return getSampleHierarchyUrl(_samplesModel.Categories.FirstOrDefault(j => j.Id == _samplesModel.Categories.FirstOrDefault(i => i.Name == parentName).ParentId).Id.ToString(), url);
            }
            else
            {
                return url;
            }
        }
        public List<SamplesSchemaViewModel> GetSchemaViewModel()
        {
            List<SamplesSchemaViewModel> schemas = new List<SamplesSchemaViewModel>();
            foreach (var item in _samplesModel.Categories)
            {
                if (!schemas.Any(i => i.Id == item.Id))
                {
                    SamplesSchemaViewModel categoryItem = new SamplesSchemaViewModel();
                    categoryItem.Id = item.Id;
                    categoryItem.Name = item.Name;
                    categoryItem.SpiteClass = item.SpiteClass;
                    categoryItem.Path = item.Path;
                    categoryItem.DashboardPath = item.DashboardPath;
                    categoryItem.HasChild = CheckItHasChildOrNot(item.Id);
                    categoryItem.AsTab = item.AsTab;
                    categoryItem.IsCategory = true;
                    if (categoryItem.HasChild)
                    {
                        FillSamplesSchema(categoryItem);
                    }
                    if (item.ParentId == null)
                    {
                        schemas.Add(categoryItem);
                    }
                    else
                    {
                        var subSchema = schemas.FirstOrDefault(i => i.Id == item.ParentId);
                        if (subSchema == null)
                        {
                            foreach (SamplesSchemaViewModel schema in schemas)
                            {
                                if (schema.Samples.Any(j => j.Id == item.ParentId))
                                {
                                    subSchema = schema.Samples.FirstOrDefault(f => f.Id == item.ParentId);
                                    break;
                                }
                            }
                        }
                        if (subSchema.Samples == null)
                        {
                            subSchema.Samples = new List<SamplesSchemaViewModel>();
                        }
                        subSchema.Samples.Add(categoryItem);
                    }
                }
                else
                {
                    File.WriteAllText(AppDomain.CurrentDomain.RelativeSearchPath + "\\duplicateItemsLog.txt", "Sample ID wrong in" + item.Name + "\n\n\n");
                }
            }
            // Requested Changes to categorize the Change Connection String first.

            //schemas[0].Samples = schemas[0].Samples.OrderBy(i => i.Id).ToList();
            return schemas;
        }

        public SamplesSchemaViewModel FillSamplesSchema(SamplesSchemaViewModel parent)
        {
            var response = JsonConvert.DeserializeObject<List<APIResponse>>(new DashboardModel().GetDataSources());
            if (parent.Samples == null)
                parent.Samples = new List<SamplesSchemaViewModel>();
            foreach (var item in _samplesModel.Samples.Where(i => i.CategoryId == parent.Id))
            {
                if (!parent.Samples.Any(i => i.Id == item.Id))
                {
                    SamplesSchemaViewModel sampleItem = new SamplesSchemaViewModel();
                    sampleItem.Id = item.Id;
                    sampleItem.Name = item.Name;
                    sampleItem.Title = item.Title;
                    sampleItem.HasChild = CheckItHasChildOrNot(item.Id);
                    sampleItem.Path = item.Path;
                    sampleItem.DashboardPath = item.DashboardPath;
                    sampleItem.CreatedById = item.CreatedById;
                    sampleItem.IsPublic = item.IsPublic;
                    sampleItem.ItemID = item.ItemID;
                    sampleItem.CanRead = item.CanRead;
                    sampleItem.CanDelete = item.CanDelete;
                    sampleItem.CanWrite = item.CanWrite;
                    sampleItem.Url = "/sample" + getSampleHierarchyUrl(GetCategoryName(item.CategoryId), "") + "/" + sampleItem.Name;
                    parent.Samples.Add(sampleItem);
                }
                else
                {
                    File.WriteAllText(AppDomain.CurrentDomain.RelativeSearchPath + "\\duplicateItemsLog.txt", "Sample ID wrong in" + item.Name + "\n\n\n");
                }
            }

            if (response != null && response.Count > 0)
            {
                if (parent.DataSources == null)
                    parent.DataSources = new List<SamplesSchemaViewModel>();
                foreach (var item in response)
                {
                    var sampleItem = new SamplesSchemaViewModel();
                    {
                        sampleItem.Name = item.Name;
                        sampleItem.DashboardPath = item.DashboardPath;
                        sampleItem.CreatedById = item.CreatedById;
                        sampleItem.IsPublic = item.IsPublic;
                        sampleItem.CanRead = item.CanRead;
                        sampleItem.CanDelete = item.CanDelete;
                        sampleItem.CanWrite = item.CanWrite;
                    };

                    parent.DataSources.Add(sampleItem);
                }
            }
            return parent;
        }
    }
}
