# Filename: samplebrowser
 
FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal AS base

WORKDIR /application/adhoc
EXPOSE 80
EXPOSE 443
COPY output/adhoc .
ENTRYPOINT ["dotnet", "SampleCoreApp.dll"] 