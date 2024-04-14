//////////////////////////////////////////////////////////////////////
// PACKAGE CONFIGURATION
//////////////////////////////////////////////////////////////////////

#addin nuget:?package=Cake.FileHelpers&version=4.0.1

using System.Text.RegularExpressions;

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");
var cireports = Argument("cireports","../cireports");
var nugetserverurl = Argument<string>("nugetserverurl","");
var nugetapikey = Argument<string>("nugetapikey","");
var STUDIO_VERSION=Argument<string>("studio_version","");
var studio_version = Argument("studio_version", STUDIO_VERSION).Split('.'); 
var referencepath = Argument<string>("referencepath", "");
var outputpath = Argument<string>("outputpath", "");
var PreReleaseNumber = Argument("PreReleaseNumber", "");
var publishProfile = Argument<string>("publishProfile","");

////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////

var currentDirectory=MakeAbsolute(Directory("../"));
var currentDirectoryInfo=new DirectoryInfo(currentDirectory.FullPath);
var fxCopViolationCount=0;
var styleCopViolationCount=0;
var suppressCompilationCount=0;
var securityCodeScanWarningCount=0;

string Copyrights="[assembly: AssemblyCopyright(\"Copyright (c) 2001-"+DateTime.Now.Year+" Syncfusion. Inc,\")]";
var filename = "SampleCoreApp";
var projectName = "EmbededShell";
var nugetPackageFolder="";
FilePath sourceFile {get; set;}

var fxcopFolder = cireports+"/fxcopviolation/";
var stylecopFolder = cireports+"/stylecopviolation/";
var errorlogFolder = cireports + "/errorlogs/";
var warningsFolder = cireports + "/warnings/";
var suppressFolder = cireports+"/suppressviolation/";
var securityCodeFolder = cireports+"/secruitycodeviolation/";


var fxCopReport = fxcopFolder + "/FXCopViolations.txt";
var fxCopReportTemp = fxcopFolder + "/FXCopViolationsTemp.txt";
var styleCopReport = stylecopFolder + "/StyleCopViolations.txt";
var styleCopReportTemp = stylecopFolder + "/StyleCopViolationsTemp.txt";
var SuppressReport = suppressFolder + "/SuppressViolations.txt";
var SuppressReportTemp = suppressFolder + "/SuppressViolationsTemp.txt";
var securityCodeReport = securityCodeFolder + "/SecurityCodeViolations.txt";
var securityCodeReportTemp = securityCodeFolder + "/SecurityCodeViolationsTemp.txt";

var nugetSources="";
List<string> nugetSource = new List<string>();
var nugetserverurls=nugetserverurl.Split(',');	
foreach(var nugeturl in nugetserverurls)
{
    Information(nugeturl);
    nugetSource.Add(nugeturl);
    nugetSources=nugetSources+nugeturl+';';
}
nugetserverurl =nugetserverurl.Split(',')[0];


Information("current Directory is {0}",currentDirectory);
Information("NexusServer URL is {0}",nugetserverurl);
Information("STUDIO_VERSION is {0} ",STUDIO_VERSION);
Information("studio_version is {0}",studio_version);

//////////////////////////////////////////////////////////////////////
// Regex
//////////////////////////////////////////////////////////////////////

var fxCopRegex = "warning CA";
var styleCopRegex = "warning SA";
var styleCopAnalyzersRegex = "warning SX";
var xUnitRegex = "warning xUnit";
var apiAnalyzerRegex = "warning API";
var asyncAnalyzerRegex = "warning AsyncFixer";
var cSharpAnalyzerRegex = "warning RS";
var mvcAnalyzerRegex = "warning MVC";
var entityFrameworkRegex = "warning EF";
var rosylnatorAnalyzerRegex = "warning RCS";
var nugetRegex = "warning NU";
var nullableRegex = "warning CS";
var securityCodeRegex = "warning SCS";

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() =>
{

    var binDirectories=currentDirectoryInfo.GetDirectories("bin",SearchOption.AllDirectories);
    var objDirectories=currentDirectoryInfo.GetDirectories("obj",SearchOption.AllDirectories);
    
    foreach(var directory in binDirectories){
        CleanDirectories(directory.FullName);
    }
    
    foreach(var directory in objDirectories){
        CleanDirectories(directory.FullName);
    }
});

Task("CopyrightandVersion")
  .IsDependentOn("Clean")
  .Does(() =>
{
  var assemblyfiles = GetFiles("../**/*AssemblyInfo.cs");
  foreach(var assemblyfile in assemblyfiles)
  {
  ReplaceRegexInFiles(assemblyfile.ToString(),@"[\d]{1,2}\.[\d]{1}\.[\d]{1}\.[\d]{1,4}",STUDIO_VERSION);
  ReplaceRegexInFiles(assemblyfile.ToString(),@"\[assembly:\s*AssemblyCopyright\s*.*?\]",Copyrights);
  ReplaceRegexInFiles(assemblyfile.ToString(),@"AssemblyCompany\s*.*","AssemblyCompany(\"Syncfusion, Inc.\")]");
  }
});

Task("DeleteLogFile")
	.Does(()=>{
		
    if(FileExists("../cireports/errorlogs/"+ filename +".txt"))
      DeleteFile("../cireports/errorlogs/"+ filename +".txt");
    if(FileExists("../cireports/warnings/"+ filename +".txt") && referencepath == "")
      DeleteFile("../cireports/warnings/"+ filename +".txt");
});


Task("Restore-NuGet-Packages")
    .Does(() =>
{    
    var slnFiles = GetFiles("../" + projectName + "/*.sln");
    foreach(var slnFile in slnFiles){
        Information("slnFile {0}", slnFile);
        DotNetCoreRestore(slnFile.ToString(),new DotNetCoreRestoreSettings {Sources =nugetSource, EnvironmentVariables = new Dictionary<string, string>{
        { "Configuration", configuration.ToString() }
    }});
    }
});

Task("Download-Nugetexe")
  .WithCriteria( !FileExists("./tools/nuget.exe"))
  .ContinueOnError()
  .Does(() =>
{
 
     DownloadFile("http://dist.nuget.org/win-x86-commandline/v4.4.1/nuget.exe", "./tools/nuget.exe");
     
});

Task("Create-NugetPackage-Directory")
.Does(() =>{
            var nugetContent = System.Xml.Linq.XDocument.Parse(System.IO.File.ReadAllText(nugetPackageFolder+"/NuGet.Config",System.Text.Encoding.UTF8)); //Read the text of config file
            var nugetConfigElement = (from elements in nugetContent.Descendants("config") select elements).ToList();//get the config element value
            if (nugetConfigElement.Count==0)//check the config element had value or not
            {
				EnsureDirectoryExists(sourceFile.GetDirectory().ToString()+"/packages");
            }
            else
            {
				EnsureDirectoryExists(nugetPackageFolder+"/"+nugetConfigElement[0].ToString().Split('"')[3]);
            }
});

Task("Update-Nuget-Packages")
.Does(() =>{
              
		if(FileExists(currentDirectory.ToString()+"/NuGet.Config"))
        {
            nugetPackageFolder=currentDirectory.ToString();
            RunTarget("Create-NugetPackage-Directory");
		} 
                                           
        var slnFiles = GetFiles("../**/*.sln");

        //update the nuget packages
        foreach(var slnFile in slnFiles)
        {
		
            sourceFile=File(slnFile.ToString());
			if (FileExists(sourceFile.GetDirectory().ToString()+"/.nuget/NuGet.Config"))
            {
				nugetPackageFolder=sourceFile.GetDirectory().ToString()+"/.nuget/";
                RunTarget("Create-NugetPackage-Directory");
				StartProcess("./tools/nuget.exe", new ProcessSettings
                { Arguments ="update \""+ slnFile + "\" -ConfigFile \"" +nugetPackageFolder+"\"/NuGet.Config"}
                );
            }
            else if(FileExists(currentDirectory.ToString()+"/NuGet.Config"))
            {
				StartProcess("./tools/nuget.exe", new ProcessSettings
                { Arguments ="update \""+ slnFile + "\" -ConfigFile \"" +nugetPackageFolder+"\"/NuGet.Config"}
                );
            }
            
			//if nuget.config does not exist                 
            else
            {	EnsureDirectoryExists(sourceFile.GetDirectory().ToString()+"/packages");
                NuGetUpdate(slnFile,new NuGetUpdateSettings {Source=nugetSource});
            }
        }
});

Task("build")
	.IsDependentOn("Download-Nugetexe")
	.IsDependentOn("CopyrightandVersion")
    .IsDependentOn("Restore-NuGet-Packages")
	.ContinueOnError()
    .Does(() =>
{
	  RunTarget("DeleteLogFile");
      EnsureDirectoryExists("../cireports/errorlogs");
      EnsureDirectoryExists("../cireports/warnings"); 
	  var logFilename = filename + ".txt";
	  var settings = new DotNetCoreMSBuildSettings()
	  //.WithProperty("ReferencePath",referencepath)
	  //.WithProperty("OutDir",outputpath)
	  .AddFileLogger(new MSBuildFileLoggerSettings{LogFile = warningsFolder + logFilename, SummaryOutputLevel=MSBuildLoggerOutputLevel.WarningsOnly})
	  .AddFileLogger(new MSBuildFileLoggerSettings{LogFile = errorlogFolder + logFilename, SummaryOutputLevel=MSBuildLoggerOutputLevel.ErrorsOnly});
		
	  var buildSettings = new DotNetCoreBuildSettings()
	  {
		Configuration = configuration,
		MSBuildSettings = settings,
		Verbosity = DotNetCoreVerbosity.Minimal
	  };
		
	  DotNetCoreBuild(currentDirectory + @"\"+projectName+@"\"+filename+".sln", buildSettings);
	  if(FileExists(errorlogFolder + logFilename))
	  {
		 if (FileSize(errorlogFolder + logFilename) == 0 )
			DeleteFile(errorlogFolder + logFilename);
	  }
});


Task("packnuget")
	.Does(() => {
	
		var nuspec =  GetFiles("../"+projectName+"/**/*.nuspec").FirstOrDefault();
		Information(nuspec);
		var nuGetPackSettings = new NuGetPackSettings
		{  
			OutputDirectory = currentDirectory,
			Version=studio_version[0]+"."+studio_version[1]+"."+studio_version[2]+"."+PreReleaseNumber,
			ArgumentCustomization = args => args.Append("-Prop Configuration=" + configuration)
		};
			
		NuGetPack(nuspec.FullPath, nuGetPackSettings);
});
	
Task("publish")
	//.IsDependentOn("packnuget")
	.Does(()=>{
		
		var publishSettings = new DotNetCorePublishSettings
		{
			Configuration = configuration,
			OutputDirectory = "../Output",
			MSBuildSettings = new DotNetCoreMSBuildSettings(),
			//.WithProperty("PublishProfile", publishProfile),
			NoRestore = true,
			Verbosity = DotNetCoreVerbosity.Minimal
		};
			
		Information("==================");
		Information("Started publishing "+ projectName);
		Information(publishSettings.Configuration);
		Information("==================");

		DotNetCorePublish(currentDirectory + @"\EmbededShell\EmbeddedbiShell\SampleCoreApp.csproj", publishSettings);
});

Task("GetFxCopReports")
.Does(()=>
{
	try
	{
		var logFilename = filename + ".txt";
		
		var fxCopAnalysisFiles=FileReadText(warningsFolder + logFilename);
		
		fxCopViolationCount = Regex.Matches(fxCopAnalysisFiles, fxCopRegex).Count;
		fxCopViolationCount += Regex.Matches(fxCopAnalysisFiles, apiAnalyzerRegex).Count;
		fxCopViolationCount += Regex.Matches(fxCopAnalysisFiles, asyncAnalyzerRegex).Count;
		fxCopViolationCount += Regex.Matches(fxCopAnalysisFiles, cSharpAnalyzerRegex).Count;
		fxCopViolationCount += Regex.Matches(fxCopAnalysisFiles, mvcAnalyzerRegex).Count;
		fxCopViolationCount += Regex.Matches(fxCopAnalysisFiles, entityFrameworkRegex).Count; 
		fxCopViolationCount += Regex.Matches(fxCopAnalysisFiles, rosylnatorAnalyzerRegex).Count; 
		
		//fxCopViolationCount = 0;
		if(fxCopViolationCount != 0)
		{        
		   Information("There are {0} FXCop violations found", fxCopViolationCount);
		}

		if (!DirectoryExists(cireports))
		{
			CreateDirectory(cireports);
		}
			
		if(!DirectoryExists(fxcopFolder))
		{
			CreateDirectory(fxcopFolder);
		}
		
	    FileWriteText(fxcopFolder + "FXCopViolations.txt", "FXCop Warning(s) Count : " + fxCopViolationCount + Environment.NewLine + Environment.NewLine + "FXCop Warnings:" + Environment.NewLine);
        string[] fileLines=FileReadLines(warningsFolder + logFilename);
        FileWriteLines(fxCopReportTemp, fileLines.ToArray());         
        string[] lines = FileReadLines(fxCopReportTemp);
        IEnumerable<string> fxCopWarnings = lines.Where(line => line.Contains(fxCopRegex));
        FileAppendLines(fxCopReport, fxCopWarnings.ToArray());
		if(FileExists(fxCopReportTemp))
		{
			DeleteFile(fxCopReportTemp);
		}
	}
	catch(Exception ex) {        
		throw new Exception(String.Format("Please fix Get Fx Cop Reports failures "+ ex));  
	}
		
});

Task("GetStyleCopReports")
 .Does(()=>
 {
    try
	{
		var logFilename = filename + ".txt";
		
		var styleCopWarning = FileReadText(warningsFolder + logFilename);
		styleCopViolationCount += Regex.Matches(styleCopWarning, styleCopRegex).Count;
		styleCopViolationCount += Regex.Matches(styleCopWarning, styleCopAnalyzersRegex).Count;

		//styleCopViolationCount=0;
		if(styleCopViolationCount != 0)
		{        
		   Information("There are {0} StyleCop violations found", styleCopViolationCount);
		}
		
		if(!DirectoryExists(cireports))
		{
			CreateDirectory(cireports);
		}

		if(!DirectoryExists(stylecopFolder))
		{
			CreateDirectory(stylecopFolder);
		}
		
		FileWriteText(stylecopFolder + "StyleCopViolations.txt", "StyleCop Warning(s) Count : " + styleCopViolationCount + Environment.NewLine + Environment.NewLine + "StyleCop Warnings:" + Environment.NewLine);
        string[] fileLines=FileReadLines(warningsFolder + logFilename);
        FileWriteLines(styleCopReportTemp, fileLines.ToArray());         
        string[] lines = FileReadLines(styleCopReportTemp);
        IEnumerable<string> styleCopWarnings = lines.Where(line => line.Contains(styleCopRegex));
        FileAppendLines(styleCopReport, styleCopWarnings.ToArray());
		if(FileExists(styleCopReportTemp))
		{
			DeleteFile(styleCopReportTemp);
		}
	}
	catch(Exception ex) {        
		throw new Exception(String.Format("Please fix Get Style Cop Reports failures " + ex));  
	}

 });

 Task("GetSuppressCompilationReport")
 .Does(()=>
 {
    try
	{
		var logFilename = filename + ".txt";
		
		var suppressCompilerWarning = FileReadText(warningsFolder + logFilename);
		suppressCompilationCount += Regex.Matches(suppressCompilerWarning, nullableRegex).Count;

		//suppressCompilationCount=0;
		if(suppressCompilationCount != 0)
		{        
		   Information("There are {0} Suppress Compilation violations found", suppressCompilationCount);
		}
		
		if(!DirectoryExists(cireports))
		{
			CreateDirectory(cireports);
		}

		if(!DirectoryExists(suppressFolder))
		{
			CreateDirectory(suppressFolder);
		}
		
		FileWriteText(suppressFolder + "SuppressViolations.txt", "Suppress Compilation Warnings(s) Count : " + suppressCompilationCount + Environment.NewLine + Environment.NewLine + "Compiler Message Warnings:" + Environment.NewLine);
        string[] fileLines=FileReadLines(warningsFolder + logFilename);
        FileWriteLines(SuppressReportTemp, fileLines.ToArray());         
        string[] lines = FileReadLines(SuppressReportTemp);
        IEnumerable<string> compilerSuppressWarnings = lines.Where(line => line.Contains(nullableRegex));
        FileAppendLines(SuppressReport, compilerSuppressWarnings.ToArray());
		if(FileExists(SuppressReportTemp))
		{
			DeleteFile(SuppressReportTemp);
		}
	}
	catch(Exception ex) {        
		throw new Exception(String.Format("Please fix Get Suppress Compilation Reports failures " + ex));  
	}

 });

  Task("GetSecurityCodeViolationReport")
 .Does(()=>
 {
    try
	{
		var logFilename = filename + ".txt";
		
		var securityCodeViolationWarning = FileReadText(warningsFolder + logFilename);
		securityCodeScanWarningCount += Regex.Matches(securityCodeViolationWarning, securityCodeRegex).Count;

		//securityCodeScanWarningCount=0;
		if(securityCodeScanWarningCount != 0)
		{        
		   Information("There are {0} Security Code Violations found", securityCodeScanWarningCount);
		}
		
		if(!DirectoryExists(cireports))
		{
			CreateDirectory(cireports);
		}

		if(!DirectoryExists(securityCodeFolder))
		{
			CreateDirectory(securityCodeFolder);
		}
		
		FileWriteText(securityCodeReport, "Security Code Violations Warnings(s) Count : " + securityCodeScanWarningCount + Environment.NewLine + Environment.NewLine + "Security Code Violations Warnings:" + Environment.NewLine);
        string[] fileLines=FileReadLines(warningsFolder + logFilename);
        FileWriteLines(securityCodeReportTemp, fileLines.ToArray());         
        string[] lines = FileReadLines(securityCodeReportTemp);
        IEnumerable<string> securityCodeWarnings = lines.Where(line => line.Contains(securityCodeRegex));
        FileAppendLines(securityCodeReport, securityCodeWarnings.ToArray());
		if(FileExists(securityCodeReportTemp))
		{
			DeleteFile(securityCodeReportTemp);
		}
	}
	catch(Exception ex) {        
		throw new Exception(String.Format("Please fix Get Security Code Violations Reports failures " + ex));  
	}

 });

Task("codeviolation")
	.IsDependentOn("GetFxCopReports")
	.IsDependentOn("GetStyleCopReports")
	.IsDependentOn("GetSuppressCompilationReport")
	.IsDependentOn("GetSecurityCodeViolationReport")
	.Does(()=>{
		Information("Code violation");
		Information("StyleCop violations = {0}",styleCopViolationCount);
		Information("FxCop violations = {0}",fxCopViolationCount);
		Information("Suppress violations = {0}",suppressCompilationCount);
		Information("Security Code Violations = {0}",securityCodeScanWarningCount);
		if(fxCopViolationCount!=0 || styleCopViolationCount!=0 || suppressCompilationCount!=0 || securityCodeScanWarningCount!=0)
		{
			//throw new Exception("Code violations found");
            Information("Code violations found");
		}
		else
		{
			Information("Code Analysis succees");
		}
		
});
//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("Default")
    .IsDependentOn("build")
    .IsDependentOn("codeviolation");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);