FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["aspnet.csproj", "./"]
RUN dotnet restore "aspnet.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "aspnet.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "aspnet.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "aspnet.dll"]
