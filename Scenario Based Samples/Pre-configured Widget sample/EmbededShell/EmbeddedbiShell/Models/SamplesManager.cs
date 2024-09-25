// <copyright file="SamplesManager.cs" company="Syncfusion Inc">
// Copyright (c) Syncfusion Inc. All rights reserved.
// </copyright>

namespace SampleCoreApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Xml;
    using System.Xml.Serialization;
    using Microsoft.AspNetCore.Http;
    using Newtonsoft.Json;
    using static SampleCoreApp.Models.SamplesSchemaViewModel;

    /// <summary>
    /// SamplesManager class.
    /// </summary>
    public class SamplesManager
    {
        /// <summary>
        /// SamplesModel member.
        /// </summary>
        private SamplesDetails samplesModel;

        /// <summary>
        /// UserEmail member.
        /// </summary>
        private string userEmail;

        /// <summary>
        /// Initializes a new instance of the <see cref="SamplesManager"/> class.
        /// SamplesManager constructor.
        /// </summary>
        /// <param name="filePath">FilePath.</param>
        /// <param name="userEmail">UserEmail.</param>
        public SamplesManager(string filePath, string userEmail = null)
        {
            XmlSerializer deserializer = new XmlSerializer(typeof(SamplesDetails));
            TextReader reader = new StreamReader(filePath);
            this.samplesModel = (SamplesDetails)deserializer.Deserialize(XmlReader.Create(reader));
            this.samplesModel = GetChildElement(this.samplesModel, userEmail);
            this.userEmail = userEmail;
            reader.Close();
            deserializer = null;
        }

        /// <summary>
        /// The method will triggers getting the chile element.
        /// </summary>
        /// <param name="samplesDetails">SamplesDetails.</param>
        /// <param name="userEmail">UserEmail.</param>
        /// <returns>Return the SamplesDetails.</returns>
        public static SamplesDetails GetChildElement(SamplesDetails samplesDetails, string userEmail = null)
        {
            if (samplesDetails == null)
            {
                throw new ArgumentNullException(nameof(samplesDetails));
            }

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
                        Description = string.Empty,
                        CategoryId = 1,
                        DashboardPath = string.Empty,
                        Title = "Bold BI | Create",
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
                                CanWrite = list.CanWrite,
                            };

                            samplesDetails.Samples.Add(sample);
                            randomId = randomId + 1;
                        }
                    }
                }
            }

            return samplesDetails;
        }

        /// <summary>
        /// The method triggers the collection of tree view models.
        /// </summary>
        /// <returns>Return the list of tree view models.</returns>
        public List<SamplesTreeViewModel> GetTreeViewModelCollection()
        {
            List<SamplesTreeViewModel> obj = new List<SamplesTreeViewModel>();
            foreach (var item in this.samplesModel.Categories)
            {
                if (!obj.Any(i => i.Id == item.Id))
                {
                    SamplesTreeViewModel categoryItem = new SamplesTreeViewModel();
                    categoryItem.Id = item.Id;
                    categoryItem.Name = item.Name;
                    categoryItem.Description = item.Description;
                    categoryItem.ParentId = item.ParentId;
                    categoryItem.HasChild = this.CheckItHasChildOrNot(item.Id);
                    categoryItem.IsCategory = true;
                    categoryItem.Path = item.Path;
                    categoryItem.DashboardPath = item.DashboardPath;
                    categoryItem.Title = item.Title;
                    categoryItem.AsTab = item.AsTab;
                    obj.Add(categoryItem);
                }
                else
                {
                    File.WriteAllText(AppDomain.CurrentDomain.RelativeSearchPath + "/duplicateItemsLog.txt", "Sample ID wrong in" + item.Name + "\n\n\n");
                }
            }

            foreach (var item in this.samplesModel.Samples)
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
                    sampleItem.ParentName = this.GetCategoryName(item.CategoryId);
                    sampleItem.HasChild = this.CheckItHasChildOrNot(item.Id);
                    sampleItem.Path = item.Path;
                    sampleItem.CreatedById = item.CreatedById;
                    sampleItem.IsPublic = item.IsPublic;
                    sampleItem.ItemID = item.ItemID;
                    sampleItem.CanRead = item.CanRead;
                    sampleItem.CanDelete = item.CanDelete;
                    sampleItem.CanWrite = item.CanWrite;
                    sampleItem.Url = "/sample" + this.GetSampleHierarchyUrl(sampleItem.ParentName, string.Empty) + "/" + sampleItem.Name;
                    obj.Add(sampleItem);
                }
                else
                {
                    File.WriteAllText(AppDomain.CurrentDomain.RelativeSearchPath + "/duplicateItemsLog.txt", "Sample ID wrong in" + item.Name + "\n\n\n");
                }
            }

            return obj;
        }

        /// <summary>
        /// The method triggers the get schema view model.
        /// </summary>
        /// <returns>Return the Sample Schema View model.</returns>
        public List<SamplesSchemaViewModel> GetSchemaViewModel()
        {
            List<SamplesSchemaViewModel> schemas = new List<SamplesSchemaViewModel>();
            foreach (var item in this.samplesModel.Categories)
            {
                if (!schemas.Any(i => i.Id == item.Id))
                {
                    SamplesSchemaViewModel categoryItem = new SamplesSchemaViewModel();
                    categoryItem.Id = item.Id;
                    categoryItem.Name = item.Name;
                    categoryItem.SpiteClass = item.SpiteClass;
                    categoryItem.Path = item.Path;
                    categoryItem.DashboardPath = item.DashboardPath;
                    categoryItem.HasChild = this.CheckItHasChildOrNot(item.Id);
                    categoryItem.AsTab = item.AsTab;
                    categoryItem.IsCategory = true;
                    if (categoryItem.HasChild)
                    {
                        this.FillSamplesSchema(categoryItem);
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
                    File.WriteAllText(AppDomain.CurrentDomain.RelativeSearchPath + "/duplicateItemsLog.txt", "Sample ID wrong in" + item.Name + "\n\n\n");
                }
            }

            // Requested Changes to categorize the Change Connection String first.
            // schemas[0].Samples = schemas[0].Samples.OrderBy(i => i.Id).ToList();
            return schemas;
        }

        /// <summary>
        /// The method will cause a sample schema to be filled.
        /// </summary>
        /// <param name="parent">SamplesSchemaViewModel.</param>
        /// <returns>Return the samples schema view model.</returns>
        public SamplesSchemaViewModel FillSamplesSchema(SamplesSchemaViewModel parent)
        {
            var response = JsonConvert.DeserializeObject<List<APIResponse>>(new DashboardModel().GetDataSources(this.userEmail));
            if (parent == null)
            {
                throw new ArgumentNullException(nameof(parent));
            }

            if (parent.Samples == null)
            {
                parent.Samples = new List<SamplesSchemaViewModel>();
            }

            foreach (var item in this.samplesModel.Samples.Where(i => i.CategoryId == parent.Id))
            {
                if (!parent.Samples.Any(i => i.Id == item.Id))
                {
                    SamplesSchemaViewModel sampleItem = new SamplesSchemaViewModel();
                    sampleItem.Id = item.Id;
                    sampleItem.Name = item.Name;
                    sampleItem.Title = item.Title;
                    sampleItem.HasChild = this.CheckItHasChildOrNot(item.Id);
                    sampleItem.Path = item.Path;
                    sampleItem.DashboardPath = item.DashboardPath;
                    sampleItem.CreatedById = item.CreatedById;
                    sampleItem.IsPublic = item.IsPublic;
                    sampleItem.ItemID = item.ItemID;
                    sampleItem.CanRead = item.CanRead;
                    sampleItem.CanDelete = item.CanDelete;
                    sampleItem.CanWrite = item.CanWrite;
                    sampleItem.Url = "/sample" + this.GetSampleHierarchyUrl(this.GetCategoryName(item.CategoryId), string.Empty) + "/" + sampleItem.Name;
                    parent.Samples.Add(sampleItem);
                }
                else
                {
                    File.WriteAllText(AppDomain.CurrentDomain.RelativeSearchPath + "/duplicateItemsLog.txt", "Sample ID wrong in" + item.Name + "\n\n\n");
                }
            }

            if (response != null && response.Count > 0)
            {
                if (parent.DataSources == null)
                {
                    parent.DataSources = new List<SamplesSchemaViewModel>();
                }

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
                    }

                    parent.DataSources.Add(sampleItem);
                }
            }

            return parent;
        }

        private string GetSampleUrlId(int parentid, string postUrlid)
        {
            string urlid = "/" + parentid + postUrlid;
            if (this.samplesModel.Categories.Any(i => i.Id == parentid && i.ParentId != null))
            {
                return this.GetSampleUrlId(this.samplesModel.Categories.FirstOrDefault(j => j.Id == this.samplesModel.Categories.FirstOrDefault(i => i.Id == parentid).ParentId).Id, urlid);
            }
            else
            {
                return urlid;
            }
        }

        private string GetCategoryName(int categoryId)
        {
            return this.samplesModel.Categories.Any(i => i.Id == categoryId) ? this.samplesModel.Categories.FirstOrDefault(i => i.Id == categoryId).Name : null;
        }

        private bool CheckItHasChildOrNot(int id)
        {
            return this.samplesModel.Categories.Any(i => i.ParentId == id) || this.samplesModel.Samples.Any(i => i.CategoryId == id);
        }

        private string GetSampleHierarchyUrl(string parentName, string lasturl)
        {
            string url = "/" + parentName + lasturl;
            if (this.samplesModel.Categories.Any(i => i.Name == parentName && i.ParentId != null))
            {
                return this.GetSampleHierarchyUrl(this.samplesModel.Categories.FirstOrDefault(j => j.Id == this.samplesModel.Categories.FirstOrDefault(i => i.Name == parentName).ParentId).Name, url);
            }
            else
            {
                return url;
            }
        }

        private string GetSampleHierarchyId(string parentName, string lasturl)
        {
            string url = "/" + parentName + lasturl;
            if (this.samplesModel.Categories.Any(i => i.Name == parentName && i.ParentId != null))
            {
                return this.GetSampleHierarchyUrl(FormattableString.Invariant($"{this.samplesModel.Categories.FirstOrDefault(j => j.Id == this.samplesModel.Categories.FirstOrDefault(i => i.Name == parentName).ParentId).Id}"), url);
            }
            else
            {
                return url;
            }
        }
    }
}